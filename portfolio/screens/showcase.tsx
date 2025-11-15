import { useCallback, useDeferredValue, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCode,
  faExternalLinkAlt,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Drawer, DrawerContent } from "@/components/drawer";
import { Search_field } from "@/components/search_field";
import FilterToggle from "@/components/filter_toggle";
import { Media_tile } from "@/components/media_tile";
import { SHOWCASE_ITEMS, type ShowcaseItem } from "@/core/data";
import { Parallax } from "@/components/parallax";

export default function Showcase() {
  const [searchQuery, setSearchQuery] = useState("");
  const deferredQuery = useDeferredValue(searchQuery); // smoother typing
  const [selectedType, setSelectedType] = useState<"all" | "project" | "blog">(
    "all",
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<ShowcaseItem | null>(null);

  // immutable dataset reference
  const items: ShowcaseItem[] = useMemo(() => SHOWCASE_ITEMS, []);

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(items.map((item) => item.category)))],
    [items],
  );

  const filteredItems = useMemo(
    () =>
      items.filter((item) => {
        const q = deferredQuery.toLowerCase();
        const matchesSearch =
          !q ||
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.tags.some((tag) => tag.toLowerCase().includes(q));
        const matchesType =
          selectedType === "all" || item.type === selectedType;
        const matchesCategory =
          selectedCategory === "all" || item.category === selectedCategory;
        return matchesSearch && matchesType && matchesCategory;
      }),
    [items, deferredQuery, selectedType, selectedCategory],
  );

  const handleTileClick = useCallback((item: ShowcaseItem) => {
    if (item.type === "project") {
      setSelectedItem(item);
    } else if (item.link) {
      window.open(item.link, "_blank");
    }
  }, []);

  // Precompute highlight pattern
  const renderedTiles = useMemo(
    () =>
      filteredItems.map((item, index) => ({
        item,
        highlight: index % 5 === 0,
      })),
    [filteredItems],
  );

  return (
    <>
      {/* Search and Filters */}
      <Parallax speed={0.2}>
        <div className="mb-6 space-y-3">
          <Search_field
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search projects and blogs..."
          />
          <div className="flex flex-wrap gap-2">
            <FilterToggle
              active={selectedType === "all"}
              onClick={() => setSelectedType("all")}
            >
              All
            </FilterToggle>
            <FilterToggle
              active={selectedType === "project"}
              onClick={() => setSelectedType("project")}
              icon={faCode}
            >
              Projects
            </FilterToggle>
            <FilterToggle
              active={selectedType === "blog"}
              onClick={() => setSelectedType("blog")}
              icon={faBook}
            >
              Blogs
            </FilterToggle>
            <span className="w-px bg-border" />
            {categories.slice(1).map((category) => (
              <FilterToggle
                key={category}
                variant="accent"
                active={selectedCategory === category}
                onClick={() =>
                  setSelectedCategory(
                    category === selectedCategory ? "all" : category,
                  )
                }
              >
                {category}
              </FilterToggle>
            ))}
          </div>
        </div>
      </Parallax>

      <Parallax speed={0.3}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {renderedTiles.map(({ item, highlight }) => (
            <Media_tile
              key={item.id}
              title={item.title}
              subtitle={item.description}
              category={item.category}
              icon={
                item.type === "project" ? (
                  <FontAwesomeIcon
                    icon={faCode}
                    className="w-4 h-4 icon-glow"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faBook}
                    className="w-4 h-4 icon-glow"
                  />
                )
              }
              dateOrRead={item.type === "blog" ? item.readTime : item.date}
              image={item.image}
              tags={item.tags}
              highlight={highlight}
              onClick={() => handleTileClick(item)}
            />
          ))}
        </div>
      </Parallax>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No items found matching your search.
          </p>
        </div>
      )}

      <Drawer
        open={!!selectedItem}
        onOpenChange={(o) => !o && setSelectedItem(null)}
      >
        <DrawerContent title={selectedItem?.title || ""}>
          {selectedItem && (
            <>
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {selectedItem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-muted rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {selectedItem.detailedDescription && (
                  <div>
                    <h3 className="text-xl mb-2">About</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedItem.detailedDescription}
                    </p>
                  </div>
                )}
                {selectedItem.features && (
                  <div>
                    <h3 className="text-xl mb-2">Key Features</h3>
                    <ul className="space-y-2">
                      {selectedItem.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-muted-foreground"
                        >
                          <span className="text-foreground mt-1">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="flex flex-wrap gap-3 pt-2">
                  {selectedItem.link && (
                    <a
                      href={selectedItem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-xl transition-all glow-on-hover"
                    >
                      <FontAwesomeIcon
                        icon={faExternalLinkAlt}
                        className="w-4 h-4"
                      />
                      <span>View Project</span>
                    </a>
                  )}
                  {selectedItem.paper && (
                    <a
                      href={selectedItem.paper}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 bg-muted text-foreground rounded-xl transition-all glow-on-hover"
                    >
                      <FontAwesomeIcon icon={faFileAlt} className="w-4 h-4" />
                      <span>Read Paper</span>
                    </a>
                  )}
                </div>
              </div>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { useMediumRSS } from "@/hooks/use-medium-posts";
import { Badge, Search_field, Skeleton } from "@/components/ui";
import { cn } from "@/core/utils";
import { ExternalURL } from "@/core/types";

function BlogPostItem({
  title,
  subtitle,
  category,
  readTime,
  publicationDate,
  link,
  onTagClick,
}: {
  title: string;
  subtitle?: string;
  category?: string[];
  readTime?: string;
  publicationDate?: string;
  link?: ExternalURL;
  onTagClick?: (tag: string) => void;
}) {
  const formattedDate = publicationDate
    ? new Date(publicationDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <div className="py-6 border-b border-muted/20 hover:border-muted/40 transition-colors">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
        aria-label={`Read article: ${title}`}
      >
        <div className="flex flex-col gap-2">
          {/* Title */}
          <h3 className="text-xl font-semibold text-front group-hover:text-subtle transition-colors">
            {title}
          </h3>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-sm text-subtle line-clamp-2">{subtitle}</p>
          )}

          {/* Meta info and tags */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-subtle">
            {formattedDate && (
              <time dateTime={publicationDate}>{formattedDate}</time>
            )}
            {readTime && (
              <>
                <span>•</span>
                <span>{readTime}</span>
              </>
            )}
            {category && category.length > 0 && (
              <>
                <span>•</span>
                <div
                  className="flex flex-wrap gap-1.5"
                  onClick={(e) => e.preventDefault()}
                >
                  {category.map((tag) => (
                    <button
                      key={tag}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onTagClick?.(tag);
                      }}
                      className="hover:underline"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </a>
    </div>
  );
}

function BlogPostSkeleton() {
  return (
    <div className="py-6 border-b border-muted/20">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-2 mt-1">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  );
}

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const {
    data: posts,
    isLoading,
    error,
  } = useMediumRSS(debouncedSearch, selectedTag);

  // Get all unique tags from posts
  const allTags = useMemo(() => {
    if (!posts) return [];
    const tags = new Set<string>();
    posts.forEach((post) => {
      post.category?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [posts]);

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? "" : tag);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTag("");
  };

  const hasActiveFilters = searchQuery || selectedTag;

  return (
    <main className="min-h-screen bg-back">
      <div className="screen pt-24">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Blog</h1>
          <p className="text-lg text-subtle max-w-2xl">
            Thoughts and writings on technology, programming, and personal
            experiences.
          </p>
        </div>

        {/* Filters Section */}
        <div className="mb-8 space-y-4 max-w-4xl">
          {/* Search Bar */}
          <div className="flex gap-3 items-center">
            <div className="flex-1">
              <Search_field
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search posts by title or content..."
                className="w-full"
              />
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm text-subtle hover:text-front transition-colors rounded-lg hover:bg-muted/50"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Tag Filter Chips */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-subtle py-2">Filter by tag:</span>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={cn(
                    "transition-all duration-200 hover:scale-105",
                    selectedTag === tag && "ring-2 ring-front/50",
                  )}
                >
                  <Badge active={selectedTag === tag}>{tag}</Badge>
                </button>
              ))}
            </div>
          )}

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 text-sm text-subtle">
              <span>Active filters:</span>
              {searchQuery && (
                <span className="px-2 py-1 bg-muted/50 rounded">
                  Search: &ldquo;{searchQuery}&rdquo;
                </span>
              )}
              {selectedTag && (
                <span className="px-2 py-1 bg-muted/50 rounded">
                  Tag: {selectedTag}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="max-w-4xl">
          {isLoading && (
            <div className="flex flex-col">
              {[...Array(5)].map((_, i) => (
                <BlogPostSkeleton key={i} />
              ))}
            </div>
          )}

          {error && (
            <div className="py-8 text-center">
              <p className="text-danger">
                Failed to load blog posts. Please try again later.
              </p>
            </div>
          )}

          {posts && posts.length === 0 && (
            <div className="py-8 text-center">
              <p className="text-subtle">
                {hasActiveFilters
                  ? "No blog posts match your filters. Try adjusting your search or filters."
                  : "No blog posts found."}
              </p>
            </div>
          )}

          {posts && posts.length > 0 && (
            <>
              <div className="mb-4 text-sm text-subtle">
                Showing {posts.length} {posts.length === 1 ? "post" : "posts"}
              </div>
              <div className="flex flex-col">
                {posts.map((post, index) => (
                  <BlogPostItem
                    key={`${post.link}-${index}`}
                    {...post}
                    onTagClick={handleTagClick}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

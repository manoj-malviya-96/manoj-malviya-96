import {ReactNode} from 'react';
import Image from 'next/image';
import {cn} from '@/components/utils';

export type MediaTileProps = {
    title: string;
    subtitle?: string;
    category?: string;
    icon?: ReactNode;
    dateOrRead?: string;
    image?: string;
    tags?: string[];
    highlight?: boolean;
    onClick?: () => void;
};

export function MediaTile({
                              title,
                              subtitle,
                              category,
                              icon,
                              dateOrRead,
                              image,
                              tags = [],
                              highlight = false,
                              onClick
                          }: MediaTileProps) {
    return (
        <div
            className={cn(
                'relative rounded-xl overflow-hidden cursor-pointer group h-64 glow-accent',
                highlight && 'sm:col-span-2 sm:h-80',
            )}
            onClick={onClick}
        >
            {image && (
                <div className="absolute inset-0">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                        priority={false}
                    />
                    <div
                        className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20 transition-all duration-500 group-hover:from-black/90 group-hover:via-black/40"/>
                </div>
            )}
            <div className="relative h-full flex flex-col justify-between p-5 text-white">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                        {icon}
                        {category && (
                            <span className="text-xs uppercase tracking-wider opacity-90">{category}</span>
                        )}
                    </div>
                    {dateOrRead && (
                        <span className="text-xs opacity-75">{dateOrRead}</span>
                    )}
                </div>
                <div>
                    <h3 className="text-2xl mb-2 leading-tight drop-shadow-lg">{title}</h3>
                    {subtitle && (
                        <p className="text-white/90 text-sm mb-3 line-clamp-2 leading-relaxed drop-shadow">{subtitle}</p>
                    )}
                    {!!tags.length && (
                        <div className="flex flex-wrap gap-1.5">
                            {tags.slice(0, 3).map((t) => (
                                <span key={t}
                                      className="text-xs px-2 py-1 bg-white/20 backdrop-blur-sm rounded-md">{t}</span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MediaTile;

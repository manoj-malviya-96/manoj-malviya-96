import {ReactNode} from 'react';

export type TimelineConfig = {
    dotSize: number;
    logoSize: number;
    gap: number;
};

export const DEFAULT_TIMELINE_CONFIG: TimelineConfig = {
    dotSize: 8,
    logoSize: 48,
    gap: 16,
};

const getTimelineOffset = (cfg: TimelineConfig) => (cfg.logoSize - cfg.dotSize) / 2;
const getContentMargin = (cfg: TimelineConfig) => cfg.logoSize + cfg.gap;

export function Timeline<T>({
                                items,
                                children,
                                isActive = () => false,
                                onSelect,
                                config = DEFAULT_TIMELINE_CONFIG,
                            }: {
    items: T[];
    children: (item: T) => ReactNode;
    isActive?: (item: T) => boolean;
    onSelect?: (item: T) => void;
    config?: TimelineConfig;
}) {
    const offset = getTimelineOffset(config);

    return (
        <div className="relative">
            <div className="absolute top-0 bottom-0 w-0.5 bg-border" style={{left: offset}}/>

            {items.map((item, i) => {
                const active = isActive(item);
                const props = onSelect ? {onClick: () => onSelect(item)} : {};

                return (
                    <div key={i} className={i < items.length - 1 ? 'pb-8' : ''}>
                        <div
                            className={`absolute w-2 h-2 rounded-full ${active ? 'bg-dark' : 'bg-muted'}`}
                            style={{left: offset, top: 24}}
                        />
                        <div
                            {...props}
                            className={`${onSelect ? 'text-left' : ''} bg-muted rounded-xl p-5 glow-accent card-glow`}
                            style={{marginLeft: getContentMargin(config)}}
                        >
                            {children(item)}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Timeline;


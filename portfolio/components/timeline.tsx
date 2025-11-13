import React, {memo, ReactNode} from 'react';


interface TimelineProps<T> {
    items: T[];
    renderLogo: (item: T, isCurrent: boolean) => ReactNode;
    renderCard: (item: T) => ReactNode;
    isToday?: (item: T) => boolean;
}

function TimelineBase<T>({items, renderLogo, renderCard, isToday = () => false}: TimelineProps<T>) {
    return (
        <div className="relative">
            {items.map((item, index) => {
                const today = isToday(item);
                const isLast = index === items.length - 1;

                return (
                    <div key={index} className="relative flex gap-6 group">
                        <div className="relative flex flex-col items-center">
                            <div
                                className={`
                  rounded-full bg-white shadow-lg flex items-center justify-center
                  transition-all duration-300 z-10
                  ${today ? 'w-16 h-16 ring-4 ring-offset-2 scale-110' : 'w-12 h-12 hover:scale-105'}
                `}
                            >
                                {renderLogo(item, today)}
                            </div>

                            {!isLast && (
                                <div
                                    className="absolute top-16 bottom-0 w-0.5 bg-gradient-to-b from-slate-300 to-transparent"/>
                            )}
                        </div>

                        <div className={`flex-1 ${!isLast ? 'pb-12' : ''}`}>
                            <div
                                className={`
                  bg-white rounded-2xl shadow-sm border border-slate-200
                  transition-all duration-300
                  ${today ? 'shadow-xl scale-105 border-slate-300' : 'hover:shadow-md hover:border-slate-300'}
                `}
                            >
                                {renderCard(item)}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default memo(TimelineBase) as typeof TimelineBase;
import React, {memo, ReactNode} from 'react';
import type {LucideIcon} from 'lucide-react';
import {cn} from "@/components/utils";

function _IconTextBase({icon: Icon, children, className = ''}: {
    icon: LucideIcon;
    children: ReactNode;
    className?: string
}) {
    return (
        <span className={cn('`flex items-center gap-1', className)}>
            <Icon className="icon"/>
            {children}
        </span>
    );
}

_IconTextBase.displayName = "IconTextBase"
export default memo(_IconTextBase);

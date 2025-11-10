import React, {memo} from 'react';

function TagBase({children}: { children: string }) {
    return (
        <span className="text-xs px-2 py-1 bg-white/20 backdrop-blur-sm rounded-md">
      {children}
    </span>
    );
}

export const Tag = memo(TagBase);
export default Tag;

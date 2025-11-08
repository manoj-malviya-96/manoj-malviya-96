export function Tag({children}: { children: string }) {
    return (
        <span className="text-xs px-2 py-1 bg-white/20 backdrop-blur-sm rounded-md">
      {children}
    </span>
    );
}

export default Tag;


import {AnchorHTMLAttributes, ReactNode} from 'react';

export type LinkProps = {
    href: string;
    children: ReactNode;
    className?: string;
    external?: boolean;
    label?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children' | 'className'>;

export function Link({href, children, className, external, label, ...rest}: LinkProps) {
    const isExternal = external === true;
    const extra = isExternal ? {target: '_blank', rel: 'noopener noreferrer'} : {};
    return (
        <a href={href} className={className} aria-label={label} {...extra} {...rest}>
            {children}
        </a>
    );
}

export default Link;


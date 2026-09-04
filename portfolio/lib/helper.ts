export function conditionalProps(
    isTrue: boolean,
    propsWhenTrue: Record<string, unknown>,
) {
    if (!isTrue) {
        return {};
    }
    return propsWhenTrue;
}

export type ValuesOf<T extends readonly unknown[]> = T[number];

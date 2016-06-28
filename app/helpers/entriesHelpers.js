export function makeEntry(alias) {
    const selected = false;
    return { alias, selected }
}

export function selectMatching(alias, selected) {
    return entry => entry.alias == alias ? { ...entry, selected } : entry;
}

export type DBInfoAPIResponse = {
    entry_count: string, // Could be undefined if the database is locked, and we have no reason rn to serlialize the number
    is_unlocked: boolean,
    newest_entry_time: string, // Could be something other than time if database is locked or there are no entries
    oldest_entry_time: string // Same as above
};
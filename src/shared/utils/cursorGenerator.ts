export type CursorPaginateApiFunction<T, K extends string> = (
    cursor: number,
    limit: number,
) => Promise<BasePaginatedResponse<T, K>>;

export async function* cursorGenerator<Item, K extends string = string>(
    initialCursor: number,
    limit: number,
    cursorPaginateApiFunction: CursorPaginateApiFunction<Item, K>,
) {
    let currentCursor = initialCursor;
    while (true) {
        const page = await cursorPaginateApiFunction(currentCursor, limit);
        yield page.data;

        if (!page.data.hasMoreList) break;
        currentCursor = page.data.cursor;
    }
}

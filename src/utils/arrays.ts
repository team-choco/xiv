export const Arrays = {
  /**
   * Filters out duplicate items from a list.
   *
   * @param list - the list to remove duplicates from.
   * @param identifier - the identifier function.
   * @returns a unique list of items.
   */
  unique<T>(list: T[], identifier: (item: T) => any = (i: T) => i): T[] {
    const ids: any[] = [];

    return list.filter((item) => {
      const id = identifier(item);

      if (ids.includes(id)) {
        return false;
      }

      ids.push(id);
      return true;
    })
  },
}

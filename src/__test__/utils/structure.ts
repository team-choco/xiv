export function getTypeStructure(object?: { [key: string]: any }): undefined | null | { [key: string]: (undefined|null|string) } {
  if (object === undefined || object === null) return object;

  return Object.entries(object).reduce((output, [key, value]) => {
    if (typeof value === 'object') {
      output[key] = getTypeStructure(value);
    } else {
      output[key] = typeof value;
    }

    return output;
  }, {} as { [key: string]: any });
}

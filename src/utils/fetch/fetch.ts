import fetch from 'node-fetch';
import { TCRequestOptions, TCQueryParams } from './types';

export function buildUrl(url: string, query?: TCQueryParams): string {
  let result = url;

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      const values = (Array.isArray(value) ? value : [value]).filter(Boolean) as (string|number|boolean)[];

      if (values.length === 0) continue;

      if (result.includes('?')) {
        result += '&';
      } else {
        result += '?';
      }

      result += `${key}=${values.map((value) => encodeURIComponent(value)).join(`&${key}=`)}`;
    }
  }

  return result;
}

export async function Fetch<T>(url: string, options?: TCRequestOptions): Promise<T>;
export async function Fetch(url: string, options: TCRequestOptions = {}): Promise<any> {
  const response = await fetch(buildUrl(url, options.query), options);

  const contentType = response.headers.get('content-type');
  const content = contentType && contentType.includes('json') ? await response.json() : await response.text();

  if (response.status >= 400) {
    throw content;
  }

  return content;
}

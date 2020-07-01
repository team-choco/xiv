import fetch from 'node-fetch';
import { TCRequestOptions } from './types';

export async function Fetch<T>(url: string, options?: TCRequestOptions): Promise<T>;
export async function Fetch(url: string, options?: TCRequestOptions): Promise<any> {
  if (options && options.query) {
    for (const [key, value] of Object.entries(options.query)) {
      if (url.includes('?')) {
        url += '&';
      } else {
        url += '?';
      }

      if (Array.isArray(value)) {
        url += `${key}=${value.map((value) => encodeURIComponent(value)).join(`&${key}=`)}`;
      } else if (value) {
        url += `${key}=${encodeURIComponent(value)}`;
      }
    }
  }

  const response = await fetch(url, options);

  const contentType = response.headers.get('content-type');
  const content = contentType && contentType.includes('json') ? await response.json() : await response.text();

  if (response.status >= 400) {
    throw content;
  }

  return content;
}

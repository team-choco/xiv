import 'reflect-metadata';

export interface PoweredByDetails {
  name: string;
  url: string;
}

const key = Symbol('powered-by');

export function PoweredBy(options: PoweredByDetails) {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return (_target: any, _propertyKey: string, descriptor: PropertyDescriptor): void => {
    Reflect.defineMetadata(key, options, descriptor.value);
  }
}

export const PoweredByXIVAPI = PoweredBy({
  name: 'xivapi',
  url: 'https://xivapi.com',
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getPoweredBy(target: any): (undefined|PoweredByDetails) {
  return Reflect.getMetadata(key, target);
}

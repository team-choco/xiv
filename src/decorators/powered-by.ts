import 'reflect-metadata';

export interface PoweredByDetails {
  name: string;
  url: string;
}

const key = Symbol('powered-by');

export function PoweredBy(options: PoweredByDetails) {
  return (_target: any, _propertyKey: string, descriptor: PropertyDescriptor): void => {
    Reflect.defineMetadata(key, options, descriptor.value);
  }
}

export const PoweredByXIVAPI = PoweredBy({
  name: 'xivapi',
  url: 'https://xivapi.com',
});

export function getPoweredBy(target: any): (undefined|PoweredByDetails) {
  return Reflect.getMetadata(key, target);
}

import chain from '../../../repos/chain-registry/chain.schema.json';
import { findAllProps } from './utils';


// from strfy-js

export function camelCaseTransform(key: string): string {
  return key.replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '');
}

export function isSimpleKey(key: string): boolean {
  return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key);
}

export function dirname(path: string): string {
    return path.replace(/\/[^\/]*$/, ''); // Removes last segment after the last '/'
  }

  // end from strfy-js

const ops = findAllProps(chain)
    .map(property=>{
        const parent = dirname(dirname(property.path));
        const oldName = property.name;
        const newName = camelCaseTransform(property.name);
        if (isSimpleKey(property.name) && oldName !== newName) {
            return {
            op: 'renameProperty',
            path: parent,
            value: {
                oldName,
                newName
            }
        }
        }
    }).filter(Boolean);

console.log(ops);
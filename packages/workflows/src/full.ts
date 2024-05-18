import { Registry, RegistryBuilder, RegistryBuilderOptions, SchemaValidator } from '@chain-registry/workflows';
import { basename, dirname, join } from "path";

import { assetListDefaultValuesSetter, assetListOperations, assetListPropertyRenameMap, assetListValueReplacer,chainPropertyRenameMap, publicDir, registriesDir, registry } from './config';
import { camelCaseTransform, isValidIdentifierCamelized } from './utils';

import { mkdirpSync as mkdirp } from 'mkdirp';
import { writeFileSync } from 'fs';

const registryDir = join(registriesDir, 'full')

const options: RegistryBuilderOptions = {
  assetList: {
    camelCase: true,
    space: 2,
    propertyRenameMap: assetListPropertyRenameMap,
    defaultValuesSetter: assetListDefaultValuesSetter,
    valueReplacer: assetListValueReplacer
  },
  chain: {
    camelCase: true,
    space: 2,
    propertyRenameMap: chainPropertyRenameMap
  },
  ibcData: {
    camelCase: true,
    space: 2
  },
  ops: {
    assetList: [
      ...assetListOperations,
    ],
    chain: [ ],
    ibcData: []
  }
}

const builder = new RegistryBuilder(registry, options);

builder.build(registryDir);
builder.buildSchemas(registryDir, camelCaseTransform, isValidIdentifierCamelized);

// validate

// const validator = new SchemaValidator(new Registry(registryDir), {
//   allErrors: false,
//   useStrict: false
// });
// validator.validateAllData();


const which = 'full'
const newReg = new Registry(registryDir);
newReg.forEachSchemas(([title, schema])=>{
  const filename = basename(schema.path);
  const $id = `https://chainregistry.org/schemas/${which}/${filename}`;
  delete schema.content.$id
  const s = {
    $id,
    ...schema.content
  }
  const folderName = join(publicDir, which);
  const out = join(folderName, filename)
  mkdirp(dirname(out));
  writeFileSync(out, JSON.stringify(s, null, 2));
});
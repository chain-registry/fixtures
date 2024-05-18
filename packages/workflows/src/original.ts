import { Registry, RegistryBuilder, RegistryBuilderOptions, SchemaValidator } from '@chain-registry/workflows';
import { writeFileSync } from 'fs';
import { mkdirpSync as mkdirp } from 'mkdirp';
import { basename, dirname, join } from "path";

import { assetListDefaultValuesSetter, assetListOperationsOriginal, assetListPropertyRenameMap, assetListValueReplacer, chainPropertyRenameMap, publicDir, registriesDir, registry } from './config';

const registryDir = join(registriesDir, 'original')

const options: RegistryBuilderOptions = {
  assetList: {
    camelCase: false,
    space: 2,
    propertyRenameMap: assetListPropertyRenameMap,
    defaultValuesSetter: assetListDefaultValuesSetter,
    valueReplacer: assetListValueReplacer
  },
  chain: {
    camelCase: false,
    space: 2,
    propertyRenameMap: chainPropertyRenameMap
  },
  ibcData: {
    camelCase: false,
    space: 2
  },
  ops: {
    assetList: [
      ...assetListOperationsOriginal,
    ],
    chain: [],
    ibcData: []
  }
}

function run () {


const builder = new RegistryBuilder(registry, options);

builder.build(registryDir);
builder.buildSchemas(registryDir, (str: string) => str, (_str: string) => false);

// validate

const validator = new SchemaValidator(new Registry(registryDir), {
  allErrors: false,
  useStrict: false
});
validator.validateAllData();

const which = 'original'
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


}

setTimeout(run, 100);
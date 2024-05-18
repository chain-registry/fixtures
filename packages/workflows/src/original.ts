import { Registry, RegistryBuilder, RegistryBuilderOptions, SchemaValidator } from '@chain-registry/workflows';
import { join } from "path";

import { assetListDefaultValuesSetter, assetListOperationsOriginal, assetListPropertyRenameMap, assetListValueReplacer, chainPropertyRenameMap, registriesDir, registry } from './config';

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

}

setTimeout(run, 100);
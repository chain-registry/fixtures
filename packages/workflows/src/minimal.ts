import { Registry, RegistryBuilder, RegistryBuilderOptions } from '@chain-registry/workflows';
import { writeFileSync } from 'fs';
import { mkdirpSync as mkdirp } from 'mkdirp';
import { basename, dirname, join } from "path";

import { assetListDefaultValuesSetter, assetListOperations, assetListPropertyRenameMap, assetListValueReplacer, chainPropertyRenameMap,publicDir,registriesDir, registry } from './config';
import { camelCaseTransform, isValidIdentifierCamelized } from './utils';

const registryDir = join(registriesDir, 'minimal')

const options: RegistryBuilderOptions = {
  assetList: {
    camelCase: true,
    space: 2,
    propertyRenameMap: assetListPropertyRenameMap,
    defaultValuesSetter: assetListDefaultValuesSetter,
    valueReplacer: assetListValueReplacer,
    include: [
      '/$schema',
      '/chain_name',
      '/assets/*/description',
      '/assets/*/base',
      '/assets/*/name',
      '/assets/*/display',
      '/assets/*/symbol',
      '/assets/*/coingecko_id',
      '/assets/*/type_asset',
      '/assets/*/address',
      '/assets/*/denom_units',
      '/assets/*/traces'
    ],
    exclude: []
  },
  chain: {
    camelCase: true,
    space: 2,
    propertyRenameMap: chainPropertyRenameMap,
    include: [
      '/$schema',
      '/apis/*/*/address',
      '/bech32_prefix',
      '/chain_id',
      '/chain_name',
      '/codebase/cosmos_sdk_version',
      '/codebase/cosmwasm_enabled',
      '/codebase/cosmwasm_version',
      '/codebase/ibc_go_version',
      '/codebase/ics_enabled',
      '/description',
      '/explorers',
      '/extra_codecs',
      '/fee_token',
      '/staking_token',
      '/fees',
      '/images',
      '/key_algos',
      '/network_type',
      '/pretty_name',
      '/slip44',
      '/staking',
      '/website',
    ],
    exclude: []
  },
  ibcData: {
    camelCase: true,
    space: 2
  },
  ops: {
    assetList: [
      {
        op: 'removeProperty',
        path: '/$defs/asset',
        value: ['extended_description', 'ibc', 'logo_URIs', 'socials']
      },
      {
        op: 'remove',
        path: '/$defs/asset/properties/images/items/properties/image_sync'
      },
      {
        op: 'remove',
        path: '/$defs/pointer'
      },
      {
        op: 'remove',
        path: '/$defs/asset/if'
      },
      {
        op: 'remove',
        path: '/$defs/asset/then'
      },

      // asset_type
      ...assetListOperations,


    ],
    chain: [
      {
        op: 'removeProperty',
        path: '/',
        value: [
          'alternative_slip44s',
          'bech32_config',
          'daemon_name',
          'pre_fork_name',
          'update_link',
          'status',
          'logo_URIs',
          'peers',
        ]
      },

      // codebase
      {
        op: 'removeProperty',
        path: '/properties/codebase',
        value: [
          'binaries',
          'compatible_versions',
          'consensus',
          'cosmwasm_path',
          'genesis',
          'git_repo',
          'go_version',
          'recommended_version',
          'versions',
        ]
      },

      {
        op: 'removeDefinition',
        path: '/', // TODO fix upstream, doesnt use this
        value: 'peer',
      },

      {
        op: 'removeProperty',
        path: '/$defs/endpoint',
        value: ['provider', 'archive']
      },

      {
        op: 'remove',
        path: '/properties/images/items/if'
      },

      {
        op: 'remove',
        path: '/properties/images/items/then'
      }

    ],
    // @ts-ignore
    ibcData: []
  }
}

const builder = new RegistryBuilder(registry, options);

builder.build(registryDir);
builder.buildSchemas(registryDir, camelCaseTransform, isValidIdentifierCamelized);

const which = 'minimal'
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

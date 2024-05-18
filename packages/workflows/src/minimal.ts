import { Asset, AssetList } from '@chain-registry/interfaces';
import { Registry, RegistryBuilder, RegistryBuilderOptions, SchemaValidator } from '@chain-registry/workflows';
import { join } from "path";
import { JSStringifyPropertyReplacerOptions, JSStringifySetterOptions } from 'strfy-js';

import { registriesDir, sourceDir } from './config';


// FROM schema-typescript
// // Determine if the key is a valid JavaScript identifier

// Determine if the key is a valid JavaScript-like identifier, allowing internal hyphens
function isValidIdentifierCamelized(key: string) {
  return /^[$A-Z_][0-9A-Z_$\-]*$/i.test(key) && !/^[0-9]+$/.test(key) && !/^-/.test(key);
}

// FROM strfy-js
function camelCaseTransform(key: string): string {
  return key.replace(/[-_\s]+(.)?/g, (_, c) => c ? c.toUpperCase() : '');
}


const registryDir = join(registriesDir, 'minimal')
const registry = new Registry(sourceDir);

const options: RegistryBuilderOptions = {
  assetList: {
    camelCase: true,
    space: 2,
    propertyRenameMap: {
      '/assets/*/type_asset': 'asset_type'
    },
    defaultValuesSetter: {
      "/assets/*/type_asset": function (options: JSStringifySetterOptions<Asset, AssetList>): any {
        const asset = options.obj;
        const chain = registry.chains.find(chain => chain.chain_name === options.root.chain_name);

        switch (true) {
          case asset.base.startsWith('factory/'):
            return 'sdk.factory';

          case asset.base.startsWith('ft') && options.root.chain_name === 'bitsong':
            return 'bitsong';

          case asset.base.startsWith('erc20/'):
            return 'erc20';

          case asset.base.startsWith('ibc/'):
            return 'ics20'

          case asset.base.startsWith('cw20:'):
            return 'cw20'

          default:
            if (chain?.slip44 === 118 || chain?.codebase?.cosmos_sdk_version) {
              return 'sdk.coin';
            }
            return 'unknown'
        }
      }
    },
    valueReplacer: {
      "/assets/*/type_asset": function (options: JSStringifyPropertyReplacerOptions<Asset, AssetList>): any {
        const asset = options.obj;
        // const chain = registry.chains.find(chain => chain.chain_name === options.root.chain_name);

        switch (true) {

          case [
            'sdk.coin',
            'cw20',
            'erc20',
            'ics20',
            'snip20',
            'snip25',
            'bitcoin-like',
            'evm-base',
            'svm-base',
            'substrate',
            'unknown',
            'sdk.factory'
          ].includes(options.value):
            return options.value;
          case options.value === 'sdk.Factory':
          case asset.base.startsWith('factory/'):
            return 'sdk.factory';

          case options.value === 'sdk.Coin':
            return 'sdk.coin';

          case asset.base.startsWith('ft') && options.root.chain_name === 'bitsong':
            return 'bitsong';

          case asset.base.startsWith('erc20/'):
            return 'erc20';

          case asset.base.startsWith('ibc/'):
            return 'ics20'

          case asset.base.startsWith('cw20:'):
            return 'cw20'

          default:
            return options.value;
        }
      }
    },
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
    propertyRenameMap: {
      // '/logo_URIs': 'logos'
    },
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
      {
        op: 'add',
        path: '/$defs/asset/properties/type_asset/enum/-',
        value: 'sdk.factory'
      },
      {
        op: 'renameProperty',
        path: '/$defs/asset',
        value: {
          oldName: 'type_asset',
          newName: 'assetType'
        }
      },


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

//   const newRegistry = new Registry(jsonDir);

//   const generator = new SchemaTypeGenerator({
//     outputDir: schemaDir,
//     supportedSchemas: [
//         'chain.schema.json',
//         'assetlist.schema.json',
//         'ibc_data.schema.json'
//     ],
//     registry: newRegistry,
//     schemaTSOptions: {
//         strictTypeSafety: true,
//         camelCase: true,
//         useSingleQuotes: true
//     }
//   });
//   generator.generateTypes();

// const validator = new SchemaValidator(new Registry(registryDir), {
//   useStrict: false
// });
// validator.validateAllData();
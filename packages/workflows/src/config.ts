import { Asset, AssetList } from '@chain-registry/interfaces';
import { Registry } from '@chain-registry/workflows';
import { JSONSchemaPatchOperation } from 'json-schema-patch';
import { join, resolve } from "path";
import { JSStringifyPropertyReplacerOptions, JSStringifyReplacer, JSStringifySetter, JSStringifySetterOptions } from 'strfy-js';


export const rootDir = resolve(join(__dirname, '/../../../'));
export const sourceDir = join(rootDir, '/repos/chain-registry');
export const registriesDir = join(rootDir, '/registries');
export const publicDir = join(rootDir, '/www/public/schemas');
export const registry = new Registry(sourceDir);

type ValueReplacer = { [path: string]: JSStringifyReplacer };
type DefaultsSetter = { [path: string]: JSStringifySetter };

export const assetListDefaultValuesSetter: DefaultsSetter = {
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
};

export const assetListValueReplacer: ValueReplacer = {
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
};


export const chainPropertyRenameMap = {
  // '/logo_URIs': 'logos'
};

export const assetListPropertyRenameMap = {
  '/assets/*/type_asset': 'asset_type'
};

export const assetListOperations: JSONSchemaPatchOperation[] = [
  {
    op: 'add',
    path: '/$defs/asset/properties/type_asset/enum/-',
    value: 'sdk.factory'
  },
  {
    op: 'add',
    path: '/$defs/asset/properties/type_asset/enum/-',
    value: 'bitsong'
  },
  {
    op: 'renameProperty',
    path: '/$defs/asset',
    value: {
      oldName: 'type_asset',
      newName: 'assetType'
    }
  }
];

export const assetListOperationsOriginal: JSONSchemaPatchOperation[] = [
  {
    op: 'add',
    path: '/$defs/asset/properties/type_asset/enum/-',
    value: 'sdk.factory'
  },
  {
    op: 'add',
    path: '/$defs/asset/properties/type_asset/enum/-',
    value: 'bitsong'
  },
  {
    op: 'renameProperty',
    path: '/$defs/asset',
    value: {
      oldName: 'type_asset',
      newName: 'asset_type'
    }
  }
];
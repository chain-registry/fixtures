import { assetLists, chains } from '@chain-registry/v2/mainnet';
import { AssetList, Chain } from '@chain-registry/v2-types'
import { Box,Text } from '@interchain-ui/react';
import { useRouter } from 'next/router';
import * as React from "react";

import AssetListComponent from './AssetList';


interface Header {
  chain: Chain,
  assetList: AssetList
}

function List(props: Header) {
  return (
    <AssetListComponent
      needChainSpace
      isOtherChains={false}
      list={props.assetList.assets.map(asset => {
        const imgSrc = asset.images?.[0]?.svg || asset.images?.[0]?.png || '';
        return {
          imgSrc,
          symbol: asset.symbol,
          tokenBase: asset.base,
          tokenDenom: asset.display,
          name: asset.name
        }
      })}
    />
  );
}

function StakingAssetHeader() {
   const router = useRouter();
   const { chainName } = router.query;
   if (!chainName) return <div></div>;

   
  const assetList = assetLists.find(assetList=>assetList.chainName === chainName)!;
  const chain = chains.find(chain=>chain.chainName === chainName)!;
  const imgSrc = chain.images?.[0]?.svg || chain.images?.[0]?.png || '';
  

  return (
    <Box mt="$12">
      <a href="/registry" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Text fontSize="$lg" fontWeight="$bold">← Back</Text>
      </a>
      <Box mt="$16" mb="$18">
        </Box>
      <Box mt="$16" mb="$18">
        <Box>
          <Box
            as="img"
            height="$16"
            attributes={{
              src: imgSrc
            }}
          />
          <hr />
          <br />
          <Text fontSize="$xl" fontWeight="$semibold">
        {chain.prettyName}
      </Text>
      <Text
        color="$gray500"
        fontSize="$sm"
        fontWeight="$thin"
        attributes={{ marginTop: "$7" }}
      >
        {chain.description}
      </Text>
          <br />
          <hr />
          <br />
        </Box>
        <List
          chain={chain}
          assetList={assetList}
        />
      </Box>
      </Box>



      );
}

      StakingAssetHeader.defaultProps = {
        totalLabel: "Total",
      availableLabel: "Available",
};

      export default StakingAssetHeader;

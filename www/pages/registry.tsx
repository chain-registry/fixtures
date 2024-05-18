import { Layout } from "@/components";
import ChainHeader from '../components/common/ChainHeader';
import { assetLists, chains } from '@chain-registry/v2/mainnet';
import { AssetList, Chain } from '@chain-registry/v2-types'


export default function Components() {

  return (
    <Layout>
    { chains.map(chain=>{
      return (
        <>
        <a href={`/chains/${chain.chainName}`}>
          {chain.chainName}
        </a>
        <br />
        </>
      )
    })}      
    </Layout>
  );
}

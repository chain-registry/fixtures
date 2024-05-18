import { chains } from '@chain-registry/v2/mainnet';

import { Layout } from "@/components";



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

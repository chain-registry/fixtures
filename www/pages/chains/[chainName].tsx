import { chains } from '@chain-registry/v2/mainnet';
import { GetStaticPaths,GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

import { Layout } from "@/components";

import ChainHeader from '../../components/common/ChainHeader';

export default function Components() {
  return (
    <Layout>
      <ChainHeader />
    </Layout>
  );
}

interface QueryParams extends ParsedUrlQuery {
  chainName: string;
}

interface ChainAssetListPage {
  chainName: string;
}

const SKIP = ['andromeda1', 'thorchain'];

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => {
  const paths = chains.filter(a=>!SKIP.includes(a.chainName)).map(({ chainName }) => ({ params: { chainName } }));
  return {
    paths,
    fallback: false,
  };
};


export const getStaticProps: GetStaticProps<ChainAssetListPage, QueryParams> = async (context) => {
  const { chainName } = context.params!;
  return {
    props: {
      chainName
    },
  };
};

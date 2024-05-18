import { Layout } from "@/components";
import ChainHeader from '../../components/common/ChainHeader';

export default function Components(props: any) {
  return (
    <Layout>
      <ChainHeader chainName={props.chainName}/>
    </Layout>
  );
}

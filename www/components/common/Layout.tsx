import { Box, Container, Icon, Text } from "@interchain-ui/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import logo from "../../images/chain-registry-graphic.svg";
import { Drawer, Footer, Header } from ".";

export function Layout({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);

  return (
    <Container maxWidth="64rem" attributes={{ py: "$8" }}>
      <Head>
        <title>Chain Registry</title>
        <meta name="description" content="Your Gateway to the Interchain" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header onMenuButtonClick={() => setShow(true)} />
      <Box minHeight="78vh">
        {children}
      </Box>
      <Footer />
      <Drawer show={show} onClose={() => setShow(false)}>
        <DrawContent onClose={() => setShow(false)} />
      </Drawer>
    </Container>
  );
}

function DrawContent({
  onClose = () => {},
}) {
  return (
    <>
      <Box
        p="$9"
        display="flex"
        alignItems="center"
        borderBottomWidth="1px"
        borderBottomColor="$gray100"
        borderBottomStyle="solid"
      >
        <Link href="/">
          sdfsdfsdfsdfsdf
          <Image src={logo} alt="Cosmology" width={35} />
        </Link>
        <Box display="flex" flex="1" justifyContent="end">
          <Box attributes={{ onClick: onClose }}>
            <Icon
              name="close"
              size="$5xl"
              color="$blackAlpha600"
            />
          </Box>
        </Box>
      </Box>
      <Box px="$9">
        <Link href="/components" style={{ display: "block" }}>
          <Text fontSize="$lg" fontWeight="$semibold" attributes={{ py: "$8" }}>
            Components
          </Text>
        </Link>
      </Box>
    </>
  );
}

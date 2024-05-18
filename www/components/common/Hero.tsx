import { Box, Button, Text } from "@interchain-ui/react";
import Link from "next/link";

import Connect from "./Connect";

export function Hero() {
  return (
    <Box display="flex" my="$14">
      <Box mt="$14" maxWidth="500px">
        <Text
          color="$purple400"
          fontSize="$lg"
          fontWeight="$medium"
          attributes={{ display: "block" }}
        >
          The Essential Hub for Cosmos Developers
        </Text>
        <Text
          fontSize="64px"
          fontWeight="$medium"
          attributes={{
            mt: "$10",
            mb: "$10",
            display: "block",
          }}
        >
          Your Gateway to the Interchain
        </Text>
        <Text
          color="$gray500"
          fontSize="$sm"
          lineHeight="$tall"
          attributes={{
            display: "block",
            marginTop: "$7",
          }}
        >
          The Chain Registry is a comprehensive and organized resource offering detailed information on Cosmos blockchains, assets, and IBC channels. Designed with community input, it standardizes data to enhance your development experience across diverse projects.
        </Text>
        <Link href="/registry" style={{ display: "inline-block" }}>
          <Button intent="tertiary" attributes={{ mt: "$10" }}>
            Explore the Registry
          </Button>
        </Link>
      </Box>
      <Box display={{ mobile: "none", desktop: "block" }}>
        <Connect />
      </Box>
    </Box>
  );
}

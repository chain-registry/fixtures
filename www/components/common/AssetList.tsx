// @ts-nocheck
import * as React from "react";
import { Box, Stack, Text } from '@interchain-ui/react';
import AssetListItem from "./AssetListItem";

function AssetList(props) {
  return (
    <Box
      overflowX={{
        mobile: "scroll",
        tablet: "auto",
        desktop: "auto",
      }}
      {...props.attributes}
      className={props.className}
    >
      <Box display="flex" flexDirection="column" minWidth="720px">
        <Stack>
          <Box width="$19" />
          <Stack
            space="$0"
            attributes={{
              marginBottom: "$12",
              flex: 1,
            }}
          >
            <Text
              color="$textSecondary"
              attributes={{
                width: "25%",
              }}
            >
              {props.titles[0]}
            </Text>
            {props.needChainSpace ? (
              <Box width="25%">
                {props.isOtherChains ? (
                  <Text color="$textSecondary">Chain</Text>
                ) : null}
              </Box>
            ) : null}
            <Text
              color="$textSecondary"
              attributes={{
                width: "25%",
              }}
            >
              {props.titles[1]}
            </Text>
          </Stack>
        </Stack>
        <Stack space="$10" direction="vertical">
          {props.list?.map((item, index) => (
            <Box key={index}>
              <AssetListItem
                imgSrc={item.imgSrc}
                symbol={item.symbol}
                name={item.name}
                tokenBase={item.tokenBase}
                tokenDenom={item.tokenDenom}
              />
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

AssetList.defaultProps = { isOtherChains: false, titles: ["Asset", "Denom"] };

export default AssetList;

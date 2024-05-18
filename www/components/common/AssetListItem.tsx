// @ts-nocheck
import { Box,Stack, Text } from '@interchain-ui/react'
import * as React from "react";
import { useEffect,useState } from "react";

function AssetListItem(props) {
  const [size, setSize] = useState(() => "$xs");

  useEffect(() => {
    setSize("$sm");
  }, []);

  return (
    <Stack
      attributes={{
        minWidth: "720px",
        alignItems: "center",
      }}
      className={props.className}
    >
      <Box width="$19">
        <Box
          as="img"
          attributes={{
            src: props.imgSrc,
          }}
          width={"$14"}
          height={"$14"}
        />
      </Box>
      <Stack
        attributes={{
          alignItems: "center",
          flex: 1,
        }}
      >
        <Stack
          space="$0"
          direction="vertical"
          attributes={{
            width: "40%",
          }}
        >
          <Text
            fontWeight="$semibold"
            fontSize={size}
            attributes={{
              marginBottom: "$2",
            }}
          >
            {props.symbol}
          </Text>
          <Text color="$textSecondary" fontSize={size}>
            {props.name}
          </Text>
        </Stack>
        <Stack
          space="$0"
          direction="vertical"
          attributes={{
            width: "60%",
          }}
        >
          <Text
            fontWeight="$semibold"
            fontSize={size}
            attributes={{
              marginBottom: "$2",
            }}
          >
            {props.tokenDenom}
          </Text>
          <Text color="$textSecondary" fontSize={size}>
            {props.tokenBase}
          </Text>
        </Stack>
        <Stack
          space="$5"
          attributes={{
            width: "25%",
            justifyContent: "flex-end",
          }}
        >
        </Stack>
      </Stack>
    </Stack>
  );
}

AssetListItem.defaultProps = {
  needChainSpace: false,
  showDeposit: true,
  showWithdraw: true,
  depositLabel: "Deposit",
  withdrawLabel: "Withdraw",
};

export default AssetListItem;

//This will be used to fetch token details based on chainId and symbol. For now, we will use a hardcoded list of tokens for the supported chains. In the future, we can replace this with a dynamic fetch from a reliable source like Uniswap's token list or other APIs.

// export const fetchTokenByChainAndSymbol = async (
//   chainId: number | string,
//   symbol: string
// ) => {
//   const numericChainId = Number(chainId);

//   try {
//     const res = await fetch("https://tokens.uniswap.org");
//     if (!res.ok) throw new Error("Failed to fetch token list");
//     const { tokens } = await res.json();

//     const token = tokens.find(
//       (t: any) =>
//         t.chainId === numericChainId &&
//         t.symbol.toLowerCase() === symbol.toLowerCase()
//     );

//     return token
//       ? {
//           assetType: "ERC-20",
//           tokenAddress: token.address,
//           tokenName: token.name,
//           tokenSymbol: token.symbol,
//           tokenDecimals: token.decimals,
//         }
//       : null;
//   } catch (err) {
//     console.error("Token fetch error:", err);
//     return null;
//   }
// };


const TOKENS = {
  11142220: {
    USDC: {
      assetType: "ERC20",
      tokenAddress: "0x01C5C0122039549AD1493B8220cABEdD739BC44E", // Celo Sepolia USDC address
      tokenName: "USD Coin",
      tokenSymbol: "USDC",
      tokenDecimals: 6,
    },
    USDT: {
      assetType: "ERC20",
      tokenAddress: "0xd077A400968890Eacc75cdc901F0356c943e4fDb", // Celo Sepolia USDT address
      tokenName: "Tether USD",
      tokenSymbol: "USDT",
      tokenDecimals: 6,
    },
    MTK: {
      assetType: "ERC20",
      tokenAddress: "0x6c42Bf77e00457ef86c09Ca7AD86769a9A4c6F05", // Celo Sepolia MTK address
      tokenName: "MTK",
      tokenSymbol: "MTK",
      tokenDecimals: 18,
    }
  },

  80002: {
    USDC: {
      assetType: "ERC20",
      tokenAddress: "0xae1D7d8B36E9AbA7D95A75c69d50b38E7e02A9DD", // Polygon Amoy USDC address
      tokenName: "USD Coin",
      tokenSymbol: "USDC",
      tokenDecimals: 6,
    },
    USDT: {
      assetType: "ERC20",
      tokenAddress: "0xda830ea6a7d5292a0b917743cda437a6ca4b3135", // Polygon Amoy USDT address
      tokenName: "Tether USD",
      tokenSymbol: "USDT",
      tokenDecimals: 6,
    },
  },
} as const;

export const fetchTokenByChainAndSymbol = (
  chainId: number | string,
  symbol: string
) => {
  const token =
    TOKENS[Number(chainId) as keyof typeof TOKENS]?.[
      symbol.toUpperCase() as keyof (typeof TOKENS)[keyof typeof TOKENS]
    ];

  return token ?? null;
};
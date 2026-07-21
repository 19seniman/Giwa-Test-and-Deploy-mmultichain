module.exports = {
  mainnet: {
    ethereum:    { chainId: 1,        rpcEnv: "RPC_ETHEREUM" },
    bnbchain:    { chainId: 56,       rpcEnv: "RPC_BNBCHAIN" },
    arbitrum:    { chainId: 42161,    rpcEnv: "RPC_ARBITRUM" },
    optimism:    { chainId: 10,       rpcEnv: "RPC_OPTIMISM" },
    polygon:     { chainId: 137,      rpcEnv: "RPC_POLYGON" },
    base:        { chainId: 8453,     rpcEnv: "RPC_BASE" },
    linea:       { chainId: 59144,    rpcEnv: "RPC_LINEA" },
    scroll:      { chainId: 534352,   rpcEnv: "RPC_SCROLL" },
    zksync:      { chainId: 324,      rpcEnv: "RPC_ZKSYNC" },
    taiko:       { chainId: 167000,   rpcEnv: "RPC_TAIKO" },
    unichain:    { chainId: 130,      rpcEnv: "RPC_UNICHAIN" },
    xlayer:      { chainId: 196,      rpcEnv: "RPC_XLAYER" },
  },

  testnet: {
    // Ethereum Sepolia
    ethereum:    { chainId: 11155111, rpcEnv: "RPC_ETHEREUM_TESTNET" },
    // BNB Smart Chain Testnet
    bnbchain:    { chainId: 97,       rpcEnv: "RPC_BNBCHAIN_TESTNET" },
    // Arbitrum Sepolia
    arbitrum:    { chainId: 421614,   rpcEnv: "RPC_ARBITRUM_TESTNET" },
    // Optimism Sepolia
    optimism:    { chainId: 11155420, rpcEnv: "RPC_OPTIMISM_TESTNET" },
    // Polygon Amoy
    polygon:     { chainId: 80002,    rpcEnv: "RPC_POLYGON_TESTNET" },
    // Base Sepolia
    base:        { chainId: 84532,    rpcEnv: "RPC_BASE_TESTNET" },
    // Linea Sepolia
    linea:       { chainId: 59141,    rpcEnv: "RPC_LINEA_TESTNET" },
    // Scroll Sepolia
    scroll:      { chainId: 534351,   rpcEnv: "RPC_SCROLL_TESTNET" },
    // zkSync Era Sepolia
    zksync:      { chainId: 300,      rpcEnv: "RPC_ZKSYNC_TESTNET" },
    // Taiko Hekla
    taiko:       { chainId: 167009,   rpcEnv: "RPC_TAIKO_TESTNET" },
    // Unichain Sepolia
    unichain:    { chainId: 1301,     rpcEnv: "RPC_UNICHAIN_TESTNET" },
    // X Layer Testnet
    xlayer:      { chainId: 195,      rpcEnv: "RPC_XLAYER_TESTNET" },
  },
};

const axios = require("axios");
require('dotenv').config()
const { Network, Alchemy } = require("alchemy-sdk");

// Optional Config object, but defaults to demo api-key and eth-mainnet.
const settings = {
    apiKey: process.env.ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
    network: Network.ETH_MAINNET, // Replace with your network.
};

const alchemy = new Alchemy(settings);

const query = new URLSearchParams({
    verified: '',
    chainId: 'false',
    token: 'false',
    auth_key: process.env.UNMARSHAL_KEY
}).toString();

const getCurrentTokenBalance = async (userAddress, getChain) => {
    let verifiedToken = [];
    let nonVerifiedToken = [];
    const resp = await axios.get(
        `https://api.unmarshal.com/v1/${getChain}/address/${userAddress}/assets?${query}`,
    );

    // const data = await resp.data;
    console.log(resp.data.length);
    console.log(resp.data);
    for (let i = 0; i < resp.data.length; i++) {
        if (resp.data[i].verified == true) {
            verifiedToken.push(resp.data[i])
        } else {
            nonVerifiedToken.push(resp.data[i])
        }
    }
}


const getTransactionsHistoryWithPrice = async (userAddress, getChain) => {
    const query = new URLSearchParams({
        page: '1',
        pageSize: '25',
        contract: '',
        fromBlock: 0,
        toBlock: 9999999,
        auth_key: process.env.UNMARSHAL_KEY
    }).toString();

    const chain = getChain;
    const address = userAddress;
    const resp = await axios.get(
        `https://api.unmarshal.com/v2/${chain}/address/${address}/transactions?${query}`,

    );
    console.log(resp.data);
}

const getProfitLossWithTokenAddress = async (userAddress, getChain, tokenAddress) => {
    const query = new URLSearchParams({
        contract: tokenAddress,
        auth_key: process.env.UNMARSHAL_KEY
    }).toString();

    const resp = await axios.get(
        `https://api.unmarshal.com/v2/${getChain}/address/${userAddress}/userData?${query}`
    );

    // const data = await resp.json();
    console.log(resp.data);

}

const getLatestBlockNumber = async () => {
    // Setup: npm install @alch/alchemy-sdk
    const latestBlock = await alchemy.core.getBlockNumber();
    console.log("The latest block number is", latestBlock);
    return latestBlock;

}
let allChains = ["ethereum", "bsc", "matic", "celo", "arbitrum", "avalanche", "xinfin", "cronos", "velas", "zilliqa", "fantom", "fuse"]

// getCurrentTokenBalance("0x7D1c8E35fa16Ee32f11a882B3E634cCbaE07b790", "ethereum")
getProfitLossWithTokenAddress("0x7D1c8E35fa16Ee32f11a882B3E634cCbaE07b790", "ethereum", "0x8c6fa66c21ae3fc435790e451946a9ea82e6e523")
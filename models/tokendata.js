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
    verified: 'false',
    chainId: 'false',
    token: 'false',
    auth_key: process.env.UNMARSHAL_KEY
}).toString();

const getCurrentTokenBalance = async (userAddress, getChain) => {
    const chain = getChain;
    const address = userAddress;
    const resp = await axios.get(
        `https://api.unmarshal.com/v1/${chain}/address/${address}/assets?${query}`,
    );

    // const data = await resp.data;
    console.log(resp.data);
}


const getTransactionsHistoryWithPrice = async (userAddress, getChain) => {
    const query = new URLSearchParams({
        page: '1',
        pageSize: '25',
        contract: '',
        fromBlock: 0,
        toBlock: getLatestBlockNumber(),
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
        auth_key: 'mJUMS0d06uVI6FU6McyZ1OJJZEFKqF6f2sAtMkc0'
    }).toString();

    const address = userAddress;
    const chain = getChain;
    const resp = await fetch(
        `https://api.unmarshal.com/v2/${chain}/address/${address}/userData?${query}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        }
    );

    const data = await resp.json();
    console.log(data);

}

const getLatestBlockNumber = async () => {
    // Setup: npm install @alch/alchemy-sdk
    const latestBlock = await alchemy.core.getBlockNumber();
    console.log("The latest block number is", latestBlock);
    return latestBlock;

}

getLatestBlockNumber()

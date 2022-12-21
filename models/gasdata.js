

const axios = require("axios");
require('dotenv').config()

const calculateGasForAddress = async (address) => {
    let totalGasUsed = 0;
    let URL = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`
    const getTransactions = await axios.get(URL)
    let txns = getTransactions.data.result
    console.log(txns.length)
    for (let i = 0; i < txns.length; i++) {
        try {
            totalGasUsed += parseInt(txns[i].gasUsed);
        } catch (e) {
            continue
        }

    }
    console.log(totalGasUsed)
    console.log("In ether ", totalGasUsed / Math.pow(10, 18))
}


let allChains = ["ethereum", "bsc", "matic", "celo", "arbitrum", "avalanche", "xinfin", "cronos", "velas", "zilliqa", "fantom", "fuse"]
const totalEVMChanisInteracted = async (address) => {
    const query = new URLSearchParams({
        auth_key: process.env.UNMARSHAL_KEY
    }).toString();
    let returnData = [];
    let obj = {
        chain: "",
        txnCount: 0,
    }
    for (let i = 0; i < allChains.length; i++) {
        const resp = await axios.get(
            `https://api.unmarshal.com/v1/${allChains[i]}/address/${address}/transactions/count?${query}`,
        );
        console.log(`${allChains[i]}`, resp.data.total_transaction_count)
        obj.chain = allChains[i]
        obj.txnCount = resp.data.total_transaction_count
        returnData.push(obj)
        obj = {
            chain: "",
            txnCount: 0,
        }
    }
    return returnData;
}
//gas spend in past year

// calculateGasForAddress("0x7D1c8E35fa16Ee32f11a882B3E634cCbaE07b790")
totalEVMChanisInteracted("0x7D1c8E35fa16Ee32f11a882B3E634cCbaE07b790")
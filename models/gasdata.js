

const axios = require("axios");
require('dotenv').config()

const calculateGasForAddress = async (address) => {
    let totalGasUsed = 0;
    let URL = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`
    const getTransactions = await axios.get(URL)
    let txns = getTransactions.data.result
    console.log(txns.length)
    for (let i = 0; i < txns.length; i++) {

        totalGasUsed += parseInt(txns[i].gasUsed);
        console.log(txns[i].gasUsed)
    }
    console.log(totalGasUsed)
    console.log("In ether ", totalGasUsed / Math.pow(10, 18))
}


//gas spend in past year
calculateGasForAddress("lazypoet.eth")
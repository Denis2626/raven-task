const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider('https://sepolia.blast.io');
const contractAddr = '0x08F8Cc5aDB6940D6c946b89e8baC7A43cd556ff8';
const func = '0x838ad0ee';


const res = provider.call({
    to: contractAddr,
    data: func,
});

console.log(res);

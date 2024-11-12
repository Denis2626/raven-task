const { ethers } = require("ethers");
const dotenv = require('dotenv');
dotenv.config();

const provider = new ethers.JsonRpcProvider('https://sepolia.blast.io');
const contractAddr = '0x08F8Cc5aDB6940D6c946b89e8baC7A43cd556ff8';
const func = '0x838ad0ee';
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const abiCoder = new ethers.AbiCoder();

//Second part of task
const func2 = '0xddc24be3';
const wei = '420045003179';
const argVal = ethers.toBigInt('88137775079162310390943965773071648095067447874622157154558678606012945519409')
// const argBytes = ethers.getBytes(argVal);
// console.log('bytes', argBytes);
const argValHex = ethers.toBeHex(argVal);

console.log('hex', argValHex);
const txData = func2 + argValHex.slice(2);
const tx = {
    to: contractAddr,
    data: txData,
    value: ethers.parseUnits(wei, 'wei'),
};

async function main() {
    try {
        const res = await wallet.call({
            to: contractAddr,
            data: func,
        });
        console.log(res);
        const result = "0x000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000cf43616c6c207468697320636f6e747261637420776974682066756e6374696f6e207369676e6174757265202730786464633234626533272070726f766964696e672061202775696e743235362720617267756d656e74206f662076616c75653a20383831333737373530373931363233313033393039343339363537373330373136343830393530363734343738373436323231353731353435353836373836303630313239343535313934303920416c736f2073656e6420736f6d65207765693a203432303034353030333137390000000000000000000000000000000000"
        const decode = await abiCoder.decode(["string"], result);
        console.log(decode);

        // Part two
        const res2 = await wallet.sendTransaction(tx);
        console.log(res2);
    } catch (error) {
        console.error('Error:', error);
    }
}

main();

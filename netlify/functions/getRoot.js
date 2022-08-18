const fs = require('fs');
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

exports.handler = async function (event, context) {

    const whitelist = fs.readFileSync('../../assets/whitelist.txt').toString().split("\r\n");
    console.log(whitelist);

    const leafNodes = whitelist.map(addr => keccak256(addr));
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
    const rootHash = merkleTree.getHexRoot();

    console.log("root: " + rootHash);
};
const fs = require('fs');
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

exports.handler = async function (event, context) {

    const whitelist = fs.readFileSync('./assets/whitelist.txt').toString().split("\r\n");

    const input = JSON.parse(event.body).address;

    const leafNodes = whitelist.map(addr => keccak256(addr));
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
    const rootHash = merkleTree.getHexRoot();
    const proof = merkleTree.getHexProof(keccak256(input));

    //local check
    const result = merkleTree.verify(proof, keccak256(input), rootHash);

    return {
        statusCode: 200,
        body: JSON.stringify({ message: result }),
    };
};
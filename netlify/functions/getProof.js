const fs = require('fs');
const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

exports.handler = async function (event, context) {

    const whitelist = fs.readFileSync(require.resolve('./whitelist.txt')).toString().split("\n");

    const input = JSON.parse(event.body).address;
    console.log('generating proof for signer: ' + input);

    const leafNodes = whitelist.map(addr => keccak256(addr));
    const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });

    return {
        statusCode: 200,
        body: JSON.stringify({ proof: merkleTree.getHexProof(keccak256(input))
        }),
    };
};
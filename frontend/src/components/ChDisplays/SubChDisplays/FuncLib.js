import {ethers} from "ethers";


export default {
    signTxData: async (CID,nonce,u1Bal,u2Bal,privateKey) => {
        console.log(CID,nonce,u1Bal,u2Bal,privateKey)
        let hashedEncodedChannelData = ethers.utils.solidityKeccak256(
            ['uint', 'uint', 'uint', 'uint'],
            [CID,nonce,u1Bal,u2Bal]
        );
        let ArrayifiedHashedEncodedChannelData = ethers.utils.arrayify(hashedEncodedChannelData)
        let firstwallet = new ethers.Wallet(privateKey)
        let flatSig = await firstwallet.signMessage(ArrayifiedHashedEncodedChannelData)
        let sig = ethers.utils.splitSignature(flatSig);
        return sig
    }
}
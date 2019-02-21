pragma solidity ^0.5.0;

contract StateChannels {

    struct channelDetails{
    	address u1Address;
    	address u2Address;
    	string u1TokenName;
    	string u2TokenName;
    	uint u1InitialTokenBal;
    	uint u2InitialTokenBal;
    	uint terminatingNonce;
    	uint terminatingBlockNum;
    }
	
	mapping (uint => channelDetails) public channels;
	mapping (address => uint[]) public channelsAtAddress;

    function CreateChannel(bytes memory sig1, uint CID, address u1Address, string memory u1TokenName, string memory u2TokenName, uint u1InitialTokenBal, uint u2InitialTokenBal) public{
        //require CID is not already in the smart contract
        require(channels[CID].u1Address != address(0));
        address u2Address = msg.sender;
        //require that sig1 correlates to all the data above
        bytes32 ChHash = keccak256(abi.encode(CID,u1Address,u2Address,u1TokenName,u2TokenName,u1InitialTokenBal,u2InitialTokenBal));
    //uint 8 v =...;
    //bytes32 r =...;
    //bytes32 s =...;
        address calculatedProposingAddress = getOriginAddress(ChHash, v,r,s);
        require(calculatedProposingAddress == u1Address);
        //put the given data into the contract
        channels[CID]=channelDetails(u1Address,u2Address,u1TokenName,u2TokenName,u1InitialTokenBal,u2InitialTokenBal,0,0);
    }
    
    function InitChannelTermination(uint CID, bytes memory sig, uint proposedTerminatingBlockNumber, uint u1BalRetained, uint u2BalRetained, uint nonce) public{
        require(msg.sender == channels[CID].u1address || msg.sender == channels[CID].u2address);
        require((proposedTerminatingBlockNumber - 5760) > block.number); 
        require(nonce > channels[CID].terminatingNonce);
        // check sig verifies balances and nonce to the other address
        bytes32 TxHash = keccak256(abi.encode(CID,nonce,u1BalRetained,u2BalRetained));
    //uint 8 v =...;
    //bytes32 r =...;
    //bytes32 s =...;
        address calculatedProposingAddress = getOriginAddress(TxHash, v,r,s);
        require(channels[CID].u1address == calculatedProposingAddress || channels[CID].u1address == msg.sender);
        require(channels[CID].u2address == calculatedProposingAddress || channels[CID].u2address == msg.sender);

        channels[CID].terminatingNonce = nonce;
        channels[CID].terminatingBlockNum = proposedTerminatingBlockNumber;
    }
    
    function TerminateChannel(uint CID) public{
        require(block.number > channels[CID].terminatingBlockNum);
        //do stuff not considered in out project
        //uint u1Owes = u2InitialTokenBal - u2BalRetained;
        //uint u2Owes = u1InitialTokenBal - u1BalRetained;
        	//transfer u1Owes tokens from u1 to u2 (to be implemented later)
    }
    
    function getOriginAddress(bytes32 signedMessage, uint8 v, bytes32 r, bytes32 s) public pure returns(address) {
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHash = keccak256(abi.encode(prefix, signedMessage));
        return ecrecover(prefixedHash, v, r, s);
    }
    
}
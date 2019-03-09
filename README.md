# SimpleEthStateChannel
This is a decentralized app(dApp), based on Ethereum network(at this time, it works on Ropseten test network).It facilitates a state channel between to individuals owning Ethereum addresses.  

A user can login with his/her Ethereum address AND private key,then  propose a channel with balances from both parties. Upon  approval of other party, a channel will be created on blockchain and then they can  start proposing(and accepting)transactions. Transactions are in the form of token exchanges. Once a transaction was approved, the state of the channel  may be updated, tokens exchanged and channel can be closed. Cahnnel closure can be initiated by any of participants at this point.

The frontend has been made with React and  states are being managed amongst blockchain, backend database and frontend with Redux. The backend uses Leveldb to store necessary data.

Ethersjs facilitates cummunication between this app and Ethereum. Releted smart contract has been coded with Solidity.

Both front and backend are on AWS. To start this dApp, click on this URL:

http://ec2-18-217-110-248.us-east-2.compute.amazonaws.com:3000/


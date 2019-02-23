import React, { Component } from "react";
import { connect } from "react-redux";
import {isValidAddress} from "ethereumjs-util";

//make this an import???
const ethers = require('ethers')



class ProposeNewCh extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CID:"666",
            u2Address:"0x2",
            u1TokenName:"Marks",
            u2TokenName:"Matts",
            u1InitialTokenBal:"30",
            u2InitialTokenBal:"50"
        }
    }

    //can these be made into components each with a condition passed down?

    handleCIDChange = (Event) => {
        if (Number.isInteger(Number(Event.target.value)))
            this.setState( {
                ...this.state,
                CID:Event.target.value
            })
    }
    // handleu1AddressChange = (Event) => {
    //     if (/^0[xX][0-9a-fA-F]*/.test(Event.target.value))
    //         this.setState( {
    //             ...this.state,
    //             u1Address:Event.target.value
    //         })

    // }
    handleu2AddressChange = (Event) => {
        if (/^0[xX][0-9a-fA-F]*$/.test(Event.target.value))
            this.setState( {
                ...this.state,
                u2Address:Event.target.value
            })
    }
    handleu1TokenNameChange = (Event) => {
        this.setState( {
            ...this.state,
            u1TokenName:Event.target.value
        })
    }
    handleu2TokenNameChange = (Event) => {
        this.setState( {
            ...this.state,
            u2TokenName:Event.target.value
        })
    }
    handleu1InitialTokenBalChange = (Event) => {
        if (!isNaN(Event.target.value && Event.target.value >= 0))
            this.setState( {
                ...this.state,
                u1InitialTokenBal:Event.target.value
            })
    }
    handleu2InitialTokenBalChange = (Event) => {
        if (!isNaN(Event.target.value) && Event.target.value >= 0)
            this.setState( {
                ...this.state,
                u2InitialTokenBal:Event.target.value
            })
    }

    handleSubmit = async () => {
        //check if both addresses are valid
        //check if CID exists
        //check if names.length > 0

        //do a fetch
        //put the CID into the header and change server?
        let u1Sig = await this.signChannelData() ;
        let body ={...this.state,u1Address:this.props.u1Address, u1Sig: u1Sig}

        fetch("http://35.182.146.179:3001/Channel", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                //"cid":this.props.activeChannel,
            },
            body: JSON.stringify(body)
        })
        .then("success",console.log)
        .catch("failure",console.log)
    }

    // signChannelDataWithMetamask = async () => {
    //     let hashedEncodedChannelData = ethers.utils.solidityKeccak256(
    //         ['uint', 'address', 'address', 'string', 'string', 'uint', 'uint'],
    //         [
    //             this.state.CID,
    //             this.props.u1Address,
    //             this.state.u2Address,
    //             this.state.u1TokenName,
    //             this.state.u2TokenName,
    //             this.state.u1InitialTokenBal,
    //             this.state.u2InitialTokenBal
    //         ]
    //     );
    //     let ArrayifiedHashedEncodedChannelData = ethers.utils.arrayify(hashedEncodedChannelData)

    //     console.log("calling metamask")
    //     //console.log(window.web3.fromUtf8( ArrayifiedHashedEncodedChannelData  ))
    //     //console.log(window.web3)//.utf8ToHex("Hello world")
    //     //window.web3.eth.sign("0x0F7Cd2D9F4CEc1f7E01f880315Fd56101095fF87" ,"sss" )
    //     var result = window.web3.eth.sign("0x0F7Cd2D9F4CEc1f7E01f880315Fd56101095fF87",
    //     ArrayifiedHashedEncodedChannelData, (x) => {console.log(x)}); // second argument is web3.sha3("xyz")
    //  console.log(result);
    // }
   
    signChannelData = async () => {
        //generate the hash to sign based on channel details
        let hashedEncodedChannelData = ethers.utils.solidityKeccak256(
            ['uint', 'address', 'address', 'string', 'string', 'uint', 'uint'],
            [
                this.state.CID,
                this.props.u1Address,
                this.state.u2Address,
                this.state.u1TokenName,
                this.state.u2TokenName,
                this.state.u1InitialTokenBal,
                this.state.u2InitialTokenBal
            ]
        );
        let ArrayifiedHashedEncodedChannelData = ethers.utils.arrayify(hashedEncodedChannelData)


        //let phrase = "example exile argue silk regular smile grass bomb merge arm assist farm"
        //let firstwallet = ethers.Wallet.fromMnemonic(phrase)//.connect(provider);

        let firstwallet = new ethers.Wallet(this.props.privateKey)
        let flatSig = await firstwallet.signMessage(ArrayifiedHashedEncodedChannelData)//.then(console.log)
        let sig = ethers.utils.splitSignature(flatSig);
        //  v1 = sig.v //uint8
        //  r1 = sig.r //bytes32
        //  s1 = sig.s//bytes32
        console.log(sig)
        return sig
    }




    render() {
        return (
            <div>
               
                <br/>
                
             

                Enter CID: 
                <input 
                    type="text" 
                    size="10"
                    onChange={this.handleCIDChange}
                    value={this.state.CID}
                /><br/>

                Enter u1Address: 
                <input 
                    type="text" 
                    size="35"
                    disabled="disabled"
                    value={this.props.u1Address}
                /><br/>

                Enter u2Address: 
                <input 
                    type="text" 
                    size="35"
                    onChange={this.handleu2AddressChange}
                    value={this.state.u2Address}
                    

                />
                {isValidAddress(this.state.u2Address) ?
                    <div>VALID - do this better</div>
                :
                    <div>INVALID - do this better</div>
                }
                <br/>


                Enter u1TokenName: 
                <input 
                    type="text" 
                    size="20"
                    onChange={this.handleu1TokenNameChange}
                    value={this.state.u1TokenName}
                /><br/>

                Enter u2TokenName: 
                <input 
                    type="text" 
                    size="20"
                    onChange={this.handleu2TokenNameChange}
                    value={this.state.u2TokenName}
                /><br/>

                Enter u1InitialTokenBal: 
                <input 
                    type="text" 
                    size="20"
                    onChange={this.handleu1InitialTokenBalChange}
                    value={this.state.u1InitialTokenBal}
                /><br/>

                Enter u2InitialTokenBal: 
                <input 
                    type="text" 
                    size="20"
                    onChange={this.handleu2InitialTokenBalChange}
                    value={this.state.u2InitialTokenBal}
                /><br/>



                ((Fill out Capcha to)) 
                <button 
                    onClick={this.handleSubmit}
                    className="btn btn-success"
                >Propose New Channel->(sign as u1)</button>

            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        u1Address: state.InteractReduxState.addressSignedIn,
        privateKey : state.InteractReduxState.privKey

    }
}


export default connect(mapStateToProps)(ProposeNewCh);




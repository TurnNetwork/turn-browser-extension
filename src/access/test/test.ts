
import * as Web3 from 'web3'
import {abi1} from './testAbi'
//@ts-ignore
const provider = window.turnNetwork
const netWorkInfo = {
    rpcUrl: "http://8.218.81.92:16790",
    chainId:''
}

//@ts-ignore
const web3 = new Web3(provider) || undefined


const contractAddress = "0x3a9d4C411F8A37be2f34B208A03719a2cCf4Aee0";
let workAddress = ''
const tempAddress = '0xA2088F51Ea1f9BA308F5014150961e5a6E0A4E13'

const _queryChainID =()=> {
      return provider.send("eth_chainId");
    }
 const    _addNetwork = ()=> {
    return new Promise(async (resolve, reject) => {
    const add_data = {
        method: "eth_addOrSelectZeroTimeNetwork",
        params: [{ rpcUrls: netWorkInfo.rpcUrl }]
    };
    try {
        const res = await provider.purveyor.send(add_data);
        console.log('添加网络成功');
        resolve(res);
    } catch (error) {
        console.log(error);
    }
    });
}

export const test_linkSecondaryClientNetwork = async  ()=>{
    const chainId = await _queryChainID();
    // await this._addNetwork();
    if (chainId !== netWorkInfo.chainId) {
      await _addNetwork();
    }
    const newChainId = await _queryChainID();
    if (newChainId !== netWorkInfo.chainId) return false;
    const list = await provider.send("eth_requestAccounts");
    console.log(list);
}

export const test_requestAccounts = async  ()=>{
    const ret = await provider.send('eth_requestAccounts')
    workAddress = ret[0]
    console.log('requestAccounts',ret);
}

export const test_requestZerAccounts = async  ()=>{
    const ret = await provider.send('eth_requestZeroAccounts')
    workAddress = ret[0]
    console.log('requestAccounts',ret);
}



export const test_sendBindTempKey = async ()=>{
    console.log(provider);
    const ret = await provider.sendBindTempKey({
        gameContractAddress:contractAddress,
        tempAddress:tempAddress,
        period: Uint8Array.from([1])
    })
    console.log(ret);
    
}


export const test_sendBehalfSignature = async ()=>{
        const tokenContract:any = new web3.eth.Contract(abi1,contractAddress)
        let data = await tokenContract.methods.setIssuer(workAddress)

        data = data.encodeABI()
        data = data.substring(2)
        const periodArg = Uint8Array.from([1])
        const callData = Buffer.from(data,'hex')
        const ret = await provider.sendBehalfSignature({
            workAddress:workAddress,
            gameContractAddress:contractAddress,
            periodArg,
            callData
        })
        console.log(ret);
    
}

export const test_sendInvalidateTempPrivateKey = async ()=>{
    const ret = await provider.sendInvalidateTempPrivateKey({
        gameContractAddress:contractAddress,
        tempAddress:tempAddress
    })
    console.log('sendInvalidateTempPrivateKey',ret);
}

export const test_sendAddLineOfCredit = async ()=>{
    const ret = await provider.sendAddLineOfCredit({
        gameContractAddress:contractAddress,
        workAddress:workAddress,
        addValue:'10000000'
    })
    console.log('test_sendAddLineOfCredit',ret);
}

export const test_sendGetLineOfCredit = async ()=>{
    const ret = await provider.sendGetLineOfCredit({
        gameContractAddress:contractAddress
    })
    console.log('test_GetLineOfCredit',ret);
}






export const test_send = async ()=>{
        const address = '0x15866368698d0f2c307E98F9723065B982e61793'
       
       const getBalance = await web3.eth.getBalance(address)
       console.log(getBalance);
       const getChainId = await web3.eth.getChainId()
       console.log(getChainId);
       const getGasPrice = await web3.eth.getGasPrice()
       const nonce = await web3.eth.getTransactionCount(address); 
       console.log(getGasPrice);
       console.log(nonce);
       try{
        const data =  await web3.eth.sendTransaction({
             from: address,
             to: '0x36c756417E63F740d83908d5216310A4603d6ecc',
             value: '1000000000000000000'
         })
         .on('transactionHash', function (transactionHash:any) {
          console.log(transactionHash);
        })
         console.log(data);
       }catch(e){
          console.log(e);
       }
   
      
}

export const test_sendContract = async ()=>{
    const address = '0x15866368698d0f2c307E98F9723065B982e61793'

   try{

         const tokenContract:any = new web3.eth.Contract([{
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "quantity",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "channel",
                    "type": "string"
                }
            ],
            "name": "mint",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        }],address)

        const data = await tokenContract.methods.mint('10000000000','string')
        data.send({from: '0x15866368698d0f2c307E98F9723065B982e61793'}).on('transactionHash', function (transactionHash:any) {
           console.log(transactionHash);
        })

   }catch(e){
      console.log(e);
   }

  
}
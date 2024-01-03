import {rpc} from '../background/TRX'

const rpcUrl = "http://192.168.31.115:18001/"
const method = {
    'getTransactionReceipt':{
        name:'eth_getTransactionReceipt',
        data: ["0xa9c51e3ff318ab5b95d2bafed3740b33715db5b78a39de5e2832e001b8b1b408"]
    }
}
// ts-node
const test = async ()=>{
   const bb = await  rpc(
        method.getTransactionReceipt.name,
        method.getTransactionReceipt.data,
        rpcUrl
    )
    console.log('bb',bb);
}

test()
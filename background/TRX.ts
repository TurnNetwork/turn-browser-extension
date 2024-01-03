import { Transaction } from 'ethereumjs-tx';
import Common from 'ethereumjs-common';
import {METHODS,ETH_PREFIX,LATEST,JSONRPCVersion,
    TEMPPRIVATEKEYCONTRACT} from '../extension-config'
import {hexToObj} from '../utils'


const method_1 = ETH_PREFIX+METHODS.SENDRAWTRANSACTION
const method_2 = ETH_PREFIX+METHODS.ESTIMATEGAS
const method_3 = ETH_PREFIX+METHODS.GETTRANSACTIONCOUNT
const method_4 = ETH_PREFIX+METHODS.CHAINID
const method_5 = ETH_PREFIX+METHODS.GASPRICE
const method_call = ETH_PREFIX+METHODS.CALL
const defaultGas = '0xf4240'
const fetchHeader = {'Content-Type': 'application/json'}
let activeNetWork:any = {}



const transactionFn = (data:any) => {
    let rawTransaction
    try {
        const customCommon = Common.forCustomChain(
            'mainnet',{name: 'my-network',networkId: 1,chainId: data.chainId},
            'petersburg'
        );
        const tx = new Transaction(data.rawTx, { common: customCommon });
        tx.sign(Buffer.from(data.pw, 'hex'));
        rawTransaction = tx.serialize().toString('hex');
        if (!rawTransaction.startsWith('0x')) {
            rawTransaction = '0x' + rawTransaction;
        }
        return rawTransaction
    } catch (e) {
        console.log(e);
    }
}


export const setClient = (netWork:any)=>{
    activeNetWork = netWork
}

export const getClient = ()=>{
   return activeNetWork
}



export const signTx = async (pw:string, chainId:string, rawTx:any) => {
    pw = pw.toLowerCase().startsWith('0x') ? pw.substring(2) : pw;
    let rawTransaction = await transactionFn({pw, rawTx, chainId})
    return rawTransaction
}
 
export const  rpc = async  (method:string, params:any,url?:string)=>  {
    try {
        params = params || [];
        const data = { 
            "jsonrpc": JSONRPCVersion,
            "method": method,
            "params": params, 
            "id": Date.now() 
        }
        let replay:any = await fetch(url || activeNetWork?.netWorkUrl, {
            method: 'post',
            headers: fetchHeader,
            body: JSON.stringify(data)
        });
        if (replay.status === 200) {
             replay = await replay.json()
            if (undefined === replay.result && undefined != replay.error) {
                return Promise.reject(replay.error);
            } else {
                return Promise.resolve(replay.result);
            }
        } else {
            return Promise.reject("request error");
        }
     
    } catch (error) {
        return Promise.reject(error)
    }
}


export const sendUnsignedTransaction = async (data:any,p:string)=>{
    const rawTx = data.params[0]
   
    rawTx.nonce = await rpc(method_3, [rawTx.from,LATEST])
    rawTx.gas = await rpc(method_2, [rawTx]) || defaultGas
    rawTx.gasPrice = await rpc(method_5, [])
    const signTxData = await signTx( p,activeNetWork.chainId,rawTx)
    return await rpc(method_1,[signTxData])
  
}



export const rawTxSend = async (params: any, other: any) => {
    try {
        const rawTx: any = {}
        rawTx.data = params// 
        rawTx.from = other.address;
        rawTx.to = TEMPPRIVATEKEYCONTRACT;
        rawTx.gasPrice = await rpc(method_5, [],other?.rpc) 
        rawTx.nonce = await rpc(method_3, [rawTx.from,LATEST],other?.rpc)
        rawTx.gas = await rpc(method_2, [rawTx],other?.rpc) 
        const rawTransaction = await signTx(other.pw, activeNetWork?.chainId, rawTx);
        return rawTransaction
    } catch (e) {
        return e
    }

}

export const sendSystemContractOperation = async(params:any,other:any)=>{
    try {
        const data = await rawTxSend(params,other)
        if (typeof data == 'object') return data
        const res = await rpc(method_1, [data],other?.rpc);
        return res
    } catch (e) {
        return e
    }
}


export const sendSystemContractQuery = async(params:any,other:any)=>{
    try {
        const data:any = {
            to: TEMPPRIVATEKEYCONTRACT,
            data: params
        }
        other.from ? data.from = other.from : ''
        const res = await rpc(method_call, [data,LATEST],other?.rpc);
        return hexToObj(res) || '0x'
    } catch (e) {
        return e
    }
}


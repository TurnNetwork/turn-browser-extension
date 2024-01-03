import {objToParams, paramsToData} from '../utils'
import {METHODS} from '../extension-config'
import {BaseProvider} from './BaseProvider'
import {errorMsg} from '../errorMessage'


interface BindTempKey   {
    gameContractAddress:string,
    tempAddress:string,
    period?:any
}

interface BehalfSignature {
    gameContractAddress:string
    workAddress:String
    periodArg?:any
    callData:any
}
interface InvalidateTempPrivateKey{
    gameContractAddress:string
    tempAddress:String
}

interface AddLineOfCredit{
    gameContractAddress:string
    workAddress:String,
    addValue:BigInt
}
interface GetLineOfCredit{
    gameContractAddress:string
}

export class SystemContractProvider extends BaseProvider {
    // public secondaryClientUrl:string
    // private chainId:any
    constructor() {
        super();
        // this.secondaryClientUrl = ''
        // this.chainId = ''
    }
    
    // async linkSecondaryClientNetwork(url:string) {
    //    try{
    //         const eth_chainId = await  this.request({method:'eth_chainId',params:{
    //             secondaryClientUrl:url,
    //             data:[]
    //         }})
    //         this.secondaryClientUrl = url
    //         this.chainId = eth_chainId
    //         return eth_chainId
    //    }catch(e){
    //       return errorMsg[3200]
    //    }
    // }

    
    async sendBindTempKey({
        gameContractAddress,
        tempAddress,
        period}:BindTempKey){
        try{
            const data = paramsToData(objToParams([ 7200, gameContractAddress, tempAddress, period ]));
            return await this.request({method:METHODS.SYSTEMCONTRACT,params:{data}})
        }catch(e){
            return Promise.reject(e)
        }
    }

    
    async sendBehalfSignature({
        gameContractAddress,
        workAddress,
        periodArg,
        callData}:BehalfSignature){
        try{
            const data = paramsToData(objToParams([
                7201, workAddress, gameContractAddress, periodArg, callData
            ]));
            const hex =  await this.request({method:METHODS.SYSTEMCONTRACT,params:{
                data,isZeroSign:true
            }})

            return hex
        }catch(e){
            return Promise.reject(e)
        }
    }


    async sendInvalidateTempPrivateKey({
        gameContractAddress,
        tempAddress,
    }:InvalidateTempPrivateKey){
        try{
            const data = paramsToData(objToParams([
                7202, gameContractAddress,tempAddress
            ]));
            return await this.request({method:METHODS.SYSTEMCONTRACT,params:{data}})
        }catch(e){
            return Promise.reject(e)
        }
    }
    
  
    

    async sendAddLineOfCredit({
        gameContractAddress,
        workAddress,
        addValue
    }:AddLineOfCredit){
        try{
            const data = paramsToData(objToParams([
                7203, gameContractAddress, workAddress, addValue,
            ]));
            const hex =  await this.request({method:METHODS.SYSTEMCONTRACT,params:{data}})
            return hex
        }catch(e){
            return Promise.reject(e)
        }
    }

    async sendGetLineOfCredit({
        gameContractAddress
    }: GetLineOfCredit){
        try{
            const data = paramsToData(objToParams([7204,gameContractAddress]));
            const hex =  await this.request({method:METHODS.SYSTEMCONTRACT,params:{
                data,type:'call',from:true
            }})
            return hex
        }catch(e){
            return Promise.reject(e)
        }
    }

}

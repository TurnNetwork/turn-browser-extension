import * as CryptoJS from 'crypto-js'
import * as copyTool from 'copy-to-clipboard'
import {message} from 'antd'
//@ts-ignore
import Big from 'big.js'

export const setStorage = (name: string, item: any) => {
    localStorage.setItem(name, JSON.stringify(item))
}

export const getStorage = (name: string) => {
    let info = ''
    try {
        info = JSON.parse(localStorage[name])
    } catch (e) {
        info = ''
    }
    return info
}

export const processNum = (balance: string, decimals: string): string => { //18位 => 
    if (!balance) return '0'
    const num = new Big(balance)
        .div(new Big(10).pow(+decimals))
        .toFixed();
    return num
}

export const setExtensionStorage = (name: string, item: any) => {
    const obj:any = {}
    obj[name] = item
    if(globalThis?.chrome?.storage){
        globalThis?.chrome?.storage?.local?.set(obj)
    }else{
        setStorage(name,item)
    }
}

export const getExtensionStorage = async (name: string) => {
    let params
    if(globalThis?.chrome?.storage){
        params =  await globalThis?.chrome?.storage?.local?.get(name)
        try {
            params = JSON.parse(params[name])
        } catch (e) {
            params = params[name] || ''
        }
        return params
    }else{
        return getStorage(name)
    }
}



export const Md5 = (str:string)=>{
    const wordArray = CryptoJS.enc.Utf8.parse(str);
    const md5WordArray = CryptoJS.MD5(wordArray);
    const md5Str = CryptoJS.enc.Hex.stringify(md5WordArray);
    return md5Str
}


export const copy = (str:string)=>{
    copyTool(str);
    setTimeout(() => {
        message.success('copy success')
    }, 500);
}



export const formatAddress = (address: string) => {
    if (!address) return ''
    return address.substring(0, 10) + '...' + address.substring(address.length - 6)
}

import * as RLP from 'rlp';
import {SYSTEMCONTRACTFNPARAMS} from '../extension-config'


export const objToParams = (params: any) => {
    if (!Array.isArray(params)) {
        let pars = [params.funcType]
        let order = (SYSTEMCONTRACTFNPARAMS as any)[params.funcType];
        for (const key of order) {
            pars.push(params[key])
        }
        return pars;
    }
    return params;
}

export const paramsToData = (params: any) => {
    let arr: any = []
    for (let v of params) {
        if(!v){ arr.push('');continue;}
        v = RLP.encode(v)
        arr.push(v)
    }
    
    let rlpData = '0x' + RLP.encode(arr).toString('hex');
    return rlpData;
}

export const rawTxCall = (params: any) => {
    let data: any = ''
    let paramsNew = objToParams(params);
    data = paramsToData(paramsNew);
    return data
}


export const hexToObj = (hexStr: string):any => {
    hexStr = hexStr.toLowerCase().startsWith('0x') ? hexStr.substring(2) : hexStr;
    let str: any = Buffer.from(hexStr, 'hex').toString();
    try {
        str = JSON.parse(str);
        if (typeof str.Data === 'string') {
            try {
                str.Data = JSON.parse(str.Data);
            } catch (error) { }
        }
    } catch (error) { }
    return str;
}
export const PREFIX = 'bub_' 
export const ETH_PREFIX = 'eth_'
export const LATEST = 'latest'
export const JSONRPCVersion = "2.0"
export const TestExtensionId = 'mffhgfedmbgmadlhmhjahjmbomlkjnaf'//
export const NOTIFICATION_HEIGHT = 600;
export const NOTIFICATION_WIDTH = 375;
export const TASKQUEUE = 'TASKQUEUE' //
export const TEMPPRIVATEKEYCONTRACT  ='0x1000000000000000000000000000000000000021'//

export const METHODS={
    'GETTRANSACTIONRECEIPT':'getTransactionReceipt',
    'SENDTRANSACTION':  'sendTransaction',
    'SENDRAWTRANSACTION':'sendRawTransaction',
    'ESTIMATEGAS':'estimateGas',
    'GASPRICE':'gasPrice',
    'GETTRANSACTIONCOUNT':'getTransactionCount',
    'CHAINID':'chainId',
    'SYSTEMCONTRACT':'bub_system_contract',
    "CALL":"call"
}


export const SYSTEMCONTRACTFNPARAMS = {
   "7200":["gameContractAddress", "tempAddress", "period"],
   "7201":["workAddress","gameContractAddress",  "periodArg","callData"],
   "7202":["gameContractAddress", "tempAddress"],
   "7203":["gameContractAddress", "workAddress", "addValue"],
   "7204":["gameContractAddress"],
}

export const MSG_BUTSUBMIT = 'POPUPSUBMIT'
export const MSG_BUTCANCEL = 'POPUPCANCEL'
export const MSG_REQUEST = 'REQUEST'

export const WALLETNAME = "WALLETJSON"
export const ZEROWALLETJSON = "ZEROWALLETJSON"


export const NET_WORK_N:string = 'NET_WORK_N'
export const PW:string = 'PW'
export const NET_WORK:any = [
    {
            active: true,
            name: 'Turn Main',
            symbol: 'TURN',
            chainId: '2501',
            netWorkUrl: 'https://rpc.bubbonet.com/',
            scanUrl: 'http://scan.bubbonet.com',
    },
    {
            active: false,
            name: 'Turn test',
            symbol: 'TURN',
            chainId: '2509',
            netWorkUrl: 'https://rpc-test.bubbonet.com',
            scanUrl: 'http://scan-test.bubbonet.com',
    }
]
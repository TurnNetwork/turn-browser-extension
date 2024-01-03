import safe_event_emitter_1 from "@metamask/safe-event-emitter"
import { v4 as uuidV4} from 'uuid'
import {METHODS,ETH_PREFIX,MSG_REQUEST} from '../extension-config'

const method_1 = ETH_PREFIX+METHODS.GETTRANSACTIONRECEIPT
export class BaseProvider extends safe_event_emitter_1 {
    private port1: MessagePort;
    private proxyObj: any;
    private _state: { accounts: any; isConnected: boolean; isUnlocked: boolean; initialized: boolean; isPermanentlyDisconnected: boolean; };
    private origin:string
    constructor() {
        super()
        const channel = new MessageChannel();
        this.port1 = channel.port1;
        this._state = {
            accounts: null,
            isConnected: false,
            isUnlocked: false,
            initialized: false,
            isPermanentlyDisconnected: false,
        };
        this.proxyObj = {}
        this.port1.onmessage = this.listenerMessage.bind(this);
        this._rpcRequest = this._rpcRequest.bind(this)
        this.request = this.request.bind(this)
        this.origin = window.location.origin
        window && window?.postMessage(
            {origin:this.origin,uuid:uuidV4(),type: 'init-Provider'},
            this.origin,
            [channel.port2]
        )
    }

    listenerMessage (e:any) {
      const {uuid,origin,result=null,error=null,method=null,params = null} = e?.data
      if(method === method_1 && !result && !error) {
        setTimeout(()=>{
            this.port1.postMessage({ uuid, type: MSG_REQUEST, origin, method,params })
        },300)
        return
      }
      if(this.proxyObj[uuid] && this.origin === origin){
        if(result) this.proxyObj[uuid].result = result
        if(error) this.proxyObj[uuid].error = error
        if(result||error) delete this.proxyObj[e.data.uuid]
      }
    }

    async request(args: { method: any; params: any; }) {
        if (!args || typeof args !== 'object' || Array.isArray(args)) {
            return Promise.reject('args is method params Missing ')
        }
        const { method, params } = args;
        if (typeof method !== 'string' || method.length === 0) {
                return Promise.reject('args is method Missing ')   
        }
        if (params !== undefined &&
            !Array.isArray(params) &&
            (typeof params !== 'object' || params === null)) {
           return Promise.reject('args is params Missing ')   
        }

        return new Promise(async (resolve, reject) => {
            const uuid= uuidV4()
            this.port1.postMessage({ uuid, type: MSG_REQUEST, origin:this.origin, method,params })
            try{
                this.proxyObj[uuid] = new Proxy({},{
                    set(target, propKey,value,receiver) {
                        if(propKey === 'result') resolve(value)
                        if(propKey === 'error') reject(value)
                        return Reflect.set(target, propKey, value, receiver);
                    }
                })
            }catch(e){
                reject(e)
            }
        });
    }

    _initializeState(initialState: { accounts: any; chainId: any; isUnlocked: any; networkVersion: any; }) {
        if (this._state.initialized) {
            throw new Error('Provider already initialized.');
        }
        if (initialState) {
            const { accounts, chainId, isUnlocked, networkVersion } = initialState;  
        }
        this._state.initialized = true;
    }

   
    //@ts-ignore
    _rpcRequest(payload, callback) {}
}
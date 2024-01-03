import {rpc,sendUnsignedTransaction} from './../background/TRX'
import {METHODS,ETH_PREFIX,TestExtensionId,MSG_REQUEST} from './../extension-config'
import { v4 as uuidV4} from 'uuid'
// import process from 'process'
// console.log(process);
if( process.env.NODE_ENV !== 'development'){
    //@ts-ignore
    window.process = {env:{NODE_ENV:''}}
}
  
// const method_1 = ETH_PREFIX+METHODS.SENDTRANSACTION
// const p = 'f51ca759562e1daf9e5302d121f933a8152915d34fcbc27e542baf256b5e4b74'

export class Content {
    private _channel:any
    private origin:any
    constructor(){
            const self = this
            self._channel
            self.origin = window.location.origin
            window.addEventListener('message', this.initMessage.bind(self))  
    }

   initMessage (e:any) {
        const { type ,uuid,origin} = e?.data
        if(type && uuid && origin === this.origin){
            this._channel = e?.ports[0];
            this._channel.onmessage = this.listenerMessage.bind(this);
            if(process.env.NODE_ENV !== 'development'){
                this.contentInit.call(this)
                this.runtimeContentListener.call(this)
            }
        }
    }

    contentInit(){
        this.chromeSend({uuid:uuidV4(),type:'contentInit',origin:this.origin})
    }


    async listenerMessage (e:any) {// 
        const data = e?.data,
        { type ,uuid,origin}:any = data,
        local_origin = window.location.origin
        if(type && uuid && origin === local_origin)this.chromeSend({...data})
    }

   

    chromeSend(data:any){
        chrome?.runtime?.sendMessage(
            process.env.NODE_ENV == 'development' ?  TestExtensionId:'',
            {...data}
        ).catch((err:any)=>{
            console.log('err',err);
        })
    }

    runtimeContentListener(){
        const self = this
        chrome?.runtime?.onMessage?.addListener(( request:any , sender:any,cd:any):null => {
            self.handleListenerMessage(request)
            cd(true)
            return undefined
        })
    }

    handleListenerMessage(data:any){
        if(data.uuid && data.type == MSG_REQUEST && data?.origin == self.origin){
            this.sendMessage(data)
        }
    }


    sendMessage(o:any){
        this?._channel.postMessage(o)
    }


}

export const content = new Content()


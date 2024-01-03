import {SystemContractProvider} from './SystemContractProvider'

export class AbstractStreamProvider extends SystemContractProvider {
   
    constructor() {
        super();
    }
    async _initializeStateAsync() {
        let initialState;
        this._initializeState(initialState);
    }
}

class InsertProvider extends AbstractStreamProvider {
    clientUrl: string;
    network: string;
    constructor() {
        super()
        // this.clientUrl = 'https://rpc.bubbonet.com/'
        // this.network = 'https://rpc-test.bubbonet.com/'
        this._initializeStateAsync();
        this.send = this.send?.bind(this)
    }
  
    on(eventName: string | symbol, listener: (...args: any[]) => void) {// 
        return super.on(eventName, listener);
    }

   async send(args: { method: any; params: any; }) {
       return await this._request(args)
    }

    async _request(args: { method: any; params: any; }){
        // const data = [...args]
        return await this.request(args)
    }

}
export default InsertProvider
//@ts-nocheck
import BaseProvider from './BaseProvider'

export class AbstractStreamProvider extends BaseProvider {
   
    constructor(connectionStream, { jsonRpcStreamName, logger = console, maxEventListeners = 100, rpcMiddleware = [], }) {
        super({ logger, maxEventListeners, rpcMiddleware });
       
  
    }
    async _initializeStateAsync() {
        let initialState;
        try {
            console.log(this);
        }
        catch (error) {
           
        }
        this._initializeState(initialState);
    }

}

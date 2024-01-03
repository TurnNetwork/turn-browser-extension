import InsertProvider  from "./InsertProvider"

const setGlobalProvider = (providerInstance:any)=> {
    if(window || globalThis) {
        (globalThis as any).turnNetwork = providerInstance;
        window.dispatchEvent(new Event('Turn#initialized'));
    }
}

const  initializeProvider = ()=> {
    const provider = new InsertProvider();
    
    const proxyProvider = new Proxy(provider, {
        deleteProperty: () => true,
        get(target, propName) {
            //@ts-ignore
            return target[propName];
        }
    });
    setGlobalProvider(proxyProvider);
    return proxyProvider;
}


initializeProvider()

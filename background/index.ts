

if( process.env.NODE_ENV !== 'development'){
  //@ts-ignore
  globalThis.process = {env:{NODE_ENV:''}}
}
import {ethers} from 'ethers'
import {rpc,sendSystemContractOperation,
  sendUnsignedTransaction,sendSystemContractQuery,setClient
} from './../background/TRX'
import {METHODS,ETH_PREFIX,NOTIFICATION_HEIGHT,  NOTIFICATION_WIDTH, 
        TASKQUEUE,MSG_BUTSUBMIT, MSG_BUTCANCEL,MSG_REQUEST,
        WALLETNAME,ZEROWALLETJSON,NET_WORK,NET_WORK_N,PW
      } from './../extension-config'
const method_1 = ETH_PREFIX+METHODS.SENDTRANSACTION
const PAGRSHOW = 'PAGRSHOW'
let pageShow = false
let pKey = ''
class ServerWorks {
    private pKey:string
    private zeroWallet:any
    private activeWallet:any
    public netWork:any
    public zeroNetWork:any
    public activeNetWork:any
    constructor(){
        chrome.runtime.onMessage.addListener(this.handleData.bind(this))
        this.zeroNetWork = []
        this.init()
    }

   async init(){
        await  this.handZeroWallet()
        await  this.handWallet()
        await this.handInitNetWork()
        await this.handPW();
        await this.watchEvent()
        this.insert()
    }



    async handZeroWallet(){
        let wallet =  await globalThis.chrome.storage.local.get(ZEROWALLETJSON)
  
        if(Object.values(wallet).length){
          wallet = wallet[ZEROWALLETJSON]
        }else{
          const obj:any = ethers.Wallet.createRandom();
          wallet = {...obj,pw:obj.privateKey }
          obj[ZEROWALLETJSON] = wallet
          await globalThis.chrome.storage.local.set(obj)
        }
        this.zeroWallet = wallet
    }
    
    async handWallet(){
        let wallet =  await globalThis.chrome.storage.local.get(WALLETNAME)
        wallet = wallet && wallet[WALLETNAME] ||{}
        const list = Object.values(wallet)
        if(list.length){
          this.activeWallet = list.filter((v:any)=>v.active)[0]
        }
    }

    async handInitNetWork(){
      const network =  await globalThis.chrome.storage.local.get(NET_WORK_N)
      console.log(network);
      if(!network[NET_WORK_N]?.length){
        network[NET_WORK_N] = NET_WORK
        await globalThis.chrome.storage.local.set(network)
      }
      this.handNetWork()
    }
    
    async handNetWork(){
        let net =  await globalThis.chrome.storage.local.get(NET_WORK_N)
        net = net && net[NET_WORK_N] || []
        let list:any = []
        if(net.length){
           list = net
        }else{
          list= NET_WORK
        }
        this.netWork = list
        this.activeNetWork = list.filter((v:any)=>v.active)[0]
        setClient(this.activeNetWork)
    }

    async handPW(){
      let pw =  await globalThis.chrome.storage.local.get(PW)
      console.log('pw==>',pw)
      pw = pw && pw[PW] || ''
      this.pKey = pw
      pKey = pw
      console.log('handPW',this.pKey)
    }

    watchEvent(){
      chrome.storage.onChanged.addListener(function (changes:any, namespace:any) {
        if(namespace == 'local'){
          const [key]:any = Object.entries(changes)
          switch(key){
            case WALLETNAME:
              this.handWallet();break;
            case NET_WORK_N:
                this.handNetWork();break;
            case PW:
                this.handPW();break;
            default:break;
          }
        }
      });

      chrome.runtime.onSuspend.addListener(function() {
        console.log('close');
        this.setPw('')
      });
    }


    async setPw(d:string){
      await globalThis.chrome.storage.local.set({[PW]:d})
      this.pKey = d
    }

    getPw(){
      if(this.pKey) return true
      return false
    }


    handleData(request:any, sender:any , cd:any){
      const {type,uuid,origin} = request;
      switch(type){
        case 'contentInit':
          cd(true);break;
        case MSG_REQUEST:
          if(request.method &&  request.params){
            this.handleRequest(request, sender)
            cd(true) 
          };break;
        case MSG_BUTSUBMIT:
        case MSG_BUTCANCEL:
          if(request?.data?.uuid){
            cd(true) 
            this.handleButInfo(type,request?.data)
          } 
          ;break;
        case PW:
          if(!request.data)break;
          this.setPw(request.data)
          this.handleRequestPW()  
          ;break;
        default:
          console.log('default')
        cd(false);break;
      }
    }

    async handleRequestPW(){
      const queue =  await chrome.storage.local.get(TASKQUEUE) || {}
      let task = queue[TASKQUEUE]
      task.forEach((v:any) => {
        this.handleRequest(v,{tab:{id:v.tabId}})
      });
    }

    async handleQueue(data:any,tabId:any){
      const queue =  await chrome.storage.local.get(TASKQUEUE) || {}
      const list = [{...data,tabId}]
      queue[TASKQUEUE] = toString.call(queue[TASKQUEUE]) == '[object Undefined]' ? list :
      [...queue[TASKQUEUE],...list]
      chrome.storage.local.set(queue)
        this.createWindow()
    }

    async handleRequest(data:any,sender:any){
      const tabId = sender.tab.id
      let result:any
      if(!this.activeWallet){
        await  this.handWallet()
        if(!this.activeWallet){
          if(!pageShow){
            pageShow = true
            this.createIndexPage()
            setTimeout(async ()=>{
              pageShow = false
            },2000)
          }
          return
        }
      }
      if(!pKey){
        await this.handPW();
        if(!pKey){
          if(!pageShow){
            pageShow = true
            await chrome.storage.local.remove(TASKQUEUE)
            setTimeout(async ()=>{
              pageShow = false
            },2000)
            return this.handleQueue(data,tabId)
          }
        }
      }
      try{
          switch(data.method){
              case method_1:
                console.log('handleQueue',data);
                await this.handleQueue(data,tabId);return;
              case 'eth_accounts':
              case 'eth_requestAccounts':
                  result = [this.activeWallet.address];break;
              case 'eth_requestZeroAccounts':
                  result = [this.zeroWallet.address];break;
              case 'eth_addOrSelectZeroTimeNetwork':
                const rpcUrl = data.params[0]?.rpcUrls
                if(!rpcUrl) {result = '0x0';break;}
                result = await rpc('eth_chainId',[],rpcUrl);
                result = Number(result)
                this.addOrSelectZeroTimeNetwork({
                  result,rpcUrl
                })
                break;
              case 'eth_selectTurnNetwork':
                result = "eth_selectTurnNetwork"
                break;
              case METHODS.SYSTEMCONTRACT:
                  const {params}:any = data
                  const d = params.data
                  if(params.type == METHODS.CALL)  {
                    result = await this.getSystemContractInfo(d);
                    break;
                  }
                  const {pw,address} = await this.handleZeroParams(params)
                  result = await sendSystemContractOperation(d, {pw,address});
                  break;
                default:
                  result =  await rpc(data.method,data.params );break;

          }
          if(!result) result = !result
          this.sendMessage({...data,result},tabId)
      }catch(error){
          this.sendMessage({...data,error},tabId)
      }
    }
    
    async handleZeroParams(params:any){
      let pw:any = this.zeroWallet.pw
      let address = this.zeroWallet.address
      if(!params.isZeroSign){
        pw = await ethers.Wallet.fromEncryptedJson(this.activeWallet.json,this.pKey)
        pw = pw.privateKey
        address = this.activeWallet.address
      }
      return {pw,address}
    }

    async addOrSelectZeroTimeNetwork(params:any){
      this.activeNetWork = {
        name: `Zero Turn netWork ${this.zeroNetWork.length}`,
        symbol: 'TURN',
        chainId: params.result,
        netWorkUrl: params.rpcUrl,
        active:true
      }
      this.zeroNetWork = [
        ...this.zeroNetWork.map((v:any)=>{
            v.active = false
            return v
        }),
        this.activeNetWork
      ]
      setClient(this.activeNetWork)
    }
    
    async del(ud:string){
      const queue =  await chrome.storage.local.get(TASKQUEUE) || {}
      const newList =  queue[TASKQUEUE].filter((v:any)=>v.uuid !== ud)
      queue[TASKQUEUE] = newList
      chrome.storage.local.set(queue)
    } 

    async handleButInfo(type:string,data:any){
      const {tabId} = data
      this.del(data.uuid)
      if(type == MSG_BUTCANCEL){
        this.sendMessage({...data,error:''},tabId)
        return
      }
      try{
        let result
        if(type == MSG_BUTSUBMIT){
            if(data.method === method_1){
              const p:any = await ethers.Wallet.fromEncryptedJson(this.activeWallet.json,this.pKey)
              result = await sendUnsignedTransaction(data,p.privateKey)
            }
        }
        this.sendMessage({...data,result},tabId)
      }catch(error){
        this.sendMessage({...data,error:{handleButInfo:'handleButInfo',data:error}},tabId)
      }
    }

    async getSystemContractInfo  (params: any) {
        return await sendSystemContractQuery(params,{
          rpc:params.rpc,
          from: params.from? this.activeWallet.address:''
        })
    }

    sendMessage(data:any,tabId:any){
      chrome.tabs.sendMessage(tabId,data)
    }

    async createWindow(options:any={
        url: './notification.html',
        type: 'popup',
        focused:true,
        width: NOTIFICATION_WIDTH,
        height: NOTIFICATION_HEIGHT,
        left: 0,
        top:100,
    }) {
       await chrome.windows.create(options);
    }

    async createIndexPage(options:any={
      url: './create.html',
      type: 'popup',
      focused:true,
      width: NOTIFICATION_WIDTH+100,
      height: NOTIFICATION_HEIGHT+100,
      left: 0,
      top:100,
    }) {
      await chrome.windows.create(options);
    }

    insert(id?:number|string){
        try {
            chrome?.scripting?.registerContentScripts([
              { 
                id: 'turnInsertPage_'+id,
                matches: ['file://*/*', 'http://*/*', 'https://*/*'],
                js: ['./insert.js'],
                runAt: 'document_end',
                world: 'MAIN',
              },
            ]);
          } catch (err) {
            console.log(`turnInsertPage Error: ${err}`);
          }
    }
}


new ServerWorks()
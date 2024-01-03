
import React, { useEffect, useRef, useState } from 'react';
import {Button, Card} from 'antd'
//@ts-ignore
import {TASKQUEUE ,METHODS,ETH_PREFIX,TestExtensionId,MSG_BUTSUBMIT,MSG_BUTCANCEL} from 'root/extension-config'
import 'src/access/index.scss'
const method_1 = ETH_PREFIX+METHODS.SENDTRANSACTION
const INITFN = 'INIT'
const browser = globalThis.chrome
const runtime = browser.runtime

function ToBeConfirmed(props?:any) {
  const [queueTask,setQueueTask] = useState([])
  const timer:any = useRef()
  const [loading,setLoading] = useState(false)
  useEffect(()=>{
    runtime.onMessage.addListener(handleData)
      handleData(INITFN);
      (globalThis.addEventListener as any)("unload", function (event:any) {
        runtime.sendMessage( process.env.NODE_ENV === 'development' ?
          TestExtensionId:'', 'close')
      }, true);
      chrome.storage.onChanged.addListener(function (changes:any, namespace:any) {
        if(namespace == 'local'){
          const [key]:any = Object.entries(changes)
          switch(key){
            case TASKQUEUE:
              this.filterData();break;
            default:break;
          }
        }
      });  
  },[])

  const handleData = async (data?:any)=>{
     if(data === INITFN
      || data?.method === method_1 
      || data?.type === MSG_BUTCANCEL 
      || data?.type === MSG_BUTSUBMIT 
      || data?.method === (METHODS as any).SYSTEMCONTRACT){
      if(timer.current) clearTimeout(timer.current)
        timer.current = setTimeout(async ()=>{
          await filterData()
      },500)
     }
  }
  const filterData = async ()=>{
    const obj =  await browser.storage?.local?.get(TASKQUEUE) || {}
    if(obj[TASKQUEUE]?.length)setQueueTask(obj[TASKQUEUE].map((v:any)=>{
      return {...v,loading:false}
    }))
    if(!obj[TASKQUEUE]?.length ){
      if(props.type == 'notification'){
         globalThis.close()
      }
    } 
  }

  const cancel = (d:string)=>{
    sendMessage({type:MSG_BUTCANCEL ,data:d})
  }

  const submit = (d:string,index:number)=>{
    setQueueTask(queueTask.map((v:any,i:number)=>{
      if(index == i){
        return {...v,loading:true}
      }
      return {...v,loading:false}
    }))
    sendMessage({type:MSG_BUTSUBMIT,data:d})
    timerFn()
  }
  const timerFn = async ()=>{
    await filterData()
    setTimeout(()=>{
      timerFn()
    },1000)
  }

  const sendMessage = (data:any)=>{
    runtime.sendMessage( process.env.NODE_ENV === 'development' ?  TestExtensionId:'',data)
  }
  return (
    <div className="w-[100%] m-auto text-[50px] ">
      {queueTask?.length?
        queueTask.map((v,index)=>{
           return <Card className='m-[10px] w-[95%]' key={index}>
              <div className=' break-words'>From:{v?.params[0]?.from}</div>
              <div className=' break-words'>To:{v?.params[0]?.to}</div>
              <div className=' break-words'>Gas:{v?.params[0]?.gas}</div>
              <div className=' break-words'>
                <span>data:</span>
                <div className='border-1'>{v?.params[0]?.data}</div>
              </div>           
             <div className='pt-[20px]]'>
                <Button disabled={v.loading} onClick={cancel.bind(this,v,index)}>取消</Button>
                <Button disabled={v.loading} type='primary' className='ml-[20px]' onClick={submit.bind(this,v,index)}>确认</Button>
             </div>
           </Card>
        }):
        <Card className='mt-[30px] item-center'>
            <div className='text-center'>no Date</div>
        </Card>
      }
    </div>
  );
}



export default ToBeConfirmed
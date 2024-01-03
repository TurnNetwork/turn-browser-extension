import React, { useEffect, useRef, useState } from "react"
import {ArrowLeftOutlined} from '@ant-design/icons'
// import StepThree from './components/StepThree'
import StepTwo from './components/StepTwo'
import StepOne from './components/StepOne'
import StepThreePage from '../create/components/StepOne'
import { Button } from "antd"
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux'
import { setWallet } from '../../store/Slice/wallet'
import { setPW } from '../../store/Slice/pw'
import { ethers } from "ethers";
import {Md5} from 'src/utils/index'
import 'src/access/others.scss'


const Import = ()=>{
   const [stepNum,setStepNum] = useState(1)
   const stepOneRef:any = useRef<HTMLInputElement>(null)
   const stepTwoRef:any =useRef<HTMLInputElement>(null)
   const stepThreeRef:any =useRef<HTMLInputElement>(null)
   const [submitData,setSubmitData]:any = useState({})
   const pwStore: any = useSelector((state: any) => { return state?.pwSlice.value})
   const navigate = useNavigate();
   const dispatch = useDispatch()
   const walletStore: any = useSelector((state: any) => state?.walletSlice.value)

   const back = ()=>{
      if(stepNum === 1){
         navigate(-1)
      }else{
         setStepNum(stepNum-1)
      }
   }


   const submit = async (data:any)=>{
      const obj ={
         ...submitData,
         ...data
      }
      setSubmitData(obj)
      if(stepNum== 3 || stepNum == 2 && walletStore){
         let walletObj = JSON.parse(JSON.stringify(walletStore)) || {}
        try {
            let wallet 
            if (submitData?.type !== 'privateKey') {
               wallet = ethers.Wallet?.fromPhrase(obj.mnemonic);
           } else {
               wallet = new ethers.Wallet(obj.mnemonic);
           }
            const  list:any = Object.values(walletStore)
            const md5Str = list.length ? pwStore : Md5(String(obj.password));
            const json = await wallet.encrypt(md5Str);
    
            walletObj && [...Object.keys(walletObj)].forEach((v:any)=>{
               walletObj[v].active = false
            })
            
            walletObj[wallet.address] = {
               name: walletObj[wallet.address]?.name ||
                'Account-'+ (Object.keys(walletObj).length +1),
               address: wallet.address,
               active: true,
               json
            }

            dispatch(setWallet(walletObj))
            dispatch(setPW(md5Str))
            //@ts-ignore
            if(globalThis?.pageType){
               globalThis.close()
               return
            }
            navigate('/')
            return
         }catch(e){
            console.log(e);
            return
        }
      }
      setStepNum(stepNum+1)
   }

   const next  = ()=>{
      stepThreeRef?.current.submit();
   }

   return <div className="px-[30px] ">
      <header className="h-[80px] flex items-center justify-between ">
         <ArrowLeftOutlined onClick={back}/>
         <div>
            {stepNum} - 3
         </div>
      </header>
      {
         stepNum === 1?<StepOne submit={submit} ref={stepOneRef}/>:
         stepNum === 2? <StepTwo type={submitData?.type || ''}  submit={submit}  ref={stepTwoRef}/>:
         stepNum === 3?walletStore? 
         <div className="flex justify-center items-center">success</div>
         : <StepThreePage submit={submit}  ref={stepThreeRef}/>:
         ''
         }
         {
            stepNum === 3 ?
            <Button className="w-full mt-[30px] mb-[30px]" type="primary" size="large" shape="round" onClick={
               !walletStore?next:
               submit.bind(this,{})}>next</Button>
         : ''
      }
       <style>
         {
            `
              .form-label-null-after .ant-form-item-no-colon::after{
                  display:none
              }
            
            `
         }
       </style>
      </div>
}


export default Import
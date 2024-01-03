import React, { useRef, useState ,useEffect} from "react"
import {ArrowLeftOutlined} from '@ant-design/icons'
import StepThree from './components/StepThree'
import StepTwo from './components/StepTwo'
import StepOne from './components/StepOne'
import { Button } from "antd"
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux'
import { setWallet } from '../../store/Slice/wallet'
import { setPW } from '../../store/Slice/pw'
import { ethers } from "ethers";
import {Md5} from 'src/utils/index'

const Create = ()=>{
   const [stepNum,setStepNum] = useState(1)
   const stepOneRef:any = useRef<HTMLInputElement>(null)
   const stepTwoRef:any =useRef<HTMLInputElement>(null)
   const stepThreeRef:any =useRef<HTMLInputElement>(null)
   const [submitData,setSubmitData] = useState({})
   const navigate = useNavigate();
   const dispatch = useDispatch()
   const walletStore: any = useSelector((state: any) => state?.walletSlice.value)
   const pwStore: any = useSelector((state: any) => { return state?.pwSlice.value})
   const back = ()=>{
      if(stepNum === 1 || walletStore && stepNum === 2){
         navigate(-1)
      }else{
         setStepNum(stepNum-1)
      }
   }
   
   useEffect(()=>{
      if(walletStore){
         setStepNum(2)
      }
   },[])

   const submit = async (data:any)=>{
      const obj ={
         ...submitData,
         ...data
      }
      setSubmitData(obj)
      if(stepNum === 3){
         // console.log(obj);
         let walletObj = JSON.parse(JSON.stringify(walletStore)) || {}
         const wallet = ethers.Wallet?.fromPhrase(obj.mnemonic);
         const  list:any = Object.values(walletStore)
         const md5Str = list.length ? pwStore : Md5(String(obj.password));
         const json = await wallet.encrypt(md5Str)

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
         navigate('/home')
         return
      }
      setStepNum(stepNum+1)
   }

   const next  = ()=>{
      switch(stepNum){
         case 1:stepOneRef?.current.submit();break;
         case 2:stepTwoRef?.current.submit();break;
         case 3:stepThreeRef?.current.submit();break;
         default:console.log('default');break;
      }
   }

   return <div className="px-[30px] pb-[10%]">
      <header className="h-[80px] flex items-center justify-between ">
         <ArrowLeftOutlined onClick={back}/>
         <div>
            {stepNum} - 3
         </div>
      </header>
       <div>
            {
               stepNum === 1? walletStore ?'next':<StepOne   submit={submit} ref={stepOneRef}/>:
               stepNum === 2? <StepTwo  submit={submit}  ref={stepTwoRef}/>:
               stepNum === 3? <StepThree data={submitData}  submit={submit}  ref={stepThreeRef}/>:
               ''
            }

            <Button className="w-full mt-[30px]" type="primary" size="large" shape="round" onClick={next}>Next</Button>
       </div>
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


export default Create
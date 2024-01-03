import React from "react"
import {Radio} from 'antd'
import {formatAddress} from 'src/utils'
import { useSelector,useDispatch } from 'react-redux'
import {setWallet} from 'src/main/store/Slice/wallet'
import { UserOutlined} from '@ant-design/icons'



const WalletComponent = (props?:any):any=>{
    const walletStore: any = useSelector((state: any) => state?.walletSlice.value)
    const dispatch = useDispatch()
    const walletChange = (address:string)=>{
    let obj =  JSON.parse(JSON.stringify(walletStore))
    let newObj:any = {}
       Object.keys(obj).forEach((v:any)=>{
          newObj[v] = obj[v]
          newObj[v].active = address == v ?true: false
       }) 
      dispatch(setWallet(newObj))
      props.query()
    }
 
   return <div>
       
        {
          Object.values(walletStore).map((v:any,index:number)=>{
             return  <div className="_card" key={index}
              onClick={walletChange.bind(this,v?.address)}>
                <div className="flex items-center">
                   <UserOutlined className="text-[20px]"/>
                   <div className="ml-[20px]">
                      <p className="text-[16px]"> {v.name}</p>
                      <p className="text-[14px]"> {formatAddress(v?.address)}</p>
                   </div>
                </div>
                <Radio checked={v.active}></Radio>
             </div>
          })
        }
    </div>
 }
 

 export default WalletComponent
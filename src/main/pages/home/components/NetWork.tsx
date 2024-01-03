
import React from "react"
import {Radio} from 'antd'

import { useSelector,useDispatch } from 'react-redux'
import {setNetwork} from 'src/main/store/Slice/network'



const NetWorkComponent = (props?:any):any=>{
    const networkSlice: any = useSelector((state: any) => state?.networkSlice.value)
    const dispatch = useDispatch()
    const networkChange = (num:number)=>{
       let list =  JSON.parse(JSON.stringify(networkSlice))
       list = [...list].map((v:any)=>{
          v.active = false
          return v
       }) 
       list[num].active = true
       dispatch(setNetwork(list))
       props.query()
    }
 
   return <div>
        {
          networkSlice.map((v:any,index:number)=>{
             return  <div className="_card" key={index}
              onClick={networkChange.bind(this,index)}>
                <span className="text-[20px]"> {v.name}</span>
                <Radio checked={v.active}></Radio>
             </div>
          })
        }
    </div>
 }

 export default NetWorkComponent
 
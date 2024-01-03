import React, { useState } from "react"
import {Input,Divider, message} from 'antd'
import {SearchOutlined,DeleteOutlined,CloseOutlined} from '@ant-design/icons'
import { useSelector,useDispatch } from 'react-redux'
import {setSearch} from 'src/main/store/Slice/search'

const Dapp = ()=>{
   const [value,setValue] = useState('')
   const searchStore: any = useSelector((state: any) => state?.searchSlice.value)
   const dispatch = useDispatch()
   const search = ()=>{
      let str = String(value)
      if(!value)return  message.error('please enter value')
      try{
         new URL(str)
      }catch(e){
         str = `https://${str}`
      }
      dispatch(setSearch([...searchStore.filter((v:string)=> v !== str),String(str)]))
      global.open(str)
   }

   const remove = ()=>{
       dispatch(setSearch([]))
   }
   const del = (index:number)=>{
         const list =   [...searchStore]?.reverse()
         list.splice(index,1)
         dispatch(setSearch(list.reverse()))
   }


   return <div className="p-20px">
      <div className="text-[30px] mb-[50px]">Dapp</div>
      <Input size="large" allowClear value={value} onChange={(e)=>setValue(e.target.value)}  className="w-full" 
       suffix={<SearchOutlined onClick={search} />}
      />
      <Divider />
      <div className="h-[full]">
         <div className="flex items-center justify-between text-[18px] mb-[20px] text-[#666]">
            <span>History</span>
            <DeleteOutlined onClick={remove} className="cursor-pointer"/>
         </div>
         <div className="pl-[5px] pr-[2px]">
            {
               [...searchStore]?.reverse().map((v:string,index:number)=>{
                  return  <div key={index} className="flex cursor-pointer items-center justify-between text-[#999] mb-[13px]">
                     <div className="flex-1 overflow-ellipsis " onClick={()=>setValue(v)}>{v}</div>
                     <CloseOutlined className="ml-[10px] cursor-pointer" onClick={()=>del(index)}/>
                  </div>
               })
            }
         </div>
      </div>
   </div>
}


export default Dapp
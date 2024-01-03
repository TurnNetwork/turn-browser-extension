import React,{useState} from "react"
import {Radio} from 'antd'

const TableComponent = (props?:any):any=>{
   const data = props?.data[props?.activeGame] || ''
   const [list] = useState(Object.values(data?.data || {}))
   
    const tableChange = (v:any)=>{
       console.log(v);
    }
 
   return <div>
        {
           list.map((v:any,index:number)=>{
             return  <div className="_card" key={index}
              onClick={tableChange.bind(this,v)}>
                <span className="text-[20px]">Table ID：{v.roundId}</span>
                {/* <Radio checked={tableObj[v].active}></Radio> */}
             </div>
          })
        }
    </div>
 }
 

 export default TableComponent
import React, { useEffect, useState } from "react"
import {Radio} from 'antd'
import {formatAddress} from 'src/utils'

const GameContractComponent = (props?:any):any=>{
      const [list] = useState(Object.values(props.data || {}))
      const gameContractChange = (v:any)=> props.change(v)
      return <div>
         {
            list.map((v:any)=>{
               return  <div className="_card" key={v.time}
               onClick={gameContractChange.bind(this,v.address)}>
                  <span className="text-[20px]"> {formatAddress(v.address)}</span>
                  <Radio checked={v.active}></Radio>
               </div>
            })
         }
      </div>
 }
 

 export default GameContractComponent
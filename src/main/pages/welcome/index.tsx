import { Button } from "antd"
import React from "react"
import welcomeImage  from 'src/access/welcome.png'
import {Link} from 'react-router-dom'

const Welcome = ()=>{
   return <div className="w-full h-full min-h-[600px] flex flex-col justify-between items-center">
      <div className=" pt-[25%] pb-[5%]  flex justify-center">
         <img className="w-[80%]"  src={welcomeImage} alt={'alt'}/>
      </div>
      <div>
         <p className="text-[30px] font-bold mb-[20px]">Welcome To Turn</p>
         <p className="mb-[10px]">Guiding your Turn Network journey.</p>
      </div>
       <div className="w-full pb-[30px] px-[30px]" style={{'boxSizing': 'border-box'}}>
         <Link to={'/create'}>
            <Button className="w-full mb-[20px]" type="primary" size="large" shape="round">Create New Wallet</Button>
         </Link>
         <Link to={'/import'}>
            <Button className="w-full" ghost type="primary"  size="large"shape="round">Import Wallet</Button>
         </Link>
       </div>
   </div>
}


export default Welcome
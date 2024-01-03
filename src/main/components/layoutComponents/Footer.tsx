import React from "react"
import { useNavigate,useLocation } from "react-router-dom";
import {HomeOutlined,GoldOutlined,  GlobalOutlined} from '@ant-design/icons'
import {Divider} from 'antd'

const Footer = ()=>{
    const navigate = useNavigate();
    const locationInfo = useLocation()

   return  <footer className="flex w-full h-[60px] items-center justify-around text-[30px] bg-[#f9f9f9]">
        <div className={`flex-1 text-center  cursor-pointer footer_menu_item ${locationInfo.pathname == '/home' ? '_menu_item-active':''}`} onClick={()=>navigate('/home')}><HomeOutlined /></div>
         <Divider type="vertical" />
        <div className={`flex-1 text-center  cursor-pointer footer_menu_item ${locationInfo.pathname == '/dapp' ? '_menu_item-active':''}`} onClick={()=>navigate('/dapp')}><GoldOutlined /></div>
         <Divider type="vertical" />
        <div className={`flex-1  text-center cursor-pointer footer_menu_item ${locationInfo.pathname == '/activity' ? '_menu_item-active':''}`} onClick={()=>navigate('/activity')}><GlobalOutlined /></div>
   </footer>
  
}


export default Footer
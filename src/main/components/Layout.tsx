import React from "react"
import { Navigate,useLocation } from "react-router-dom";
import {Outlet } from "react-router-dom";
import { useSelector } from 'react-redux'
import Footer from './layoutComponents/Footer' 
import './../../access/others.scss'

const Layout = ()=>{
  const walletStore: any = useSelector((state: any) => state?.walletSlice.value)
  const pwStore: any = useSelector((state: any) => { return state?.pwSlice.value})
  const route = useLocation()
   return <div className="h-full w-full flex flex-col">
        {!walletStore ? 
          <Navigate to="/welcome"/> 
          :
          ['/activity','/dapp'].includes(route.pathname) ? ''
          :
          !pwStore?<Navigate to="/unlock"/>
          :
          <Navigate to="/home"/>
        }
            <div className="flex-1 overflow-y-auto">
              <Outlet />
            </div>
        <Footer />
   </div>
}


export default Layout
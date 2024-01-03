
import React, { useEffect } from 'react';
import '../access/index.scss'
import { useRoutes } from "react-router-dom";
import { ConfigProvider } from 'antd';
import {routes} from './route/index'
import LayoutSkeleton from './components/LayoutSkeleton'
import { getExtensionStorage } from 'src/utils/index'
import { useDispatch } from 'react-redux'
import { setWallet } from './store/Slice/wallet'
import { setNetwork } from './store/Slice/network'
import {WALLETNAME,NET_WORK_N,NET_WORK} from './../../extension-config'
import { thunkPw } from "./store/Slice/pw";
function App() {
  const element = useRoutes(routes)
  const dispatch = useDispatch()
  useEffect(()=>{
    queryChromeWallet()
    queryNetwork()
    dispatch(thunkPw())
  },[])

  const queryChromeWallet = async () =>{
    const walletObj =  await getExtensionStorage(WALLETNAME)
    dispatch(setWallet(walletObj))
  }
  const queryNetwork = async () =>{
    const network =  await getExtensionStorage(NET_WORK_N)
    dispatch(setNetwork(network || NET_WORK))
  }

  return  (
    <ConfigProvider
      theme={{}}
    >
      <React.Suspense fallback={<LayoutSkeleton />}>
          {element}
      </React.Suspense>
    </ConfigProvider>
  );
}

export default App;


import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import ToBeConfirmed from 'src/main/pages/toBeConfirmed';
import Unlock from 'src/main/pages/Unlock';
import { thunkPw } from "../main/store/Slice/pw";
import {useDispatch } from 'react-redux'
// import { useRoutes } from "react-router-dom";

const Page = ()=>{
  const pwStore: any = useSelector((state: any) => { return state?.pwSlice.value})
  const [show,setShow] = useState(false)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(thunkPw())
  },[])

  useEffect(()=>{
    if(!pwStore){
      setShow(true)
    }else{
      setShow(false)
    }
  },[pwStore])
  return <>
  {
    show ?<Unlock type="notification" /> : <ToBeConfirmed type="notification"/>
  }
  </>
}



function  App() {
  // const element = useRoutes([
  //   {
  //     path: "/",
  //     element: <Page />
  //   }
  // ])
  return <Page />
//   return  <React.Suspense >
//     {element}
// </React.Suspense>
}

export default App;

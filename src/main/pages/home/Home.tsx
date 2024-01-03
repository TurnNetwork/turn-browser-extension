import React, { useEffect, useRef, useState } from "react"
import Logo from 'src/access/Logo.png'
import {Divider,Button,Drawer,Radio,Modal, message} from 'antd'
import {copy,formatAddress,processNum} from 'src/utils'
import { useSelector,useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
// import Web3 from 'web3'
import {historyGameList} from 'src/api'
import {
   CloseOutlined,
   CopyOutlined,SettingOutlined,
   UserOutlined
} from '@ant-design/icons'
import * as test_InsertInterface from 'src/access/test/test'
import NetWorkComponent from './components/NetWork'
import WalletComponent from './components/Wallet'
import TableComponent from './components/Table'
import GameContractComponent from './components/GameContract'
import { rpc } from "../../../../background/TRX"

const Home = ()=>{
   const networkStore: any = useSelector((state: any) => {
      return state?.networkSlice.value && state?.networkSlice.value.filter((v:any)=>v.active)[0]
   })
   const walletActive: any = useSelector((state: any) => {
     return Object.values(state?.walletSlice?.value || {}).filter((v:any)=>v.active)[0]
   })
   const [drawerShow,setDrawerShow] = useState(false)
   const [drawerContent,setDrawerContent]:any = useState({
      title:'', content:''
   })
   const [gameContractObj,setGameContractObj]:any = useState()
   const [activeTable,setActiveTable]:any = useState()
   const [activeGame,setActiveGame]:any = useState()
   const [activeBubble,setActiveBubble]:any = useState()
   const timerRef:any = useRef(0)
   const activeBTG:any = useRef({
      activeTable:'',
      activeGame:'',
      activeBubble:'',
   })
   const navigate = useNavigate()
   const [balance,setBalance]:any = useState(0)
 

   useEffect(()=>{
     if(networkStore){
      clearTimeout(timerRef.current)
      setActiveTable()
      setActiveGame()
      setActiveBubble()
      setGameContractObj()
      queryBalance()
      query()
     }
     return ()=>{
      clearTimeout(timerRef.current)
     }
   },[networkStore,walletActive])

   const queryBalance = async ()=>{
      if(!walletActive.address || !networkStore.netWorkUrl)return
      clearTimeout(timerRef.current)
      try{
         const balance:string = await rpc(
            'eth_getBalance',
            [walletActive.address, "latest"],
            networkStore.netWorkUrl
         )
         setBalance(processNum(BigInt(balance).toString(),'18'))
      }catch(e){
         console.log(e);
      }
      timerRef.current = setTimeout( ()=>{
         queryBalance()
         query()
      },10000)
   }

   const query = async ()=>{
      if(!walletActive?.address)return message.warning('please, you select wallet address  select')
      try{
      
         const data = await historyGameList({address: walletActive?.address?.toLowerCase(),roundId:""})
         if(data.code == 0){
            const gameContractObj:any = {}
            let firstGameContract = ''
            let firstRoundId = ''
            let firstBubbleId = ''
            let flag = true
            data.data.forEach((v:any,index:number)=>{
               if(!gameContractObj[v.gameContractAddress]){
                  gameContractObj[v.gameContractAddress] = {
                     active:false,
                     data:{},
                     time:`${Date.now()}_${index}`
                  }
               }
               if(activeBTG.current.activeGame == v.gameContractAddress){
                  flag = false
               }

               if(index == 0){//
                  firstGameContract = v.gameContractAddress
                  firstRoundId = v.roundId
                  firstBubbleId =  v.bubbleId
               }
               gameContractObj[v.gameContractAddress]['data'][v.roundId] = v
               gameContractObj[v.gameContractAddress].active = false
               gameContractObj[v.gameContractAddress].bubbleId = v.bubbleId
               gameContractObj[v.gameContractAddress].address = v.gameContractAddress
            })
            data.data && gameContractObj[firstGameContract] &&(gameContractObj[firstGameContract].active = true)
            if(flag){
               activeBTG.current ={
                  activeTable: firstRoundId,
                  activeGame: firstGameContract,
                  activeBubble: firstBubbleId,
               }
            
            }else{
               activeBTG.current ={
                  activeTable: activeBTG.current.activeTable || firstRoundId,
                  activeGame: activeBTG.current.activeGame || firstGameContract,
                  activeBubble: activeBTG.current.activeBubble || firstBubbleId,
               }
            }
            setGameContractObj(gameContractObj)
            setActiveGame( activeBTG.current.activeGame)
            setActiveTable( activeBTG.current.activeTable)
            setActiveBubble( activeBTG.current.activeBubble)
         }
      }catch(e){
         console.log(e)
      }
   }


   const onClose = ()=>{
      setDrawerShow(false)
   }

   const netWorkClick = ()=>{
      setDrawerContent({
         title: 'Turn Network',
         content: <NetWorkComponent query={query} />
      })
      setDrawerShow(true)
   }

   const addAccount = ()=>{
      const instance =  Modal.info({
         title:'Add New Account',
         icon:null,
         maskClosable:true,
         okType: 'link',
         okText:"Cancel",
         content:  <div className="w-full pt-[30px]">
               <Button className="w-full mb-[20px]" type="primary" 
               onClick={()=>{
                  navigate('/create')
                  resetDrawer()
                  instance.destroy();
               }}
               size="large" shape="round">Create New Wallet</Button>
               <Button className="w-full" ghost type="primary"  
               onClick={()=>{
                  navigate('/import')
                  resetDrawer()
                  instance.destroy();
               }}
               size="large"shape="round">Import Wallet</Button>
       </div>
      })
   }

   const resetDrawer = ()=>{
      setDrawerContent({
         title: 'Select',
         content: '',
         headerBtn: ''
      })
      setDrawerShow(false)
   }

   const walletClick = ()=>{
      setDrawerContent({
         title: 'Select Account',
         content: <WalletComponent  query={query}/>,
         headerBtn: <Button type="primary" onClick={addAccount}>Add New Account</Button>
      })
      setDrawerShow(true)
   }

   const gameContractClick = ()=>{
      setDrawerContent({
         title: `Game Content`,
         content: <GameContractComponent data={gameContractObj}
          change={contractChange}
         />
      })
      setDrawerShow(true)
   }

   const contractChange = (v:string)=>{
      const obj = JSON.parse(JSON.stringify(gameContractObj))
      Object.keys(obj).forEach((v:any,index)=>{
         obj[v].active = false
         obj[v].time = `${Date.now()}_${index}`
      })
      obj[v].active = true
      setGameContractObj(obj)
      setActiveGame(v)
      setActiveBubble(obj[v]?.bubbleId)
      setActiveTable(Object.keys(obj[v]?.data)[0])
      activeBTG.current ={
         activeTable:Object.keys(obj[v]?.data)[0],
         activeGame:v,
         activeBubble: obj[v]?.bubbleId,
      }
      setDrawerContent({
         title: `Game Content`,
         content: <GameContractComponent data={obj}
          change={contractChange}
         />
      })
   }

   const tableClick = ()=>{
      setDrawerContent({
         title: 'Game Info',
         content: <TableComponent data={gameContractObj} activeGame={activeGame}/>
      })
      setDrawerShow(true)
   }

   return <div className="px-[5%] pt-[5%]" id="page-home">
          <img src={Logo} className="w-[30px]" alt="Logo" />

          <div className="flex items-center pt-[20px] justify-between">
             <div className=" mr-[20px]">
                <div className="text-[#7F7F7F] text-[14px] mb-[5px]">Network ：</div>
                <Button className="px-[0px]" type="link" onClick={netWorkClick}>
                  {networkStore?.name || ''}
               </Button>
             </div>
          
               <div>
                     {  !!activeBubble ? <>
                        <div className="text-[#7F7F7F] text-[14px] mb-[5px]">Bubble ID ：</div>
                           {activeBubble}
                           <CopyOutlined className="ml-[10px]  cursor-pointer"
                           onClick={copy.bind(this,activeBubble)}/>
                        </>
                     : ''}
               </div>
               <SettingOutlined  className="text-[20px]"/>
          </div>
          <Divider />

          <div className="flex items-center  justify-between">
             <div className="mr-[20px]">
                <div>
                  <div className=" text-[14px] mb-[5px]">{walletActive?.name || 'Account'}</div>
                  <Button className="px-[0px]" type="link" onClick={walletClick}>
                     {formatAddress(walletActive?.address)}
                  </Button>
                  <CopyOutlined className="ml-[10px]  cursor-pointer"
                   onClick={copy.bind(this,walletActive?.address)}/>
                </div>
                <div>{balance}</div>
             </div>
             <UserOutlined  className="text-[30px]"/>
          </div>
          <Divider />

          <div className="flex items-center ">
            {gameContractObj?
             <>
                <div className="text-[#7F7F7F] text-[14px] mb-[5px]">Game Contract: </div>
                  <Button className="px-[0px]" type="link" onClick={gameContractClick.bind(this)}>
                     { formatAddress(activeGame)}
                  </Button> 
                <CopyOutlined className="ml-[10px]  cursor-pointer" onClick={copy.bind(this,activeGame)}/>
             </>:''}
          </div>
          <div className="flex items-center mt-[10px]">
            {
               activeTable ? <>
                <div className="text-[#7F7F7F] text-[14px] mb-[5px]">Table ID ：</div>
                <Button className="px-[0px]" type="link" onClick={tableClick}>{activeTable}</Button> 
                <CopyOutlined className="ml-[10px]  cursor-pointer" onClick={copy.bind(this,activeTable)}/>
             </>:''}
          </div>
          <Divider />
          {
             process.env.NODE_ENV == 'development'?<>
               <div className="mb-[20px]">
                  <Button  onClick={test_InsertInterface.test_send}>send</Button> 
               </div>
               <div className="mb-[20px]">
                  <Button className="mr-[10px]"  onClick={test_InsertInterface.test_requestAccounts}>requestAccounts</Button> 
               </div>
               <div>
                  <Button className="mr-[10px]"  onClick={test_InsertInterface.test_linkSecondaryClientNetwork}>linkSecondaryClientNetwork</Button> 
                  <Button className="mr-[10px]"  onClick={test_InsertInterface.test_sendBindTempKey}>BindTempKey</Button> 
                  <Button className="mr-[10px]"  onClick={test_InsertInterface.test_sendBehalfSignature}>BehalfSignature</Button> 
                  <Button className="mr-[10px]"  onClick={test_InsertInterface.test_sendInvalidateTempPrivateKey}>InvalidateTempPrivateKey</Button> 
                  <Button className="mr-[10px]"  onClick={test_InsertInterface.test_sendAddLineOfCredit}>AddLineOfCredit</Button> 
                  <Button className="mr-[10px]"  onClick={test_InsertInterface.test_sendGetLineOfCredit}>GetLineOfCredit</Button> 
               </div>
             </>:""
          }
      <Drawer
            title={drawerContent.title || ''}
            placement={'bottom'}
            maskClosable={false}
            onClose={onClose}
            
            destroyOnClose={true}
            open={drawerShow}
            className="_drawer"
            getContainer={()=>document.getElementById('page-home')}
            extra={<>
                  {drawerContent?.headerBtn || ''}
                  <Button type="link" 
                  onClick={onClose}><CloseOutlined  className="text-[20px]"/></Button>           
                </>
            }
            >
               <div key={activeGame || activeTable || ''}>
                  { drawerContent?.content || '' }
               </div>
      </Drawer>
   </div>
}


export default Home
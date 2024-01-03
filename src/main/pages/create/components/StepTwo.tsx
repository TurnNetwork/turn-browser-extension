import React,{forwardRef, useEffect, useImperativeHandle,useState,} from "react"
import { ethers } from "ethers";
import {Button, message} from 'antd'
import * as copyTool from 'copy-to-clipboard'

const StepTwo = forwardRef((props: any, ref: any)=>{
    const [mnemonicList,setMnemonicList] = useState([])
    useImperativeHandle(ref, () => {
        return {submit}
    })
   useEffect(()=>{
        const wallet = ethers.Wallet.createRandom();
        let mnemonic:any = wallet.mnemonic;
        mnemonic = String(mnemonic?.phrase).split(' ')
        let newList: any[] = [[], [], [], []]
        mnemonic.forEach((v: string, i: number) => {
            newList[Math.ceil((i + 1) / 3) - 1].push(v)
        })
        setMnemonicList(newList)
   },[])


    const listToString = (): string =>mnemonicList.toString().replace(/\,/g, ' ')

    const copy = ()=>{
        copyTool(listToString());
        setTimeout(() => {
            message.success('copy success')
        }, 500);
    }

    const submit = ()=> props.submit({mnemonic:listToString()})


   return <>
        <div className="mb-[30%]">
            <p className="text-[30px] mb-[10px]">Mnemonic</p>
            <p>This 12 mnemonics allows you to recover your wallet and access to the coins inside.</p>
        </div>
        {/*  */}
        <table className="m-auto" style={{borderSpacing:0,borderCollapse:'collapse'}}>
            <tbody >
                {mnemonicList.map((item,index:number)=>{
                        return  <tr key={index}>
                                {
                                    item.map((v:any,i:number)=>{
                                        return <td  key={index+'+'+i} className="p-[5px]" style={{  "border": "1px solid #000"}}>
                                                <span className="inline-block w-[20px] mr-[5px]">{ (index * 3 + i) + 1 }. </span>
                                                <span className="text-[13px]">{ v } </span>
                                        </td>
                                    })
                                }
                            </tr>
                    })  
                }
            </tbody>
        </table>
        <Button className="w-full mt-[50px]" ghost type="primary"  size="large"shape="round" onClick={copy}>Copy</Button>
   </>
})


export default StepTwo
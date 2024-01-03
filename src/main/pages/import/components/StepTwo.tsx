import React,{forwardRef,  useImperativeHandle,useState,} from "react"
import { ethers } from "ethers";
import {Button, Input, } from 'antd'

const StepTwo = forwardRef((props: any, ref: any)=>{
    const [mnemonic,setMnemonic]:any = useState({})
    const [privateKey,setPrivateKey]:any = useState('')
    const [err,setErr] = useState('')
    useImperativeHandle(ref, () => {
        return {submit}
    })

    const submit = ()=> {
        // debugger
        const list = Object.values(mnemonic).filter(v=>v)
        if(list.length !== 12 && props.type !== 'privateKey') return setErr('Mnemonic errors')
        if(props.type == 'privateKey' && !privateKey) return setErr('Mnemonic errors')
        const str = props.type == 'privateKey'? privateKey.trim() : list.join(' ')
        try{
            props.type == 'privateKey' ?
            new ethers.Wallet(str)
            :
            ethers.Wallet?.fromPhrase(str);
            props.submit({mnemonic: str})
        }catch(e){
            console.log(e);
            setErr('钱包生成失败')
        }
    }
    
    const inputChange = (v:any,e:any)=>{
        setErr('')
        const obj = {...mnemonic}
        obj[v] = e.target?.value || ''
        setMnemonic(obj)
    }

    const inputBlur = (v:any,e:any)=>{
        const list = e?.target?.value?.split(' ')
        const obj:any = {...mnemonic}
        if(list.length === 12){
            list.forEach((e:string,index:number) => {
                obj[index+1] = e
            });
            setMnemonic(obj)
            return
        }
        obj[v] = e.target?.value.replace(/[\u4E00-\u9FA5]|\s+/g, '')
        setMnemonic(obj)
    }

   return <>
        {
            props.type == 'privateKey' ? <>
                   <div className="mb-[30%]">
                <p className="text-[30px] mb-[10px]">Private key import</p>
                <p>Please enter your plaintext private key correctly.</p>
            </div>
            <div className="m-auto w-full flex items-center justify-center">
                <Input.TextArea rows={4} onChange={(e)=>setPrivateKey(e.target.value)}></Input.TextArea>
            </div>
            </> :
            <>
            <div className="mb-[30%]">
                <p className="text-[30px] mb-[10px]">Mnemonic</p>
                <p>This 12 mnemonics allows you to recover your wallet and access to the coins inside.</p>
            </div>
            <table className="m-auto w-full" style={{borderSpacing:0,borderCollapse:'collapse'}}>
                <tbody >
                    {[[1,2,3], [4,5,6], [7,8,9], [10,11,12]].map((item,index:number)=>{
                            return  <tr key={index}>
                                    {
                                        item.map((v:any,i:number)=>{
                                            return <td  key={index+'+'+i} className="py-[5px] px-[3px]" >
                                                <div className="flex items-center">
                                                    <span className="inline-block text-[13px] flex-[20px] text-right">{ (index * 3 + i) + 1 }.</span>
                                                        <Input className="px-[4px]" placeholder="*please enter"
                                                        value={mnemonic[v]}
                                                        allowClear
                                                        maxLength={150}
                                                        onBlur={inputBlur.bind(this,v)}
                                                        onChange={inputChange.bind(this,v)}
                                                        />
                                                </div>
                                            </td>
                                        })
                                    }
                                </tr>
                        })  
                    }
                </tbody>
            </table>
        </>
        }
        {
            err ?
            <div className="text-[14px] text-[#f76c6c] pl-[20px] pt-[10px]">
                *  {err}
            </div>:''
        }
      
        <Button className="w-full mt-[50px] mb-[30px]"  type="primary" onClick={submit} size="large"shape="round" >next</Button>
   </>
})


export default StepTwo
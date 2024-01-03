import React,{forwardRef, useEffect, useImperativeHandle, useState,} from "react"
import {Form, Select} from 'antd'

const StepThree = forwardRef((props: any, ref: any)=>{
    const [randomMnemonic,setRandomMnemonic] = useState([])
    const [noSortMnemonicList ,setSortMnemonicList] = useState([])
    const [randomMnemonicVerify,setRandomMnemonicVerify] = useState([])
    const [formDom]: any = Form.useForm(undefined)
    useImperativeHandle(ref, () => {
        return { 
            formDom,
            submit
        }
    })

    const random = () => {
        const randomNumFn = (num:number,list:any):any=>{
            if (list.size < num) {
                list.add(Math.round(Math.random() * (num*2 - 1)))
               return randomNumFn(num,list)
            }else{
                return list
            }
        }
        const randomNumList = randomNumFn(6,new Set())
        const randomNumVerifyList = randomNumFn(3,new Set())

        const arr = Array.from(props?.data.mnemonic ? props?.data.mnemonic.split(' ') : [])
        
        let newList:any[] =[]
        randomNumList.forEach((v:any,index:any)=>{
            newList.push({
                key:v,
                value: arr[v],
                label: arr[v],
                disabled:false
            })
        })
        setSortMnemonicList(newList)
        setRandomMnemonic(newList.sort((a,b)=>a.key - b.key ).map((v:any,index:number)=>({index,...v})))
        setRandomMnemonicVerify(Array.from(randomNumVerifyList).sort((a:any,b:any)=>a - b ))
    }

    useEffect(()=>{
        random()
    },[])

    const submit = ()=>{
        formDom.validateFields().then((values: any) => {
            props.submit({three:true})
        }).catch(console.log)
    }

    const selectChange = ()=>{
        let list:any = [...noSortMnemonicList]
        const params = formDom.getFieldsValue()
        const values = Object.values(params)
        list = list.map((v:any)=>{
            if(values.includes(v.value)){
                v.disabled = true
            }else{
                v.disabled = false
            }
            return v
        })
        setSortMnemonicList(list)
    }


   return <>
    <div className="mb-[30%] ">
        <p className="text-[20px] mb-[10px]">Verify Random Mnemonics</p>
        <p className="text-[13px]">Type your random mnemonic phrase exactly as you saw it on the previous screen</p>
    </div>
    <Form form={formDom} labelCol={{span:3}} >
        {
            randomMnemonicVerify.map((v,index)=>{
            return <Form.Item key={index} label={randomMnemonic[v].key+1} name={index}
                rules={[
                    { required: true, message: `Please select mnemonic words` },
                    ({ getFieldValue }) => ({
                        validator(_, value) { 
                        
                          if (!value || value === randomMnemonic[v].value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('Mnemonic errors'));
                        },
                    })
                ]} >
                <Select
                    onChange={selectChange}
                    allowClear
                    className="w-full"
                    options={noSortMnemonicList}
                    />
            </Form.Item>
        })
        }
    </Form>
    </>
})


export default StepThree
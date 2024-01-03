import { Button,Input ,Form, message} from "antd"
import React, { useState ,useRef} from "react"
import welcomeImage  from 'src/access/welcome.png'
import {Md5} from 'src/utils/index'
import { setPW } from '../store/Slice/pw'
import { useDispatch,useSelector} from 'react-redux'
// import { useNavigate} from "react-router-dom";
import {PW} from './../../../extension-config'
import UnlockNavigate from './UnlockCommon'
import {ethers} from 'ethers'
const browser = globalThis?.chrome
const runtime = browser?.runtime || ''

const Unlock = (props?:any)=>{
    const UnlockCommonRef: any = useRef<HTMLInputElement>(null)
    const [formDom]: any = Form.useForm()
    const dispatch = useDispatch()
    // const navigate:any = useNavigate();
    const walletActive: any = useSelector(async (state: any) => {
        let data = {}
        data = await state?.walletSlice?.value || {}
        console.log(data);
        if(typeof data === 'string' ) return data
        return Object.values(data || {}).filter((v:any)=>v.active)[0]
      })
    const submit = ()=>{
        formDom.validateFields().then(async ({password}: any) => {
            const md5Str = Md5(String(password));
            const jsonStr = await walletActive
            try{
                const data = await ethers.Wallet.fromEncryptedJson(jsonStr.json, md5Str)       
                console.log('Unlock data',data);
            }catch(e){
                console.log('Unlock error',e);
                message.warning('password error')
                return
            }
            dispatch(setPW(md5Str))
            if(props.type == 'notification'){
                runtime.sendMessage({type:PW,data:md5Str})
                global.close()
                return
            }
            UnlockCommonRef.current.navigate('/home')
        }).catch(console.log)
    }

   return <div className="w-full h-full min-h-[600px] flex flex-col justify-between items-center">
            <div className=" pt-[25%] pb-[5%]  flex justify-center">
                <img className="w-[80%]"  src={welcomeImage} alt={'alt'}/>
            </div>
            <div>
                <p className="text-[30px] font-bold mb-[20px]">Welcome Back</p>
                <p className="mb-[10px]">Unlock your wallet to continue.</p>
            </div>
            <Form form={formDom} className="form-label-null-after mb-[20px]">
                    <Form.Item colon={false} label={''} name="password"
                        rules={[
                            { required: true, message: `please enter password （length 6-18）` },
                            { min: 6, message: 'password min length 6'}
                        ]} >
                        <Input.Password 
                            className="w-[300px]"
                            onKeyUp={(e: any) =>
                                formDom.setFieldsValue({
                                    password: e?.target?.value.replace(/[\u4E00-\u9FA5]|\s+/g, '')
                                })
                            }
                            visibilityToggle maxLength={18} minLength={6} placeholder="lease enter password （length 6-18）"
                        />
                    </Form.Item>
            </Form>
            <div className="w-full pb-[30px] px-[30px]" style={{'boxSizing': 'border-box'}}>
                {!props.type ? <UnlockNavigate ref={UnlockCommonRef} /> : ''}
                <Button className="w-full mb-[20px]" type="primary" size="large" onClick={submit} shape="round">Unlock</Button>
            </div>
    </div>
}


export default Unlock
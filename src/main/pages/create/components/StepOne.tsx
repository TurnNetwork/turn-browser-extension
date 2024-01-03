import React,{forwardRef, useImperativeHandle,} from "react"
import {Form,Input, message} from 'antd'

const StepOne = forwardRef((props: any, ref: any)=>{
    
    const [formDom]: any = Form.useForm(undefined)
    useImperativeHandle(ref, () => {
        return { 
            formDom,
            submit
        }
    })


    const submit = ()=>{
        formDom.validateFields().then((values: any) => {
            props.submit({password:values?.password})
        }).catch(console.log)
    }

   return <>
    <div className="mb-[30%]">
        <p className="text-[30px] mb-[10px]">Create a password</p>
        <p>You'll use this to unlock your wallet</p>
    </div>
    <Form form={formDom} className="form-label-null-after">
        <Form.Item colon={false} label={''} name="password"
            rules={[
                { required: true, message: `please password （length 6-18）` },
                { min: 6, message: 'min password 6 length'}
            ]} >
            <Input.Password 
                onKeyUp={(e: any) =>
                    formDom.setFieldsValue({
                        password: e?.target?.value.replace(/[\u4E00-\u9FA5]|\s+/g, '')
                    })
                }
                 visibilityToggle maxLength={18} minLength={6} placeholder="please password（length 6-18）"
            />
        </Form.Item>
        <Form.Item colon={false} label={``} name="enterPassword"
            rules={[
                { required: true, message: `please enter password` },
                { min: 6, message: 'min password 6 length'},
                ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The new password that you entered do not match!'));
                    },
                })
            ]}
            >

            <Input.Password 
                onKeyUp={(e: any) =>
                    formDom.setFieldsValue({
                        enterPassword: e?.target?.value.replace(/[\u4E00-\u9FA5]|\s+/g, '')
                    })
                }
                visibilityToggle maxLength={18} minLength={6} placeholder="please enter password"/>
        </Form.Item>
    </Form>
    </>
})


export default StepOne
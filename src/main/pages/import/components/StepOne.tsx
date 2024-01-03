import React,{forwardRef, useImperativeHandle,} from "react"

const StepOne = forwardRef((props: any, ref: any)=>{
    useImperativeHandle(ref, () => {
        return { 
            submit
        }
    })


    const submit = (type:string)=>{
       console.log(type);
       props.submit({type})
    }

   return <div className="mb-[30%] pb-[30px]">
        <div className="import-but mb-[20px]" onClick={submit.bind(this,'Mnemonic')}>
            <div>Mnemonic </div>
            <div className="text-[12px] mt-[5px]">By importing mnemonic words</div>
        </div>
        <div className="import-but  px-[20px] py-[10px]" onClick={submit.bind(this,'privateKey')}>
            <div>PrivateKey</div>
            <div className="text-[12px] mt-[5px]">By importing a private key</div>
        </div>
    </div>
   
})


export default StepOne
import React, { useState,forwardRef,useImperativeHandle } from "react"
import { useNavigate} from "react-router-dom";

const UnlockNavigate = forwardRef((props: any, ref: any): any => {
    const navigate:any = useNavigate();
    useImperativeHandle(ref, () => {
        return {
            navigate
        }
    })
    return <></>
}) 


export default UnlockNavigate
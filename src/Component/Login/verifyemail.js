import React, { useState } from "react"
import "./verifyemail.css"
import axios from "axios";
import {useHistory} from 'react-router-dom'

const VerifyEmail=({tempuser})=>{
    const history =useHistory();
    const [verify, setUser] = useState({
        vcode:""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({
            ...verify,
            [name]: value
        })  
    }

    const verifyEmailbtn=()=>{
        const {vcode}=verify
        alert("Email verification code  "+vcode)
        if(vcode === tempuser.captcha ) {
            axios.post("http://localhost:3400/register",tempuser).then(res=>{
                alert(res.data.message)
                tempuser=undefined
                console.log("tempuser-undefined")
                history.push("/login") 
                });
        }else{
            alert("Please enter the valid Verification Code.. <br/> Sent on the Registered Email address")
        }
    }

    const register=()=>{  
        history.push("/register")
    }

    return(
    <div className="verifyemailmaincon">
        <h1 className='verifyemailHeading'>Verify Your Email Address</h1>
        <div className='verifyemailformdiv'>
            <form>

                <div  className='verifyemailheadingdiv'>Verification code has been sent to given Email</div>
                <div  className='verifyemailheadingdiv'>Email:{tempuser.email}</div>
                <div  className='verifyemailheadingdiv'>Kindly Check your Email for the Verification code.</div>
    
                <label htmlFor='entercaptcha' className='verifyemaillabel'>Verification Code:</label>
                <input type='text' className='verifyemailinput' id='entercaptcha' name="vcode" value={verify.vcode} onChange={handleChange} placeholder='Verification code here..' required />
                        
                <div className='btndiv'>
                    <div className='verifybtn' onClick={verifyEmailbtn} >Verify </div>
                    <div className='verifybtn1' onClick={register} >Cancel</div>
                </div>
            </form>
        </div>
    </div>
    );
}

export default VerifyEmail;

import React, { useState } from "react"
import "./login.css"
import axios from "axios";
import {useHistory } from 'react-router-dom'
import Cookies from 'universal-cookie';

const Login =({setloginuser}) => {
    const history = useHistory();
    const cookies = new Cookies();

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login=()=>{
        const {email ,password}=user
        if(email && password) {
            axios.post("http://localhost:3400/login",user)
            .then(res=>{
                alert(res.data.message)
                cookies.set('myCookies', res.data.token);
                setloginuser(res.data.user)
                history.push("/")
            })
        }else{
            alert("Please provide both the feilds for login ")
        }
    }


    const register=()=>{  
        history.push("/register")
    }

    return (
        <div>
            <div className="loginmaincon">
                <h1 className='loginHeading'>Sign In into your Account</h1>
                <div className='loginformdiv'>
                    <form>
                    
                    <label htmlFor='email' className='loginlabel'>Email:</label>
                    <input type='text' className='logininput' id='email' name="email" value={user.email} onChange={handleChange} placeholder='Enter your email here..' required />
                        
                    <label htmlFor='password' className='loginlabel'>Password:</label>
                    <input type='password' className='logininput' id='password'  name="password" value={user.password}  onChange={handleChange}placeholder='Enter your password here..' required />

                    <div className='btndiv'>
                            <div className='loginbtn' onClick={login}>Login</div>
                            <div className='loginbtn1' onClick={register}>Register</div>
                        </div>
                    </form>
                </div>

            </div>
        </div>

    );

}
export default Login;
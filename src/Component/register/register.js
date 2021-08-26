import React, { useState } from "react"
import "./register.css";
import axios from "axios";
import {useHistory} from 'react-router-dom'



const Register = ({settempuser}) => {
    const history =useHistory();
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        gender: "",
        passportimage:null,
        password: "",
        confirmpassword: ""
    })
    const imageUpload=(e)=>{
      setUser({...user,passportimage:e.target.files[0]})
//  console.log({...user,passportimage:e.target.files[0]})
    //   console.log(e.target.files[0])
    //   console.log(e.target)
    //   console.log(e.target.files)
    //   console.log(setUser)
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setUser({
            ...user,
            [name]: value
        })
    }

    const register=()=>{
        const {name, email ,phone, address, gender, password, confirmpassword, passportimage}=user
        if (user){
            if(name && email && phone && address && gender && (password===confirmpassword)) {
                // axios.post("http://localhost:3400/emailexist",user).then(res=>{
                //     // console.log(res.data.exist)
                //     if (res.data.exist){
                //         alert("User Already Registered..Kindly Login ")
                //         history.push('/login')    
                //     } else {
                        axios.post("http://localhost:3400/sendverifcationemail",user).then(res=>{
                        alert("Email Sent")
                        settempuser(res.data.tempuser)
                        history.push("/verifyemail")
                        })
                    }
                // })
            } else {
                alert("Cannot register user Try Again")
            }   
        }
    // }
    
    const loginuser=()=>{  
        history.push("/login")
    }
        
    return (
        <div className="registermaincon">
            {/* {console.log("User", user)} */}
            <h1 className='registerHeading'>Sign Up..! Create Account</h1>
            <h1 className='registerHeading1 ' >Already have a Account.<span onClick={loginuser}> Sign In</span>  </h1>
            <div className='registerformdiv'>
                <form encType="multipart/form-data">
                    <label htmlFor='name' className='reigsterlabel'>Name:</label>
                    <input type='text' className='registerinput' id='name' name="name" value={user.name} onChange={handleChange} placeholder='Enter your name here..' required />

                    <label htmlFor='email' className='reigsterlabel'>Email:</label>
                    <input type='text' className='registerinput' id='email' name="email" value={user.email} onChange={handleChange} placeholder='Enter your email here..' required />

                    <label htmlFor='phone' className='reigsterlabel'>Phone:</label>
                    <input type='text' className='registerinput' id='phone' name="phone" value={user.phone} onChange={handleChange} placeholder='Enter your phone here..' required />
                    <div className='genderdiv'>

                        <label htmlFor='male' className='reigsterlabelgen'>Gender:</label>
                        <input type='radio' className='registerinputgen' id='male' name='gender' value="male" onChange={handleChange} required />
                        <label htmlFor='male' className='reigsterlabelgen'>Male</label>
                        <input type='radio' className='registerinputgen' id='female' name='gender' value="female" onChange={handleChange} required />
                        <label htmlFor='female' className='reigsterlabelgen'>Female</label>
                        <input type='radio' className='registerinputgen' id='other' name='gender' value="other" onChange={handleChange} required />
                        <label htmlFor='other' className='reigsterlabelgen'>Other</label>
                    </div>

                    <label htmlFor='address' className='reigsterlabel'>Address:</label>
                    <input type='textarea' rows='10' cols='5' className='registerinput' name="address" id='address' value={user.address} onChange={handleChange} placeholder='Enter your address here..' required />
                    
                    
                    <label htmlFor='passportimage' className='reigsterlabel'>Passport Image:</label>
                    <input type='file' className='registerinput' name="passportimage" id='passportimage'  onChange={imageUpload} required />

                    <label htmlFor='password' className='reigsterlabel'>Password:</label>
                    <input type='password' className='registerinput' id='password'  name="password" value={user.password}  onChange={handleChange}placeholder='Enter your password here..' required />

                    <label htmlFor='confirmpassword' className='reigsterlabel'>Confirm Password:</label>
                    <input type='password' className='registerinput' name="confirmpassword" id='confirmpassword' value={user.confirmpassword} onChange={handleChange} placeholder='Confirm password ..' required />

                    <div className='btndiv'>
                        <div className='registerbtn' onClick={register}>Register</div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
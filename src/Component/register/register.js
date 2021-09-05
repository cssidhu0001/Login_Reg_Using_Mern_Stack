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
        address:"",
        country:"India",
        state:"",
        city:"",
        gender: "",
        imageupload:null,
        password: "",
        confirmpassword: ""
    })
    
    const imageUpload=(e)=>{
        setUser({...user,
            imageupload:e.target.files[0]
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setUser({
            ...user,
            [name]: value
        })
    }

    const register=event=>{
        
        const data = new FormData();
        data.append("name",user.name)
        data.append("email",user.email)
        data.append("phone",user.phone)
        data.append("address",user.address)
        data.append("country",user.country)
        data.append("state",user.state)
        data.append("city",user.city)
        data.append("gender",user.gender)
        data.append("password",user.password)
        data.append("confirmpassword",user.confirmpassword)
        data.append("imageupload",user.imageupload)

        if (user){
            if(user.name && user.email && user.phone && user.imageupload && user.address && user.gender && user.country && user.state && user.city   && (user.password===user.confirmpassword)) {
                    alert("Wait for 3 second while we sending a verification mail at registered mail : "+user.email)    
                        axios.post("http://localhost:3400/sendverifcationemail",data).then(res=>{
                        if (res.data.message){
                            alert(res.data.message)
                        } else {
                            alert("Verification Email sent to email address:"+user.email)
                            settempuser(res.data.tempuser)
                            history.push("/verifyemail")
                            }
                        })
            } else {
                alert("Cannot register user Try Again")
            }   
        }
    }
    
    const loginuser=()=>{  
        history.push("/login")
    }
        
    return (
        <div className="registermaincon">
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

                    <label htmlFor='country' className='reigsterlabel'>Country:</label>
                    <input type='text' className='registerinput' id='country' name="country" value={user.country} onChange={handleChange} placeholder='Enter your Country here..' required />

                    <label htmlFor='state' className='reigsterlabel'>State:</label>
                    <input type='text' className='registerinput' id='state' name="state" value={user.state} onChange={handleChange} placeholder='Enter your state here..' required />
    
                    <label htmlFor='city' className='reigsterlabel'>City:</label>
                    <input type='text' className='registerinput' id='city' name="city" value={user.city} onChange={handleChange} placeholder='Enter your City here..' required />
                    
                    <label htmlFor='address' className='reigsterlabel'>Address:</label>
                    <input type='textarea' rows='10' cols='5' className='registerinput' name="address" id='address' value={user.address} onChange={handleChange} placeholder='Enter your address here..' required />
                    
                    
                    <label htmlFor='imageupload' className='reigsterlabel'>Passport Image:</label>
                    <input type='file' className='registerinput' alt="Image Not Found" name="imageupload" id='imageupload'  onChange={imageUpload} required />

                    <label htmlFor='password' className='reigsterlabel'>Password:</label>
                    <input type='password' className='registerinput' id='password'  name="password" value={user.password}  onChange={handleChange} placeholder='Enter your password here..' required />

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
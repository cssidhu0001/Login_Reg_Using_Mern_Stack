import React from "react"
import "./homepage.css"

const Homepage=({user})=>{
   
    const logout = ()=>{
        user=undefined
        console.log("user-logout")
        window.location.reload();
    }
    
    return(
        <div>
            <div className="hompagemaincontainer">
                <h1 className='homeh1'> Hello {user.name}</h1>
                <p className='homepagep'>Welcome to our Homepage you are sucessfully Logined Now </p>
                <button className='homepagebtn' onClick={logout}> Logout </button>
            </div>
        </div>
    );
}   

export default Homepage;
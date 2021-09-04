import React from "react"
import "./homepage.css"
import {useHistory } from 'react-router-dom';

const Homepage=({user})=>{
    const history = useHistory();
    const logout = ()=>{
        user=undefined
        console.log("user-logout")
        window.location.reload();
    }

    const findnearbyme=()=>{  
        history.push("/locationfinder")
       }

    return(
        <div>
            <div className="hompagemaincontainer">
                <h1 className='homeh1'> Hello {user.name}</h1>
                <img id='passportimage' src={require("../../imageUpload/"+user.imageupload).default} alt=""/>
                <p className='homepagep'>Welcome to our Homepage you are sucessfully Logined Now </p>
                <button className='homepagebtn' onClick={logout}> Logout </button>
                <button className='homepagebtn' onClick={findnearbyme}>Find Near By Me </button>
            </div>
        </div>
    );
}   

export default Homepage;
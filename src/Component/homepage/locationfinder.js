import React, { useState }  from "react"
import "./locationfinder.css"
import {useHistory } from 'react-router-dom'
import axios from "axios";

const Locationfinder =({user}) => {
    const history = useHistory();
    const [findlocn, locUser] = useState({
        distn:1,
        city:"",
        unit:"",
        user:user
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        locUser({
            ...findlocn,
            [name]: value
        })
    }

    const locationfinder=async ()=>{  
        await axios.post("http://localhost:3400/locationfinder",findlocn).then(res=>{
            // res.data.cities
            alert(res.data.cities)
        })
    }

    const homepage=()=>{  
        history.push("/")
    }

    return (
        <div className="locationmaincon">
        <h1 className='locationHeading'>Find Near by me Locations</h1>
        <div className='locationformdiv'>
            <form>
                <label htmlFor='city'>City:</label>
                <input type="text" onChange={handleChange} name="city" value={findlocn.city} id="distn" placeholder="By default your registered city" className="locationinput"/>
            
                <label htmlFor='distn'>Distance:</label>
                <input type="text" onChange={handleChange} name="distn" value={Number(findlocn.distn)} id="distn" placeholder="Distance (Enter only numeric value)" className="locationinput"/>
                <div> {/* <div className='unitdiv'> */}
                    <label htmlFor='kilometers' className='locationlabel'>Unit:</label>
                    <input type='radio' className='locationinputunit' id='km' name='unit' value="km" onChange={handleChange} />
                    <label htmlFor='km' className='locationlabel'>Kilometers </label>
                    <input type='radio' className='locationinputunit' id='mi' name='unit' value="mi" onChange={handleChange} />
                    <label htmlFor='mi' className='locationlabel'>Miles </label>
                </div>
                <div id="output"></div>
                <div className="btndiv">
                    <button className="findbtn" onClick={locationfinder}>Go</button>
                    <button className="findbtn" onClick={homepage}>Back</button>
                </div>
            </form>
        </div>
        </div>
        
    );

}

export default Locationfinder;
    
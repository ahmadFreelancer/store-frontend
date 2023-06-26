import React, { useState, useEffect } from 'react'
import axios from "axios"
import { useNavigate, NavLink } from "react-router-dom";
import bgLogin from "./assets/images/bgLogin.jpg"

export default function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [btnDisable, setBtnDisable] = useState(true)
    const [checkChecked, setCheckChecked] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            navigate('/dashboard')
        }
    }, [])

    const formSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post(`https://storebackend-ldjb.onrender.com/register`, {
            name,
            email,
            password,
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )

        // console.log(response)
        if (response.data.status === 'ok') {
            alert('Registered Successfully')
            navigate("/login")
        }

    }


    const checkBoxToggle = () => {
        
            setBtnDisable(!btnDisable)
            setCheckChecked(!checkChecked)
    }




    return (
        <div className='loginContainer' style={{
            backgroundImage: `url(${bgLogin})`, backgroundPosition: "center center",
            backgroundRepeat: "no-repeat", backgroundSize: "cover"
        }}>
            <div className='loginWrapper'>
                <h1>Register</h1>
                <form onSubmit={formSubmit} className='formLogin'>
                    <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Your Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <div>
                        <input type="checkbox" id='termsCheckBox' checked={checkChecked} onChange={checkBoxToggle} />
                        <label htmlFor="termsCheckBox">Agree to All Terms</label>
                    </div>

                    <input type="submit" placeholder="Submit" className='btnPurple' disabled={btnDisable} />


                    <div className='text-center my-2'>Already have an account ? <NavLink to={'/login'} >Sign In</NavLink> </div>
                </form>
            </div>

        </div>
    )
}

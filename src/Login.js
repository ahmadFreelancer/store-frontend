import React, { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import bgLogin from "./assets/images/bgLogin.jpg"
import { NavLink } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [btnDisable, setBtnDisable] = useState(false)
    const [spinner, setSpinner] = useState(false)

    const navigate = useNavigate();


    const formSubmit = async (e) => {
        e.preventDefault();
        setSpinner(true)

        const response = await axios.post(
            `https://storebackend-ldjb.onrender.com/login`,
            { email, password },
            { headers: { 'Content-Type': 'application/json' } }
        )
        const data = response.data;
        setSpinner(false)
        // console.log(data)
        if (data.authToken) {
            sessionStorage.setItem('token', data.authToken)

            navigate("/dashboard");
        }
        else if (data.authToken === false) {
            alert("Use right credentials please")
        }

    }

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            navigate('/dashboard')
        }
    }, [])


    useEffect(() => {
        if (password === '') {
            setBtnDisable(true)
        }
        else {
            setBtnDisable(false)
        }
    }, [password])




    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className='loginAnimWrapper'>
                    <div className='static-text'>Please</div>
                    <ul className='dynamic-text'>
                        <li><span>1. REGISTER</span></li>
                        <li><span>2. and</span></li>
                        <li><span>3. THEN</span></li>
                        <li><span>4. LOGIN..</span></li>
                    </ul>
                </div>
            </div>

            <div className='loginContainer' style={{
                backgroundImage: `url(${bgLogin})`, backgroundPosition: "center center",
                backgroundRepeat: "no-repeat", backgroundSize: "cover"
            }}>
                <div className='loginWrapper'>
                    <h1>Login</h1>

                    {
                        spinner === true ? <div className="spinner-border text-center m-auto" role="status"></div> : null
                    }

                    <form onSubmit={formSubmit} className='formLogin'>
                        <input id='emailId' name='emailN' type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />

                        <input type="password" placeholder="Your Password" value={password} onChange={(e) => setPassword(e.target.value)} />

                        <input className='btnPurple' type="submit" placeholder="Submit" disabled={btnDisable} />


                        <div className='text-center my-2'>Dont't have an account ? <NavLink to={'/register'} >Sign Up Free</NavLink> </div>
                    </form>
                </div>
            </div>
        </>
    )
}

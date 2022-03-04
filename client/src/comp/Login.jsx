import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [userName, setUserName] = useState('')
    const [passWord, setPassWord] = useState('')
    const [message, setMessage] = useState('')


    const navigate = useNavigate()

    const Login = async () => {
        const res = await fetch('http://localhost:1000/users/login', {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userName: userName,
                passWord: passWord
            }),
            credentials: "include"
        })
        const data = await res.json()
        if (data.msg) {
            navigate('/')
            window.location.reload();
        }else{
            setMessage(data.err)
        }
    }
    return (
        <div className="Login">
            <div className="LoginBox">
                <h1>Welcome To AirBnb</h1>
                <h5>Sign in to your AirBnb account </h5>
                <h3>User Name</h3>
                <input type="text"
                    className='UserName'
                    onChange={(e) => {
                        setUserName(e.target.value)
                    }} />

                <h3>Password</h3>
                <input type="password"
                    className='Password'
                    onChange={(e) => setPassWord(e.target.value)} />

                <h6>{message}</h6>

                <button
                    className="LoginButton"
                    type="submit"
                    onClick={() => {
                        if (userName && passWord) {
                            Login()
                        } else {
                            setMessage("missing some info")
                        }
                    }}>Login
                </button>

                <h2 className='LoginButton' onClick={() => navigate('/register')}>Create new account !</h2>
            </div>
        </div>
    )
}

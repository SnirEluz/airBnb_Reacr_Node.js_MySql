import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Register() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userName, setUserName] = useState('')
    const [passWord, setPassWord] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate()

    const register = async () => {
        const res = await fetch('http://localhost:1000/users/register', {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                userName: userName,
                passWord: passWord
            }),
            credentials: "include"
        })
        const data = await res.json()
        setMessage(data.err)
        if(data.msg){
            navigate('/')
            window.location.reload();        }
    }

    return (
        <div className="Register">
            <div className="RegisterBox">
                <h1>Welcome To AirBnb</h1>
                <h5>Sign up to your AirBnb account </h5>
                <h3>First Name</h3>
                <input type="text"
                    className='FirstName'
                    onChange={(e) => {
                        setFirstName(e.target.value)
                    }} />
                <h3>Last Name</h3>
                <input type="text"
                    className='LastName'
                    onChange={(e) => {
                        setLastName(e.target.value)
                    }} />
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
                    className="RegisterButton"
                    type="submit"
                    onClick={() => {
                        register()
                        if (firstName && lastName && userName && passWord) {
                        }
                    }}>Register
                </button>

                <h2 className='LoginButton' onClick={() => navigate('/login')}>Already have account ? Login</h2>
            </div>
        </div >
    )
}

import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import logoutImg from '../image/logout.png'
import statistic from '../image/statistic.png'
import add from '../image/add.png'


export default function Header({ userSession }) {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    if (pathname === '/login' || pathname === '/register') return null;

    const logout = async () => {
        await fetch('http://localhost:1000/users/logout', {
            method: 'delete',
            credentials: 'include'
        })
        navigate('/login')
    }
    return (
        <div className="Header">
            <h1 onClick={() => navigate('/')}>AirBnb</h1>
            {userSession.role == "admin" ?
                <div>
                    <span onClick={() => navigate('/statics')}>
                        <img src={statistic} alt="" />
                        <button >Statics</button>
                    </span>
                    <span onClick={() => navigate('/addvacation')}>
                        <img src={add} alt="" />
                        <button>Add Vaction</button>
                    </span>
                    <span onClick={() => logout()}>
                        <img src={logoutImg} alt="" />
                        <button >Logout</button>
                    </span>
                </div>
                :
                <span onClick={() => logout()}>
                    <img src={logoutImg} alt="" />
                    <button>Logout</button>
                </span>
            }
        </div>
    )
}

import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import AddVacation from './comp/AddVacation'
import HomePage from './comp/HomePage'
import Login from './comp/Login'
import Register from './comp/Register'
import Statics from './comp/Statics'

export default function Main({ userSession }) {
    const [update, setUpdate] = useState(false)
    const [update2, setUpdate2] = useState(false)
    const [arrFollowedVac, setArrFollowedVac] = useState([])
    const [vacations, setVacations] = useState([])
    const [vacationsArrayStatics, setVacationsArrayStatics] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        // console.log("1")
        (async () => {
            const res = await fetch('http://localhost:1000/vacations', {
                headers: { "Content-Type": "application/json" },
                credentials: "include"
            })
            console.log("2")
            const data = await res.json()
            if (data.err) { return navigate('/login') }
            setVacationsArrayStatics(data)
            const vactionFollow = data.filter(d => arrFollowedVac.includes(d.id))
            const vactionUnFollow = data.filter(d => !arrFollowedVac.includes(d.id))
            let vacations2 = vactionFollow.concat(vactionUnFollow)
            setVacations(vacations2)
            console.log("3")
        })();
    }, [update])
    useEffect(() => {
        setTimeout(async () => {
            await setUpdate(a => !a)
            setTimeout(async () => {
                await setUpdate(a => !a)
            }, 30);
        }, 70);
    }, [update2])

    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage
                    userSession={userSession}
                    vacations={vacations}
                    update={update}
                    setUpdate={setUpdate}
                    setUpdate2={setUpdate2}
                    arrFollowedVac={arrFollowedVac}
                    setArrFollowedVac={setArrFollowedVac}
                />} />
                <Route path="/addVacation" element={<AddVacation userSession={userSession} setUpdate2={setUpdate2}/>} />
                <Route path="/statics" element={<Statics vacationsArrayStatics={vacationsArrayStatics}/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    )
}

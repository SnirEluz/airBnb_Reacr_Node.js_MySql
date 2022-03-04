import React, { useEffect, useState } from 'react'
import date from '../image/date.png'
import priceImg from '../image/price.png'
import edit from '../image/edit.png'
import deleteImg from '../image/deleteImg.png'

export default function Vacation({
    vac,
    userSession,
    update,
    setUpdate,
    setUpdate2,
    arrFollowedVac,
    setArrFollowedVac }) {
    const [followers, setFollowers] = useState([])
    const [userfollowe, setUserFollowe] = useState([])
    const [followed, setFollowed] = useState(false)
    const [showEdit, setShowEdit] = useState(false)

    const [info, setInfo] = useState("")
    const [destination, setDestination] = useState("")
    const [image, setimage] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [price, setPrice] = useState(0)
    useEffect(() => {
        (async () => {
            setInfo(vac.info)
            setDestination(vac.destination)
            setimage(vac.image)
            setStartDate(vac.startDate)
            setEndDate(vac.endDate)
            setPrice(vac.price)
        })();
        (async () => {
            const res = await fetch(`http://localhost:1000/vacations/followers/${vac.id}`, {
                headers: { "Content-Type": "application/json" },
                credentials: "include"
            })
            const data = await res.json()
            const userFollowFind = await data.find(a => a.userId == userSession.id)
            for (let index = 0; index < data.length; index++) {
                if (!arrFollowedVac.includes(data[index].vacationsId) && data.some(u => u.userName == userSession.userName)) {
                    return arrFollowedVac.push(data[index].vacationsId)
                }
            }
            if (userFollowFind) {
                setFollowed(true)
                setUserFollowe(userFollowFind)
            } else {
                setUserFollowe([])
                setFollowed(false)
            }
            setFollowers(data)
        })()
    }, [update])
    useEffect(() => {
        setTimeout(async () => {
            await setUpdate2(a => !a)
        }, 100);
    }, [])
    const unFollow = async () => {
        await fetch(`http://localhost:1000/vacations/unfollow`, {
            method: "delete",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                followId: userfollowe.id,
                vacationsId: vac.id
            }),
            credentials: "include"
        })
        setFollowed(false)
        setUpdate2(a => !a)
        if (arrFollowedVac.length > 0) {
            const currentIndex = arrFollowedVac.findIndex(i => i == vac.id)
            arrFollowedVac.splice(currentIndex, 1)
        }
    }
    const follow = async () => {
        await fetch(`http://localhost:1000/vacations/follow`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userName: userSession.userName,
                userId: userSession.id,
                vacationsId: vac.id
            }),
            credentials: "include"
        })
        setFollowed(true)
        setUpdate2(a => !a)
    }
    const deletePost = async () => {
        await fetch(`http://localhost:1000/vacations/delVacation`, {
            method: "delete",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                vacationsId: vac.id,
            }),
            credentials: 'include'
        })
        setUpdate2(a => !a)
    }
    const editVacation = async () => {
        await fetch(`http://localhost:1000/vacations/editVacation`, {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                info: info,
                destination: destination,
                image: image,
                startDate: startDate,
                endDate: endDate,
                price: price,
                vacationId: vac.id
            }),
            credentials: "include"
        })
        setShowEdit(a => !a)
        setUpdate2(a => !a)
    }
    return (
        < div className="Vacation" >
            {userSession.role == "admin" ?
                < div className='AdminOprions'>
                    <img onClick={() => setShowEdit(a => !a)} src={edit} alt="" />
                    <img onClick={() => deletePost()} src={deleteImg} alt="" />
                </div>
                :
                null
            }
            <h1>{vac.destination}</h1>
            <h3>{vac.info}</h3>
            <img className='Banner' src={vac.image} alt="" />
            <div className='Info'>
                <span>
                    <img src={date} alt="" />
                    <h2>Start {vac.startDate}</h2>
                </span>
                <span>
                    <img src={date} alt="" />
                    <h2>End {vac.endDate}</h2>
                </span>
                <span>
                    <img src={priceImg} alt="" />
                    <h2>Price {vac.price}$</h2>
                </span>
                <h2 className='Followers'>{followers.length} Followers</h2>
                {userSession.role == "admin" ?
                    null
                    :
                    followed ?
                        <button onClick={() => unFollow()}>Unfollow</button>
                        :
                        <button onClick={() => follow()}>Follow</button>
                }
            </div>
            {userSession.role == "admin" ?
                showEdit ?
                    <div className="EditVacation">
                        <div>
                            <h1>info</h1>
                            <input type="text" defaultValue={vac.info || ""} onChange={(e) => setInfo(e.target.value)} />
                        </div>
                        <div>
                            <h1>Destination</h1>
                            <input type="text" defaultValue={vac.destination || ""} onChange={(e) => setDestination(e.target.value)} />
                        </div>
                        <div>
                            <h1>Image</h1>
                            <input type="text" defaultValue={vac.image || ""} onChange={(e) => setimage(e.target.value)} />
                        </div>
                        <div>
                            <h1>Start Date</h1>
                            <input type="date" defaultValue={vac.startDate || ""} onChange={(e) => setStartDate(e.target.value)} />
                        </div>
                        <div>
                            <h1>End Date</h1>
                            <input type="date" defaultValue={vac.endDate || ""} onChange={(e) => setEndDate(e.target.value)} />
                        </div>
                        <div>
                            <h1>Price</h1>
                            <input type="number" defaultValue={vac.price || ""} onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <button onClick={() => editVacation()}>Save Changes</button>
                    </div>
                    : null
                :
                null
            }
        </div >
    )
}

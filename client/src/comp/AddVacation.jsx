import React, { useState } from 'react'

export default function AddVacation({ setUpdate2 }) {
    const [info, setInfo] = useState("")
    const [destination, setDestination] = useState("")
    const [image, setimage] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [price, setPrice] = useState(0)
    const [message, setMessage] = useState('')

    const addVacation = async () => {
        await fetch(`http://localhost:1000/vacations/addVacation`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                info: info,
                destination: destination,
                image: image,
                startDate: startDate,
                endDate: endDate,
                price: price
            }),
            credentials: "include"
        })
        setUpdate2(a => !a)
    }
    return (
        <div className="AddVacation">
            <h2>Add Vactions</h2>
            <div>
                <h1>info</h1>
                <input type="text" value={info || ''} onChange={(e) => setInfo(e.target.value)} />
            </div>
            <div>
                <h1>Destination</h1>
                <input type="text" value={destination || ''} onChange={(e) => setDestination(e.target.value)} />
            </div>
            <div>
                <h1>Image</h1>
                <input type="text" value={image || ''} onChange={(e) => setimage(e.target.value)} />
            </div>
            <div>
                <h1>Start Date</h1>
                <input type="date" value={startDate || ''} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div>
                <h1>End Date</h1>
                <input type="date" value={endDate || ''} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <div>
                <h1>Price</h1>
                <input type="number" value={price || ''} onChange={(e) => setPrice(e.target.value)} />
            </div>
            <h6>{message}</h6>
            <button onClick={() => {
                if (!info || !destination || !image || !startDate || !endDate || !price) {
                    setMessage("Missing some info")
                } else {
                    setInfo("")
                    setDestination("")
                    setimage("")
                    setStartDate("")
                    setEndDate("")
                    setPrice("")
                    setMessage("Vacation hs been created")
                    addVacation()
                }
            }}>Add</button>
        </div>
    )
}

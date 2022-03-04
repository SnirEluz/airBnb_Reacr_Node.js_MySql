import React, { useState } from 'react'
import './HomePage.scss'
import Vacation from './Vacation'

export default function HomePage({
    userSession,
    vacations,
    update,
    setUpdate,
    setUpdate2,
    arrFollowedVac,
    setArrFollowedVac }) {
    const [searchVacations, setSearchVacations] = useState('')
    return (
        <div className="HomePage">
            <div className='SearchVacations'>
                <input type="text" name="" id="" placeholder='Search Vacations' onChange={(e) => {
                    setSearchVacations(e.target.value.toLocaleLowerCase())
                }} />
            </div>
            {vacations.filter(v =>
                v.destination.toLocaleLowerCase().includes(searchVacations)
            ).map((vac, i) => <Vacation
                key={i}
                vac={vac}
                userSession={userSession}
                update={update}
                setUpdate={setUpdate}
                setUpdate2={setUpdate2}
                arrFollowedVac={arrFollowedVac}
                setArrFollowedVac={setArrFollowedVac} />)}
        </div>
    )
}

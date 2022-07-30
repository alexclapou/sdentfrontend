import React from 'react'
import './DatePicker.css'
import UserCard from '../components/UserCard'
import DatePicker from 'sassy-datepicker'
import Appointments from '../components/Appointments'

export default function Profile(user) {
  return (
    <div className="text-slate-500 mt-8 flex flex-col items-center lg:flex-row">
      <div className="lg:justify-around flex flex-col items-center lg:flex-col  lg:items-center lg:w-1/3 w-10/12 xl:flex-col">
        <UserCard {...user} />
        <DatePicker className="sdp shadow-lg mx-auto mt-10" />
      </div>
      <Appointments {...user} />
    </div>
  )
}

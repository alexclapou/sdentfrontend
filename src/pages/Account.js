import React, { useEffect, useState } from 'react'
import './DatePicker.css'
import UserCard from '../components/UserCard'
import DatePicker from 'sassy-datepicker'
import Appointments from '../components/Appointments'
import { useParams } from 'react-router-dom'
import axiosInstance from '../utils/axios-instance'

const url = 'http://localhost:3000/api/users'

export default function Account() {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  useEffect(() => {
    axiosInstance
      .get(`${url}/${id}`, {})
      .then(function (response) {
        setUser(response.data.user)
      })
      .catch(function (error) {
        console.log(error.response)
      })
  }, [id])

  return (
    <div className="text-slate-500 mt-8 flex flex-col items-center lg:flex-row">
      <div className="lg:justify-around flex flex-col items-center lg:flex-col  lg:items-center lg:w-1/3 w-10/12 xl:flex-col">
        {user ? <UserCard {...user} /> : ''}
        <DatePicker className="sdp shadow-lg mx-auto mt-10" />
      </div>
      {user ? <Appointments {...user} /> : ''}
    </div>
  )
}

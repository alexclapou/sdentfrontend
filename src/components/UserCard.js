import React, { useEffect, useState } from 'react'
import userProfileImage from '../assets/car.jpeg'
import { MailIcon } from '@heroicons/react/outline'
import axios from 'axios'

const UserCard = (user) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  useEffect(() => {
    axios
      .get(`https://api-sdent.herokuapp.com/api/users/current_user_name/${user.id}`, {
        withCredentials: true
      })
      .then(function (response) {
        setName(response.data.name)
      })
      .catch(function (error) {
        console.log(error)
      })
    axios
      .get(`https://api-sdent.herokuapp.com/api/users/current_user_email/${user.id}`, {
        withCredentials: true
      })
      .then(function (response) {
        setEmail(response.data.name)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  return (
    <div className="w-10/12 sm:w-3/5 lg:w-80 lg:h-72 shadow-lg rounded-xl  flex flex-col justify-between items-center">
      <div className="flex flex-col items-center justify-start">
        <div className="flex flex-row items-center mt-10">
          <img
            src={userProfileImage}
            alt="user profile pic"
            className="h-10 w-10 rounded-full object-cover mr-4"
          />
          <h2 className="text-xl font-semibold">{name}</h2>
        </div>
        <div>-{user.role}-</div>
      </div>
      <div className="hidden sm:flex flex-row w-full m-auto">
        <div className="flex flex-col m-auto items-center">
          <div className="w-16 h-2 bg-[#fef9c3]"></div>
          <p className="text-sm">requested </p>
        </div>
        <div className="flex flex-col m-auto items-center">
          <div className="w-16 h-2 bg-[#e0f2fe]"></div>
          <p className="text-sm">confirmed </p>
        </div>
        <div className="flex flex-col m-auto items-center">
          <div className="w-16 h-2 bg-[#dcfce7]"></div>
          <p className="text-sm">completed </p>
        </div>
        <div className="flex flex-col m-auto items-center">
          <div className="w-16 h-2 bg-[#fee2e2]"></div>
          <p className="text-sm">canceled </p>
        </div>
      </div>
      <div className="mb-10 flex ">
        <MailIcon className="w-6 mr-2" />
        <p className="block">{email}</p>
      </div>
    </div>
  )
}

export default UserCard

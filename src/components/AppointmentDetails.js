import React, { useEffect, useState } from 'react'
import axiosInstance from '../utils/axios-instance'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import getBadgeStyle from '../utils/getBadgeStyle'
import Profile from '../pages/profile'

const url = `https://api-sdent.herokuapp.com/api/appointments`
const AppointmentDetails = ({ userId, userRole }) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [appointment, setAppointment] = useState(null)

  useEffect(() => {
    axiosInstance
      .get(`${url}/${id}`, {})
      .then(function (response) {
        setAppointment(response.data.appointment)
      })
      .catch(function (error) {
        console.log(error.response)
        if (error.response.data.errors[0] === 'Appointment does not exist')
          navigate('/profile')
      })
  }, [])
  if (appointment != null) {
    if (
      userId !== appointment.patient_id &&
      userRole !== 'assistant' &&
      userRole !== 'dentist' &&
      userRole !== 'admin'
    )
      return <Navigate to={'/profile'} replace />
  }
  const equipments = appointment
    ? appointment.equipments.map((equipment) => (
        <div
          className="flex border-b py-3 text-sm justify-between"
          key={equipment.id}
        >
          <div>{equipment.name}</div>
          <div>{equipment.quantity}</div>
        </div>
      ))
    : []
  return (
    <div className="text-gray-900 border p-6 bg-teal-50 w-2/5 mx-auto rounded-lg m-3">
      <h1 className="text-xl p-3 mb-3 text-center">
        Appointment number #
        <span className="text-important-color font-semibold">
          {appointment ? appointment.id : ''}
        </span>
        <div className="flex align-center justify-center">
          Status -{appointment ? getBadgeStyle(appointment.status) : ''}
        </div>
      </h1>

      <div className=" border  rounded-lg p-6  mx-auto bg-white mb-10">
        <div className="border-b pb-3 ">Appointment summary</div>
        <div className="flex border-b py-3 text-sm justify-between">
          <div>Date</div>
          <div>
            {appointment
              ? `${appointment.start_date} - ${
                  appointment.end_date.split(' ')[3]
                }`
              : ''}
          </div>
        </div>
        <div className="flex border-b py-3 text-sm justify-between">
          <div>Dentist</div>
          <div>{appointment ? appointment.dentist : ''}</div>
        </div>
        <div className="flex border-b py-3 text-sm justify-between">
          <div>Asistent</div>
          <div>{appointment ? appointment.assistant : ''}</div>
        </div>
        <div className="flex border-b py-3 text-sm justify-between">
          <div>Patient</div>
          <div>{appointment ? appointment.patient : ''}</div>
        </div>
        <div className="flex border-b py-3 text-sm justify-between">
          <div>Cabinet</div>
          <div>{appointment ? appointment.cabinet_name : ''}</div>
        </div>
        <div className="flex border-b py-3 text-sm justify-between">
          <div>Description</div>
          <div>{appointment ? appointment.description : ''}</div>
        </div>
        <div className="flex pt-3 text-sm justify-between">
          <div>Location</div>
          <div>{appointment ? appointment.location : ''}. 6</div>
        </div>
      </div>

      <div className="border  rounded-lg p-6  mx-auto bg-white">
        <div className="flex justify-between border-b">
          <div className="pb-3">Items summary</div>
          <div className="pb-3">Qty</div>
        </div>
        {appointment && appointment.status === 'completed' ? (
          <>{equipments}</>
        ) : (
          <div>
            <p className="text-red-500 p-2">Appointment is not completed</p>
            {appointment &&
            appointment.status === 'confirmed' &&
            new Date() > new Date(appointment.start_date) ? (
              <div className=" p-3 bg-primary-color rounded-lg">
                <p className="mb-2">You can complete this appointment.</p>
                <Link
                  className="bg-important-color text-white py-2.5 px-3 text-center rounded-md font-semibold"
                  to={`/complete-appointment/${appointment.id}`}
                >
                  Complete appointment
                </Link>
              </div>
            ) : (
              ''
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default AppointmentDetails

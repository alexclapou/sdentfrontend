import React, { useState } from 'react'
import { CalendarIcon } from '@heroicons/react/outline'
import {
  InformationCircleIcon,
  LocationMarkerIcon,
  TrashIcon,
  XIcon
} from '@heroicons/react/outline'
import CancelModal from './CancelModal'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

export default function Appointment({ appointment }) {
  const [showModal, setShowModal] = useState(false)
  const handleClick = () => {
    setShowModal(true)
  }

  return (
    <>
      <ToastContainer />

      <div
        className={`${
          appointment.status === 'canceled'
            ? 'bg-[#fee2e2]'
            : appointment.status === 'confirmed'
            ? 'bg-[#e0f2fe]'
            : appointment.status === 'requested'
            ? 'bg-[#fef9c3]'
            : 'bg-[#dcfce7]'
        }
      shadow-sm rounded-xl my-3 pt-5  flex flex-col lg:flex-row lg:p-5 justify-between`}
      >
        {showModal ? (
          <CancelModal
            setOpen={setShowModal}
            appointmentId={appointment.id}
            toast={() => toast.error("Can't cancel this appointment")}
          />
        ) : null}
        <div className="flex items-start flex-col px-5 lg:justify-center">
          <div className="flex mb-2 justify-center">
            <CalendarIcon className="w-6 mr-2" />
            <p>{appointment.date}</p>
          </div>
          <div className="flex">
            <LocationMarkerIcon className="w-6 mr-2 justify-center" />
            <p>{appointment.location}</p>
          </div>
        </div>
        {appointment.status === 'confirmed' ||
        appointment.status === 'requested' ? (
          <div className="flex flex-row lg:flex-col text-white">
            <button
              className="bg-red-500 rounded-bl-xl w-1/2 lg:w-28 lg:rounded-xl lg:mb-2 lg:p-2 xl:w-28 2xl:w-32 p-1 flex justify-center"
              onClick={handleClick}
            >
              <TrashIcon className="w-6 mr-1" />
              <p>Cancel</p>
            </button>
            <Link
              to={`/appointments/${appointment.id}`}
              className="bg-important-color rounded-br-xl w-1/2 lg:w-full lg:rounded-xl lg:p-2 xl:w-28 2xl:w-32 p-1 flex justify-center"
            >
              <InformationCircleIcon className="w-6 mr-1" />
              {/* className="btn btn-primary" */}
              Details
            </Link>
          </div>
        ) : (
          ''
        )}

        {appointment.status === 'completed' ? (
          <div className="flex flex-row lg:flex-col justify-center text-white">
            <Link
              to={`/appointments/${appointment.id}`}
              className="bg-important-color rounded-br-xl w-1/2 lg:w-full lg:rounded-xl lg:p-2 xl:w-28 2xl:w-32 p-1 flex justify-center"
            >
              <InformationCircleIcon className="w-6 mr-1" />
              {/* className="btn btn-primary" */}
              Details
            </Link>
          </div>
        ) : (
          ''
        )}
        {appointment.status === 'canceled' ? (
          <div className=" flex flex-col rounded-br-xl md:w-1/2 sm:w-full lg:rounded-xl lg:p-2 xl:w-28 2xl:w-32 p-1 ">
            <XIcon className="w-6 m-auto" />
            Canceled
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  )
}

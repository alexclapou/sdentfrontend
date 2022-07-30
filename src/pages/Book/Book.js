import { useEffect, useState } from 'react'
import { Calendar } from 'react-calendar'
import Dropdown from './Dropdown'
import 'react-calendar/dist/Calendar.css'
import { LocationMarkerIcon } from '@heroicons/react/outline'
import axiosInstance from '../../utils/axios-instance'
import getAvailableHours from '../../utils/getHours'
import TimeSlotList from './TimeSlotList'
import getNextWorkingDay from '../../utils/getNextWorkingDay'
import { toast, ToastContainer } from 'react-toastify'

const dentists_url = 'http://localhost:3000/api/users/dentists'
const dates_url = 'http://localhost:3000/api/appointments/unavailable_dates'
const request_url = 'http://localhost:3000/api/appointments/request_appointment'

const Book = () => {
  const [dentists, setDentists] = useState([])
  const [selectedDentist, setSelectedDentist] = useState()
  const [futureDates, setFutureDates] = useState([])
  const [availableDates, setAvailableDates] = useState([])
  const [selectedDate, setSelectedDate] = useState()
  const [description, setDescription] = useState('')
  console.log(selectedDate)
  console.log(availableDates)
  console.log(selectedDentist)
  const changeHandler = (selectedDoctor) => {
    setSelectedDate()
    setSelectedDentist(selectedDoctor)
    axiosInstance
      .get(`${dates_url}/${dentists[selectedDoctor].id}`, {})
      .then(function (response) {
        setFutureDates(response.data.future_dates)
      })
      .catch(function (error) {
        console.log(error.response)
      })
  }

  const handleCalendarDates = (selectedDay) => {
    setSelectedDate()
    setAvailableDates(getAvailableHours(futureDates, selectedDay))
  }

  useEffect(() => {
    handleCalendarDates(getNextWorkingDay())
  }, [futureDates])

  useEffect(() => {
    axiosInstance
      .get(dentists_url, {})
      .then(function (response) {
        setDentists(response.data.dentists)
      })
      .catch(function (error) {
        console.log(error.response)
      })
  }, [])

  const handleSubmit = () => {
    axiosInstance
      .post(request_url, {
        app_request_details: {
          cabinet_id: dentists[selectedDentist].cabinet.id,
          dentist_id: dentists[selectedDentist].id,
          start_date: selectedDate,
          description: description
        }
      })
      .then(function (response) {
        toast.success('Appointment booked succesfully')
        console.log(response)
      })
      .catch(function (error) {
        toast.error(error.response.data.errors[0])
        console.log(error.response.data.errors[0])
      })
  }

  return (
    <div className="p-4 text-slate-500 flex flex-col">
      <ToastContainer hideProgressBar={true} />
      <div className="flex-col flex lg:flex-row">
        <div className="flex flex-col  basis-1/2 p-10">
          <h1 className="text-4xl font-thin mb-6">Select a dentist</h1>
          <Dropdown onChange={changeHandler} values={dentists} />
          {selectedDentist ? (
            <div className="py-6">
              <p className="text-lg font-semibold">
                {dentists[selectedDentist].name} -{' '}
                <span className="text-md font-thin">
                  {dentists[selectedDentist].cabinet.name}
                </span>{' '}
              </p>
              <div className="text-sm mt-1.5 flex flex-row ">
                <LocationMarkerIcon className="md:block hidden w-4 ml-1 mr-1 justify-center" />
                <p>{dentists[selectedDentist].cabinet.location}</p>
              </div>
            </div>
          ) : null}
          <div className="py-6 flex flex-col">
            <label htmlFor="description" className="text-lg py-3">
              Appointment details
            </label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              name="description"
              id="description"
              cols="10"
              rows="5"
              className="p-4 border-2 border-gray-300 focus:outline-none focus:border-gray-400 resize-none"
            ></textarea>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between basis-1/2  h-full p-10">
          <h1 className="text-4xl font-thin ">Select a date</h1>
          <div className="flex flex-col lg:flex-row items-center justify-between py-10 w-full ">
            <Calendar
              className={['c1']}
              minDate={new Date()}
              tileDisabled={({ date }) =>
                date.getDay() === 0 || date.getDay() === 6
              }
              defaultValue={getNextWorkingDay()}
              onChange={(value, event) => {
                handleCalendarDates(value)
              }}
            />
            <TimeSlotList
              time={availableDates}
              state={selectedDate}
              setState={setSelectedDate}
            />
          </div>
        </div>
      </div>
      <button
        className="mb-1  self-center mt-3 w-40 h-[3rem] disabled:bg-primary-color disabled:cursor-not-allowed text-white border-none bg-important-color hover:bg-hover-important rounded-md cursor-pointer"
        disabled={!selectedDentist || !selectedDate}
        onClick={handleSubmit}
      >
        Book Appointment
      </button>
    </div>
  )
}

export default Book

import React, { useEffect, useState } from 'react'
import Dropdown from './Dropdown'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '../utils/axios-instance'
import { toast, ToastContainer } from 'react-toastify'

const complete_url = `http://localhost:3000/api/appointments/complete_appointment`
const url = `http://localhost:3000/api/appointments`
const equipment_url = 'http://localhost:3000/api/cabinets'
const CompleteAppointment = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [appointment, setAppointment] = useState(null)
  useEffect(() => {
    axiosInstance
      .get(`${url}/${id}`, {})
      .then(function (response) {
        setAppointment(response.data.appointment)
        axiosInstance
          .get(
            `${equipment_url}/${response.data.appointment.cabinet_id}/equipments`,
            {}
          )
          .then(function (r) {
            setEquipments(r.data.equipments)
          })
          .catch(function (error) {
            console.log(error.response)
          })
      })
      .catch(function (error) {
        console.log(error.response)
        if (error.response.data.errors[0] === 'Appointment does not exist')
          navigate('/profile')
      })
  }, [])

  if (appointment && appointment.status !== 'confirmed') navigate('/profile')
  const [currentEquipment, setCurrentEquipment] = useState([])
  const [qty, setQty] = useState(0)
  const [eqName, setEqName] = useState('')
  const [equipments, setEquipments] = useState([])

  const addEquipament = (eq) => {
    const selected_equipment = equipments.find(
      (element) => element.equipment === eqName
    )
    const eqx = { name: eqName, qty: qty, key: selected_equipment.id }
    if (currentEquipment.length === 0) setCurrentEquipment([eqx])
    let exists = false
    const q = currentEquipment.map((ce) => {
      if (ce.key === eqx.key) {
        ce.qty += qty
        exists = true
      }
      return ce
    })

    if (!exists) setCurrentEquipment([...currentEquipment, eqx])
    else setCurrentEquipment([...q])
  }
  const deleteEquipament = (index) => {
    console.log('deletin eq index', index)

    const newArray = currentEquipment.filter((eq, idx) => idx !== index)
    setCurrentEquipment(newArray)

    console.log('new Array')
    console.log(newArray)
  }
  const handleQuantityChange = (event) => {
    const selected_equipment = equipments.find(
      (element) => element.equipment === eqName
    )
    const q = selected_equipment ? selected_equipment.quantity : 0
    let quantity_used = currentEquipment.map((eq) => {
      if (eq.key === selected_equipment.id) return eq.qty
    })
    const value = Math.max(
      0,
      Math.min(q - quantity_used, Number(event.target.value))
    )
    setQty(value)
  }

  const handleSubmit = () => {
    const equipments = currentEquipment.map((eq) => {
      return {
        equipment_id: eq.key,
        quantity: eq.qty
      }
    })
    axiosInstance
      .post(`${complete_url}/${appointment.id}`, {
        equipments: equipments
      })
      .then(function (response) {
        toast.success('Appointment completed succesfully')
        console.log(response)
      })
      .catch(function (error) {
        toast.error(error.response.data.errors[0])
        console.log(error.response.data.errors[0])
      })
  }

  return (
    <div className="text-gray-700 md:w-3/5 lg:w-2/5 border p-2 lg:p-6 bg-teal-50 mx-auto rounded-lg m-3">
      <ToastContainer />
      <h1 className="text-xl p-3 mb-3 text-center">Complete appointment</h1>

      <div className=" border  rounded-lg px-2 py-4 lg:p-6  mx-auto bg-white mb-10 flex  items-center">
        {equipments ? (
          <>
            <Dropdown
              values={equipments.map((x) => x.equipment)}
              onChange={(event) =>
                setEqName(equipments[event.target.value].equipment)
              }
            />
            <div className="flex justify-center items-center p-1.5 ">
              <label htmlFor="qtyInput" className="mr-3">
                Qty:
              </label>
              <input
                type="number"
                id="qtyInput"
                className="border p-1.5 w-14 text-sm lg:w-40"
                value={qty}
                onChange={handleQuantityChange}
              />
            </div>
            <button
              className="bg-important-color text-white  py-1.5 px-3 ml-2 rounded-md font-semibold disabled:bg-primary-color"
              onClick={addEquipament}
              disabled={!eqName || !qty}
            >
              Add
            </button>
          </>
        ) : (
          ''
        )}
      </div>

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
        <div className="flex pt-3 text-sm justify-between">
          <div>Location</div>
          <div>{appointment ? appointment.location : ''}</div>
        </div>
      </div>

      {currentEquipment.length > 0 ? (
        <div className="border  rounded-lg p-6  mx-auto bg-white">
          <div className="flex justify-between border-b">
            <div className="pb-3 w-32">Items summary</div>
            <div className="pb-3 w-32">Qty</div>
            <div className="pb-3 ">Remove</div>
          </div>

          {currentEquipment.map((eq, index) => {
            return (
              <div
                className="flex border-b py-3 text-sm justify-between"
                key={index}
              >
                <div>{eq.name}</div>
                <div>{eq.qty}</div>
                <button
                  onClick={() => deleteEquipament(index)}
                  className="bg-red-500 text-white w-10 p-1.5 ml-6 rounded-md font-semibold"
                >
                  X
                </button>
              </div>
            )
          })}
        </div>
      ) : null}
      <button
        className="block mx-auto bg-important-color text-white  py-1.5 px-3 mt-10 text-center rounded-md font-semibold disabled:bg-primary-color"
        onClick={handleSubmit}
        disabled={currentEquipment.length === 0}
      >
        Complete
      </button>
    </div>
  )
}

export default CompleteAppointment

import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import Table from '../components/Table'
import axiosInstance from '../utils/axios-instance'

const url = 'http://localhost:3000/api/appointments'
const confirm_url = 'http://localhost:3000/api/appointments/confirm_appointment'

const TABLE_HEADINGS = [
  'Date',
  'Dentist',
  'Patient',
  'Assistant',
  'Status',
  'Details'
]
const Appointmentstable = () => {
  const [appointments, setAppointments] = useState([])
  console.log('X')
  const handleChange = (event, id, data) => {
    const newData = [...appointments]
    data.assistant = data.assistant[event.target.value]
    var result = newData.map((obj) => {
      if (obj.id === data.id) return (obj = data)
      else return obj
    })
    axiosInstance
      .post(`${confirm_url}/${data.id}/assistant/${data.assistant.id}`, {})
      .then(function (response) {
        toast.success('Appointment confirmed succesfully')
        setAppointments(response.data.appointments)
      })
      .catch(function (error) {
        console.log(error.response)
      })
    // const selectedAssistent = selectedRow.assistant[event.target.value]
    // console.log('selected assistant', selectedAssistent)
    // if (selectedRow.status === 'canceled') {
    //   newData[id].status = 'confirmed'
    // }
    // newData[id].assistant = selectedAssistent.id
    // setAppointmentsData(newData)
    // console.log(appointmentsData[id])
  }
  useEffect(() => {
    axiosInstance
      .get(url, {})
      .then(function (response) {
        setAppointments(response.data.appointments)
      })
      .catch(function (error) {
        console.log(error.response)
      })
  }, [])
  console.log(appointments)
  return (
    <>
      <ToastContainer />
      <Table
        tableData={appointments}
        tableHeadings={TABLE_HEADINGS}
        searchFields={['patient', 'dentist']}
        filterBy={['status']}
        filterFields={[
          'Any',
          'Canceled',
          'Requested',
          'Confirmed',
          'Completed'
        ]}
        type={'APPOINTMENT'}
        onChange={handleChange}
      />
    </>
  )
}

export default Appointmentstable

import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import axiosInstance from '../utils/axios-instance'
import computeStatsArray from '../utils/computeStatsArrays'
import Status from '../components/Status'
import StatusExtrapolation from '../components/StatusExtrapolation'

const cabinet_url = 'http://localhost:3000/api/cabinets'
const url = `http://localhost:3000/api/statistics/user_appointments_stats`
const eqp_url = `http://localhost:3000/api/statistics/equipments_used`
const all_eqp_url = 'http://localhost:3000/api/statistics/equipments'
const all = 'http://localhost:3000/api/statistics/all_used_equipments'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right'
    },
    title: {
      display: true,
      text: 'Equipment usage',
      position: 'left'
    }
  }
}

const Admin = () => {
  const [cabinets, setCabinets] = useState([])
  const [cabinet, setCabinet] = useState(null)
  const [time, setTime] = useState('week')
  const [equipments, setEquipments] = useState([])
  const [equipment, setEquipment] = useState(null)
  const [number_stats, setNumberStats] = useState(null)
  const [equipment_stats, setEquipmentStats] = useState(null)
  const [statToShow, setStatToShow] = useState(null)
  const [labels, setLabels] = useState([
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday'
  ])

  useEffect(() => {
    axiosInstance
      .get(cabinet_url, {})
      .then(function (response) {
        setCabinets(response.data.cabinets)
      })
      .catch(function (error) {
        console.log(error.response)
      })
  }, [])

  useEffect(() => {
    axiosInstance
      .get(all_eqp_url, {})
      .then(function (response) {
        setEquipments(response.data.equipments)
      })
      .catch(function (error) {
        console.log(error.response)
      })
  }, [])

  useEffect(() => {
    axiosInstance
      .get(url, {})
      .then(function (response) {
        setNumberStats(response.data.stats)
      })
      .catch(function (error) {
        console.log(error.response)
      })
  }, [])

  useEffect(() => {
    axiosInstance
      .get(cabinet_url, {})
      .then(function (response) {
        setCabinets(response.data.cabinets)
      })
      .catch(function (error) {
        console.log(error.response)
      })
  }, [])

  useEffect(() => {
    axiosInstance
      .get(cabinet_url, {})
      .then(function (response) {
        setCabinets(response.data.cabinets)
      })
      .catch(function (error) {
        console.log(error.response)
      })
  }, [])

  useEffect(() => {
    axiosInstance
      .get(all, {})
      .then(function (response) {
        setEquipmentStats(response.data.data)
      })
      .catch(function (error) {
        console.log(error.response)
      })
  }, [])

  const cabs =
    cabinets.length > 0
      ? cabinets.map((cabinet, index) => (
          <option key={index} value={index}>
            {cabinet.name}
          </option>
        ))
      : []

  const eqps =
    equipments.length > 0
      ? equipments.map((eq, index) => (
          <option key={index} value={index}>
            {eq.name}
          </option>
        ))
      : []

  const changeCabinet = (e) => {
    setCabinet(cabinets[e.target.value])
  }

  const changeEquipment = (e) => {
    setEquipment(equipments[e.target.value])
  }

  useEffect(() => {
    if (equipment_stats)
      if (cabinet) {
        setStatToShow(equipment_stats[`cabinet${cabinet.id}`][time])
      } else {
        setStatToShow(equipment_stats['all'][time])
      }
  }, [cabinet, equipment_stats, time, equipment, statToShow])

  const changeTime = (e) => {
    if (e.target.value === 'week') {
      setTime('week')
    } else {
      setTime('year')
    }
  }

  useEffect(() => {
    if (time === 'week')
      setLabels(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'])
    else
      setLabels([
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November'
      ])
  }, [time])

  const displayedData = statToShow
    ? computeStatsArray(statToShow, equipment)
    : []
  const data = {
    labels: labels,
    datasets: !equipment
      ? [
          {
            label: 'Materials',
            data: displayedData[0],
            backgroundColor: '#73D8CE'
          },
          {
            label: 'Instruments',
            data: displayedData[1],
            backgroundColor: '#133C55'
          }
        ]
      : [
          {
            label: 'Equipment',
            data: displayedData,
            backgroundColor: '#133C55'
          }
        ]
  }
  return (
    <div className="block md:flex md:flex-col mx-auto w-3/4 mt-10 text-slate-600">
      <h1 className="text-3xl mb-5 text-center">Admin center</h1>
      <div className="md:flex md: flex-row justify-center items-center">
        <div className="flex flex-col bg-teal-200 p-6 text-gray bg-gradient-to-r from-teal-500 to-teal-700 text-white md:m-20 rounded-md">
          <a
            href="/users"
            className="text-2xl mb-2 border block rounded-md text-center py-1 px-3 mx-auto hover:bg-important-color hover:border-important-color"
          >
            Users
          </a>
          <div className="md:flex md:flex-row  items-center">
            <div className="flex md:mr-6 -mr-2 border-y p-1">
              <p className="mr-2">Today</p>
              <p>{number_stats ? number_stats.today_users : 0}</p>
            </div>
            <div className="flex md:mr-6 border-y p-1">
              <p className=" mr-2">Week</p>
              <p>{number_stats ? number_stats.week_users : 0}</p>
            </div>
            <div className="flex md:mr-6 border-y p-1">
              <p className=" mr-2">Month</p>
              <p>{number_stats ? number_stats.month_users : 0}</p>
            </div>
            <div className="flex border-y p-1">
              <p className=" mr-2">All-time</p>
              <p>{number_stats ? number_stats.all_time_users : 0}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-teal-200 p-6 text-gray bg-gradient-to-r from-teal-500 to-teal-700 text-white md:m-20 my-10 rounded-md">
          <a
            href="/appointments"
            className="text-2xl mb-2 border block rounded-md text-center py-1 px-3 mx-auto hover:bg-important-color hover:border-important-color"
          >
            Appointments
          </a>

          <div className="md:flex md:flex-row  items-center">
            <div className="flex mr-6 border-y p-1">
              <p className="mr-2">Today</p>
              <p>{number_stats ? number_stats.today_appointments : 0}</p>
            </div>
            <div className="flex mr-6 border-y p-1">
              <p className=" mr-2">Week</p>
              <p>{number_stats ? number_stats.week_appointments : 0}</p>
            </div>
            <div className="flex mr-6 border-y p-1">
              <p className=" mr-2">Month</p>
              <p>{number_stats ? number_stats.month_appointments : 0}</p>
            </div>
            <div className="flex border-y p-1">
              <p className=" mr-2">All-time</p>
              <p>{number_stats ? number_stats.all_time_appointments : 0}</p>
            </div>
          </div>
        </div>
      </div>
      <p className="flex  justify-center text-lg font-bold">
        Equipment statistics
      </p>
      <Status />
      <p className="flex  justify-center text-lg font-bold pt-[8rem]">
        Equipment predictions
      </p>
      <StatusExtrapolation />
      {/* <div className="mt-10 w-1/2 mx-auto relative border-2 rounded-md p-1.5">
        <Bar options={options} data={data} />
        <div className="absolute top-1.5 right-1.5">
          {cabinets ? (
            <select
              name="cars"
              id="cars"
              className="rounded-md text-sm border"
              onChange={changeCabinet}
            >
              <option>All</option>
              {cabs}
            </select>
          ) : (
            ''
          )}

          <select
            name="cars"
            id="cars"
            className="rounded-md  mr-2 text-sm border"
            onChange={changeEquipment}
          >
            <option>All</option>
            {eqps}
          </select>

          <select
            name="cars"
            id="cars"
            className="rounded-md   text-sm border"
            onChange={changeTime}
          >
            <option value="week">This week</option>
            <option value="year">This year</option>
          </select>
        </div>
      </div> */}
    </div>
  )
}

export default Admin

import React from 'react'
import { useEffect, useState } from 'react'
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
import { ClipLoader } from 'react-spinners'

const cabinet_url = 'https://api-sdent.herokuapp.com/api/cabinets'
const url = `https://api-sdent.herokuapp.com/api/statistics/user_appointments_stats`
const eqp_url = `https://api-sdent.herokuapp.com/api/statistics/equipments_used`
const all_eqp_url = 'https://api-sdent.herokuapp.com/api/statistics/equipments'
const all = 'https://api-sdent.herokuapp.com/api/statistics/all_used_equipments'

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

const Status = () => {
  const [cabinets, setCabinets] = useState([])
  const [cabinet, setCabinet] = useState(null)
  const [time, setTime] = useState('week')
  const [equipments, setEquipments] = useState([])
  const [equipment, setEquipment] = useState(null)
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
            data: displayedData[1],
            backgroundColor: '#73D8CE'
          },
          {
            label: 'Instruments',
            data: displayedData[0],
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
    <div className="md:mt-10 md:w-1/2 flex justify-center mx-auto relative border-2 rounded-md p-1.5">
      {equipment_stats === null ? 
            <ClipLoader  loading={true} size={150} />
      :<>
      <Bar options={options} data={data} />
      <div className="absolute md:top-1.5 md:right-1.5 top-[10rem]">
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
      </>}
    </div>
  )
}

export default Status

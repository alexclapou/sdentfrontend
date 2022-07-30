import React from 'react'
import { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineController,
  LineElement
} from 'chart.js'
import axiosInstance from '../utils/axios-instance'
import computeStatsArray from '../utils/computeStatsArrays'
import { Line } from 'react-chartjs-2'
import getPrevNextMonths from '../utils/getPrevNextMonths'
import computeStatsPred from '../utils/computeStatsPred'
import computeDataForPrediction from '../utils/computeDataForPrediction'
import { ClipLoader } from 'react-spinners'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineController,
  LineElement
)

const cabinet_url = 'http://localhost:3000/api/cabinets'
const url = `http://localhost:3000/api/statistics/user_appointments_stats`
const eqp_url = `http://localhost:3000/api/statistics/equipments_used`
const all_eqp_url = 'http://localhost:3000/api/statistics/equipments'
const all = 'http://localhost:3000/api/statistics/all_used_equipments'

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right'
    },
    title: {
      display: true,
      text: 'Equipment prediction',
      position: 'left'
    }
  }
}

const StatusExtrapolation = () => {
  var linear = require('everpolate').linear
  const [cabinets, setCabinets] = useState([])
  const [cabinet, setCabinet] = useState(null)
  const [time, setTime] = useState('year')
  const [equipments, setEquipments] = useState([])
  const [equipment, setEquipment] = useState(null)
  const [equipment_stats, setEquipmentStats] = useState(null)
  const [statToShow, setStatToShow] = useState(null)
  const [labels, setLabels] = useState(getPrevNextMonths())
  const [predictions, setPredictions] = useState(0)

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

  const displayedData = statToShow
    ? computeStatsPred(statToShow, equipment)
    : new Array(new Date().getMonth() + 1).fill(0)
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
          },
          {
            label: 'Material Prediction',
            data: computeDataForPrediction(
              linear(
                [6, 7, 8, 9, 10, 11],
                Array.from(Array(6).keys()),
                displayedData[1]
              )
            ),
            backgroundColor: '#73D8CE',
            borderDash: [10, 5]
          },
          {
            label: 'Instruments Prediction',
            data: computeDataForPrediction(
              linear(
                [6, 7, 8, 9, 10, 11],
                Array.from(Array(6).keys()),
                displayedData[0]
              )
            ),
            backgroundColor: '#133C55',
            borderDash: [10, 5]
          }
        ]
      : [
          {
            label: 'Equipment',
            data: displayedData,
            backgroundColor: '#133C55'
          },
          {
            label: 'Equipment Prediction',
            data: computeDataForPrediction(
              linear(
                [6, 7, 8, 9, 10, 11],
                Array.from(Array(6).keys()),
                displayedData
              )
            ),
            backgroundColor: '#133C55',
            borderDash: [10, 5]
          }
        ]
  }

  console.log(displayedData)
  return (
    <div className="md:mt-10 md:w-1/2 md:pb-0 mb-10 mx-auto relative border-2 rounded-md p-1.5 flex justify-center">
      {equipment_stats === null ? 
            <ClipLoader  loading={true} size={150} />
      :<>
      <Line data={data} options={options} />
      <div className="absolute md:top-1.5 md:right-1.5 top-[10rem] mb-10">
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

        <select name="cars" id="cars" className="rounded-md   text-sm border">
          <option value="year">This year</option>
        </select>
      </div>) </>}
    </div>
  )
}

export default StatusExtrapolation

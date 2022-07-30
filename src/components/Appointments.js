import React, { useEffect, useState } from 'react'
import Appointment from './Appointment'
import ReactPaginate from 'react-paginate'
import axiosInstance from '../utils/axios-instance'
import { Link } from 'react-router-dom'
import { GrPrevious } from 'react-icons/gr'

const url = 'http://localhost:3000/api/users/user_appointments'

export default function Appointments(user) {
  const [items, setItems] = useState([])
  const [currentItems, setCurrentItems] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)

  useEffect(() => {
    const endOffset = itemOffset + 3
    setCurrentItems(items.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(items.length / 3))
  }, [itemOffset, items])

  useEffect(() => {
    axiosInstance
      .get(`${url}/${user.id}`, {})
      .then(function (response) {
        setItems(response.data.appointments)
      })
      .catch(function (error) {
        console.log(error.response)
      })
  }, [])

  const appointments =
    currentItems.length > 0
      ? currentItems.map((appointment, index) => (
          <Appointment key={index} appointment={appointment} />
        ))
      : []
  const handlePageClick = (event) => {
    const newOffset = (event.selected * 3) % items.length
    setItemOffset(newOffset)
  }
  return (
    <div className="lg:shadow-xl lg:p-10 lg:mt-0 mt-4 h-100 rounded-xl text-center flex flex-col justify-between mx-auto w-10/12 sm:w-3/5 lg:w-3/5">
      <h1 className="block text-4xl font-semibold">Appointments</h1>
      <div className=" flex flex-col justify-center  mb-10">
        {items.length === 0 ? (
          <div>
            <p>You have no appointments at the moment.</p>
            <Link to="/book">
              <button className="-mb-[20px] mt-[20px] w-40 h-[3rem] text-white border-none bg-important-color hover:bg-hover-important rounded-md cursor-pointer">
                Book now
              </button>
            </Link>
          </div>
        ) : (
          <>
            {appointments}
            <ReactPaginate
              containerClassName=" flex justify-center align-center p-2 "
              pageClassName="flex text-sm border mx-4 py-2 px-4 bg-blue-500 text-white hover:cursor-pointer"
              breakLabel="..."
              previousLabel={false}
              nextLabel={false}
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              onClick={() => console.log('ASD')}
              pageCount={pageCount}
              renderOnZeroPageCount={null}
              activeClassName={'bg-[#133C55]'}
            />
          </>
        )}
      </div>
    </div>
  )
}

import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import React, { Fragment } from 'react'
import axiosInstance from '../utils/axios-instance'
const url = 'https://api-sdent.herokuapp.com/api/appointments/cancel_appointment'

function CancelModal({ setOpen, appointmentId, toast }) {
  const handleCancel = () => {
    setOpen(false)
    axiosInstance
      .post(`${url}/${appointmentId}`, {}, { withCredentials: true })
      .then(function (response) {
        window.location.reload()
      })
      .catch(function (error) {
        toast()
        console.log(error.response.data)
      })
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div
          className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block
           sm:p-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

          <span
            className="inline-block align-middle sm:h-screen"
            aria-hidden="true"
          ></span>

          <div
            className="inline-block align-bottom bg-white rounded-lg
                 text-left 
              overflow-hidden shadow-xl 
              transform transition-all 
              sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div
                  className="mx-auto flex-shrink-0 flex items-center
                     justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0
                      sm:h-10 sm:w-10"
                >
                  <ExclamationIcon
                    className="h-6 w-6 text-red-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Cancel Appointment
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to cancel this appointment? The
                      appointment will not be deleted but will be marked as
                      canceled. This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md
                     border border-transparent shadow-sm px-4 py-2 bg-red-600
                      text-base font-medium text-white hover:bg-red-700 
                        sm:ml-3 sm:w-auto sm:text-sm"
                onClick={handleCancel}
              >
                Cancel appointment
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center
                    rounded-md border border-gray-300 shadow-sm px-4 py-2
                     bg-white text-base font-medium text-gray-700
                        sm:mt-0
                        sm:ml-3 sm:w-auto sm:text-sm"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default CancelModal

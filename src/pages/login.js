import logo from '../assets/white-logo.png'
import green_logo from '../assets/green-logo.png'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

const url = 'http://localhost:3000/auth/login'

export default function Login({ setUser }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState(false)
  const validationSchema = Yup.object().shape({
    email: Yup.string().required(),
    password: Yup.string().required()
  })
  const formOptions = {
    mode: 'all',
    reValidateMode: 'all',
    resolver: yupResolver(validationSchema)
  }
  const { register, handleSubmit, formState } = useForm(formOptions)
  //   const { errors } = formState
  const onSubmit = () => {
    axios
      .post(
        url,
        {
          user: {
            email: email,
            password: password
          }
        },
        { withCredentials: true }
      )
      .then(function (response) {
        const token = response.data.jwt
        localStorage.setItem('jwt', token)
        setUser(jwt_decode(token))
        navigate('/profile')
      })
      .catch(function (error) {
        console.log(error.response)
        setLoginError(true)
      })
  }
  return (
    <>
      <svg
        className="invisible sm:visible absolute -z-10 2xl:top-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#73D8CE"
          fillOpacity="10000000"
          d="M0,256L60,266.7C120,277,240,299,360,309.3C480,320,600,320,720,293.3C840,267,960,213,1080,202.7C1200,192,1320,224,1380,240L1440,256L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        ></path>
      </svg>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md flex-row text-center content-center w-full space-y-8">
          <div className="text-center">
            <div className="xl:hidden flex justify-center">
              <img
                className="content-center w-[125px] h-[125px]"
                src={green_logo}
                alt="logo"
              />
            </div>
            <div className="relative hidden sm:flex justify-center items-center text-center">
              <img
                className="content-center w-[125px] h-[125px]"
                src={logo}
                alt="logo"
              />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-700">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-500">
              Or{' '}
              <Link
                to="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                create a new account
              </Link>
            </p>
          </div>
          {loginError ? (
            <div className="relative p-4  bg-red-400 rounded-md flex">
              <p className="ml-3  text-sm font-medium  text-white">
                Incorect email or password.
              </p>
              <button
                type="button"
                className="ml-auto -mx-1.5 -my-1.5  text-red-600 rounded-md p-1.5  inline-flex h-8 w-8 dark:hover:text-red-800"
                data-dismiss-target="#alert-1"
                aria-label="Close"
                onClick={(e) => {
                  setLoginError(false)
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          ) : (
            ''
          )}

          <form
            className={`${loginError ? '' : 'py-2'}
            mt-4 space-y-6`}
            action="#"
            method="POST"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className=" rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  autoComplete="email"
                  className="appearance-none  mb-4 relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:border-important-color focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  {...register('email', {
                    onChange: (e) => {
                      setEmail(e.target.value)
                    },
                    onBlur: (e) => {
                      setEmail(e.target.value)
                    }
                  })}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  type="password"
                  autoComplete="current-password"
                  className="appearance-none  relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:border-important-color focus:outline-none focus:z-10 sm:text-sm"
                  placeholder="Password"
                  {...register('password', {
                    onChange: (e) => {
                      setPassword(e.target.value)
                    },
                    onBlur: (e) => {
                      setPassword(e.target.value)
                    }
                  })}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={!formState.isValid}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-important-color focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-color 
                        disabled:bg-primary-color disabled:cursor-not-allowed cursor-pointer"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

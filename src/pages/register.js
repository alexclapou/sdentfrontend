import logo from '../assets/white-logo.png'
import green_logo from '../assets/green-logo.png'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
const url = 'http://localhost:3000/auth/register'

export default function Register() {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('First Name is required')
      .min(2, 'First name must be at least 2 characters'),
    lastName: Yup.string()
      .required('Last name is required')
      .min(2, 'Last name must be at least 2 characters'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required')
  })
  const formOptions = {
    mode: 'all',
    reValidateMode: 'all',
    resolver: yupResolver(validationSchema)
  }
  const { register, handleSubmit, formState } = useForm(formOptions)
  const { errors } = formState

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmed, setPasswordConfirmed] = useState('')
  const [signupMessage, setSignupMessage] = useState(false)
  const [signupSuccess, setSignupSuccess] = useState(false)

  const onSubmit = (data) => {
    axios
      .post(url, {
        user: {
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
          password_confirmation: passwordConfirmed
        }
      })
      .then(function (response) {
        setSignupSuccess(true)
        setSignupMessage(true)
      })
      .catch(function (error) {
        setSignupMessage(true)
        setSignupSuccess(false)
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
        <div className="max-w-md flex-row  content-center w-full space-y-8">
          <div className="text-center">
            <div className="sm:hidden flex justify-center">
              <img
                className="content-center w-32 h-32"
                alt="logo"
                src={green_logo}
              />
            </div>
            <div className="hidden sm:flex justify-center">
              <img className="content-center w-32 h-32" alt="logo" src={logo} />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-700">
              Create a new account account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-500">
              Or if you already have an account{' '}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                sign in
              </Link>
            </p>
          </div>
          {signupMessage ? (
            <div
              className={`${
                signupSuccess
                  ? 'bg-primary-color border border-white'
                  : 'bg-red-400'
              }
              relative
              p-4
              rounded-md
              flex
              `}
            >
              {!signupSuccess ? (
                <p className="ml-3  text-sm font-medium  text-white">
                  Email already exists
                </p>
              ) : (
                <div>
                  <p className="ml-3  text-sm font-medium  text-white">
                    Registration succesful. Please confirm your account
                  </p>
                </div>
              )}
              <button
                type="button"
                className={`${
                  signupSuccess
                    ? 'text-white hover:text-gray-200'
                    : 'text-red-600 hover:text-red-800'
                } ml-auto -mx-1.5 -my-1.5   rounded-md p-1.5  inline-flex h-8 w-8`}
                data-dismiss-target="#alert-1"
                aria-label="Close"
                onClick={(e) => {
                  setSignupMessage(false)
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
            className={`${signupMessage ? '' : 'py-2'}
            mt-8 space-y-6 border-none outline-none`}
            onSubmit={handleSubmit(onSubmit)}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className=" rounded-md shadow-sm -space-y-px">
              <div className="sm:flex sm:space-x-6">
                <div className="w-full">
                  <input
                    className={`${
                      errors.firstName
                        ? 'border border-red-600'
                        : 'mb-4 focus:border-important-color'
                    }
                    appearance-none  mr-2 relative block w-full px-3 py-4 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none  focus:z-10 sm:text-sm`}
                    placeholder="First name"
                    {...register('firstName', {
                      onChange: (e) => {
                        setFirstName(e.target.value)
                      },
                      onBlur: (e) => {
                        setFirstName(e.target.value)
                      }
                    })}
                  />
                  {errors.firstName ? (
                    <span className="relative text-red-600 text-sm">
                      {errors.firstName?.message}
                    </span>
                  ) : (
                    ''
                  )}
                </div>
                <div className="w-full border-none">
                  <input
                    className={`
                    ${
                      errors.lastName
                        ? 'border border-red-600'
                        : 'mb-4 focus:border-important-color'
                    }
                    appearance-none relative  block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none  focus:z-10 sm:text-sm`}
                    placeholder="Last name"
                    {...register('lastName', {
                      onChange: (e) => {
                        setLastName(e.target.value)
                      },
                      onBlur: (e) => {
                        setLastName(e.target.value)
                      }
                    })}
                  />
                  {errors.lastName ? (
                    <span className="relative text-red-600 text-sm">
                      {errors.lastName?.message}
                    </span>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <div className="w-full ">
                <input
                  autoComplete="email"
                  type="email"
                  className={`
                    ${
                      errors.email
                        ? 'border border-red-600'
                        : 'mb-4 focus:border-important-color'
                    }
                    appearance-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none  focus:z-10 sm:text-sm`}
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
                {errors.email ? (
                  <span className="relative text-red-600 text-sm">
                    {errors.email?.message}
                  </span>
                ) : (
                  ''
                )}
              </div>
              <div>
                <input
                  type="password"
                  className={`
                  ${
                    errors.password
                      ? 'border border-red-600'
                      : 'mb-4 focus:border-important-color'
                  }
                  appearance-none  relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none  focus:z-10 sm:text-sm`}
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
                {errors.password ? (
                  <span className="relative text-red-600 text-sm">
                    {errors.password?.message}
                  </span>
                ) : (
                  ''
                )}
              </div>
              <div>
                <input
                  type="password"
                  className={`
                  ${
                    errors.lastName
                      ? 'border border-red-600'
                      : ' focus:border-important-color'
                  }
                  appearance-none relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md  focus:outline-none focus:z-10 sm:text-sm`}
                  placeholder="Confirm Password"
                  {...register('passwordConfirmation', {
                    onChange: (e) => {
                      setPasswordConfirmed(e.target.value)
                    },
                    onBlur: (e) => {
                      setPasswordConfirmed(e.target.value)
                    }
                  })}
                />
                {errors.passwordConfirmation ? (
                  <span className="relative text-red-600 text-sm">
                    {errors.passwordConfirmation?.message}
                  </span>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={!formState.isValid}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-important-color focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-color
                          disabled:bg-primary-color disabled:cursor-not-allowed"
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

/* This example requires Tailwind CSS v2.0+ */
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import logo from '../assets/logo-white.png'
import userLogo from '../assets/user.png'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import axiosInstance from '../utils/axios-instance'
import {
  CogIcon,
  UserIcon,
  LogoutIcon,
  ShieldExclamationIcon
} from '@heroicons/react/outline'
import { useState } from 'react'

const navigation = [
  { name: 'Services', href: '/services' },
  { name: 'Team', href: '/team' },
  { name: 'About', href: '/about' }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar({ user, setUser }) {
  const [userName, setUserName] = useState(
    user.first_name + ' ' + user.last_name
  )
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    axiosInstance
      .post('/auth/logout', {}, { withCredentials: true })
      .then(function (response) {
        localStorage.removeItem('jwt')
        localStorage.removeItem('remember')
        setUser('')
        navigate(`/`)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  const handleClick = () => {
    console.log('X')
    axiosInstance
      .get(
        `http://localhost:3000/api/users/current_user_name/${user.id}`,
        {},
        { withCredentials: true }
      )
      .then(function (response) {
        console.log('AICI')
        setUserName(response.data.name)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  return (
    <>
      <Disclosure as="nav" className="bg-primary-color sm:py-3 z-50">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto  sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="px-2 absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-white bg-important-color">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-1 flex items-center justify-center sm:items-center sm:justify-start">
                  <div className="flex items-center ">
                    <Link to="/" className=" flex">
                      <img height={68} width={68} src={logo} alt="logo" />
                    </Link>
                  </div>
                  <div className="hidden sm:block sm:ml-6 ">
                    <div className="flex space-x-4 ">
                      {navigation.map((item) => (
                        <Link
                          to={`${item.href}`}
                          key={item.name}
                          className={classNames(
                            item.href === location.pathname
                              ? 'bg-important-color '
                              : ' hover:bg-dropdown-color hover:bg-secondary-color',
                            'px-3 py-2 rounded-md text-sm font-sm text-white'
                          )}
                          aria-current={
                            item.href === location.pathname ? 'page' : undefined
                          }
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <Link
                  to="/book"
                  className="bg-important-color text-center text-white sm:px-3 hover:bg-hover-important py-4 sm:py-2 absolute sm:static sm:w-auto top-16 w-full sm:rounded-md  sm:mr-5  text-sm font-medium"
                >
                  Book Appointment
                </Link>
                <div className="absolute inset-y-0 right-0 flex items-center sm:mr-0 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {user ? (
                    <Menu as="div" className="ml-3 relative z-10">
                      <div>
                        <Menu.Button className="bg-secondary-color flex text-sm rounded-full">
                          <span className="sr-only">Open user menu</span>
                          <img
                            onClick={handleClick}
                            className="h-[2.75rem] w-[2.75rem] rounded-full"
                            src={userLogo}
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-0 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-95 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-0 opacity-0"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 sm:rounded-md shadow-lg  bg-primary-color ring-1 ring-black ring-opacity-10 focus:outline-none">
                          <div className="py-2 px-4">
                            <span className="block text-sm text-important-color">
                              {userName}
                            </span>
                          </div>
                          <hr className=" sm:mx-auto border-white pb-2" />

                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/profile"
                                className={classNames(
                                  active ? 'bg-secondary-color text-white' : '',
                                  'block px-4 py-2 text-sm  text-white hover:bg-secondary-color'
                                )}
                              >
                                <UserIcon
                                  className="mr-2 h-5 w-5 inline"
                                  aria-hidden="true"
                                />
                                Profile
                              </Link>
                            )}
                          </Menu.Item>

                          {user.role === 'dentist' ||
                          user.role === 'assistant' ||
                          user.role === 'admin' ? (
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/admin"
                                  className={classNames(
                                    active
                                      ? 'bg-secondary-color text-white'
                                      : '',
                                    'block px-4 py-2 text-sm  text-white hover:bg-secondary-color'
                                  )}
                                >
                                  <ShieldExclamationIcon
                                    className="mr-2 h-5 w-5 inline"
                                    aria-hidden="true"
                                  />
                                  Admin center
                                </Link>
                              )}
                            </Menu.Item>
                          ) : (
                            ''
                          )}

                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/settings"
                                className={classNames(
                                  active ? 'bg-secondary-color text-white' : '',
                                  'block px-4 py-2 text-sm  text-white hover:bg-secondary-color'
                                )}
                              >
                                <CogIcon
                                  className="mr-2 h-5 w-5 inline "
                                  aria-hidden="true"
                                />
                                Settings
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                to="/"
                                className={classNames(
                                  active ? 'bg-secondary-color text-white' : '',
                                  'block px-4 py-2 text-sm  text-white hover:bg-secondary-color rounded-b-md'
                                )}
                                onClick={handleLogout}
                              >
                                <LogoutIcon
                                  className="mr-2 h-5 w-5 inline"
                                  aria-hidden="true"
                                />
                                Sign out
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : (
                    <Link
                      to="/login"
                      className="bg-important-color sm:bg-primary-color hover:bg-secondary-color sm:hover:border-secondary-color
                              px-3 py-2 rounded-md text-sm font-medium text-white border-solid border-2 border-important-color sm:border-white"
                    >
                      Sign in
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <Disclosure.Panel className="sm:hidden top-8 relative -mb-8 ">
              <div className="pt-6 pb-8 space-y-1 w-full ">
                {navigation.map((item) => (
                  <Link
                    to={`${item.href}`}
                    key={item.name}
                    className={classNames(
                      item.href === location.pathname
                        ? 'bg-important-color'
                        : 'hover:bg-dropdown-color hover:bg-secondary-color',
                      'block px-3 py-2  text-base bg-primary-color font-medium text-white text-center'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  )
}

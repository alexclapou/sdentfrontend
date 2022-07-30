import React from 'react';
import { Link } from 'react-router-dom';
import cabinetPicture from '../assets/inside.jpeg';

function About() {
  return (
    <div className='bg-gradient-to-r from-teal-500 to-teal-700 p-10'>
      <h2 className='p-3 text-xl lg:text-2xl text-slate-100  text-center'>
        Get to know us
      </h2>
      <h1 className='p-3 text-3xl lg:text-5xl text-slate-100 text-center'>
        Hi, we're SmileDent
      </h1>

      <div className='lg:flex justify-center p-10'>
        <div className='mx-auto lg:w-1/3 mb-3'>
          <img src={cabinetPicture} alt='' />
        </div>

        <div className='relative bg-primary-rgba lg:w-1/3 px-10 py-3 mx-auto rounded-lg flex flex-col justify-center'>
          <div className='text-2xl lg:text-4xl font-semibold text-slate-100 leading-none'>
            Special Peolple For Special Smiles
          </div>
          <div className='mt-3 text-xl font-light text-slate-100 antialiased'>
            Dental done differently.
          </div>
          <Link to='/book'>
            <button className='mb-1 mt-3 w-40 h-[3rem] text-slate-100 border-none bg-important-color hover:bg-hover-important rounded-lg cursor-pointer'>
              Book Appointment
            </button>
          </Link>
          <p className='mt-1 text-xs text-slate-100 font-light'>
            OR CALL:{' '}
            <a
              href='tel:+62896706255135'
              className='no-underline text-slate-100 font-medium hover:text-important-color'
            >
              +40 755 353 435
            </a>
          </p>{' '}
        </div>
      </div>

      <div className='bg-primary-rgba lg:w-1/3 mx-auto rounded-lg flex flex-col items-center p-3'>
        <p className='text-slate-100 p-3 text-4xl text-slate-100  text-center'>
          Meet Our Team
        </p>
        <p className='mx-auto p-3 text-slate-100  text-center'>
          Our people set us apart. We’re passionate, dedicated, and friendly. Oh
          yeah, and we’re great at what we do!
        </p>
        <Link to='/team'>
          <button className='py-3 px-5 text-slate-100 border-b-2 border-important-color cursor-pointer hover:bg-teal-600 rounded-lg'>
            Our Team
          </button>
        </Link>
      </div>
    </div>
  );
}

export default About;

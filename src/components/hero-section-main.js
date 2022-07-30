import { Link } from 'react-router-dom'

export default function BookAppointmentHero() {
  return (
    <div>
      <div className="relative overflow-hidden h-screen bg-hero-main bg-center bg-cover ">
        <div className="relative z-10 w-full h-full bg-black-rgba">
          <div className="relative top-[20%] sm:top-60 px-[17%] 2xl:top-[25%] 2xl:px-[20%]">
            <div className="relative bg-primary-rgba sm:w-[35rem] px-10 py-5 rounded-md">
              <div className="text-5xl font-semibold text-white leading-none">
                Meet your new dentist
              </div>
              <div className="mt-3 text-xl font-light text-white antialiased">
                Dental done differently.
              </div>
              <Link to="/book">
                <button className="mb-1 mt-3 w-40 h-[3rem] text-white border-none bg-important-color hover:bg-hover-important rounded-md cursor-pointer">
                  Book Appointment
                </button>
              </Link>
              <p className="mt-1 text-xs text-white font-light">
                OR CALL:{' '}
                <a
                  href="tel:+62896706255135"
                  className="no-underline text-white font-medium hover:text-important-color"
                >
                  +40 755 353 435
                </a>
              </p>{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

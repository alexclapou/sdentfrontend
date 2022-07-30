import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import clinic from '../assets/clinic.jpg'
import cr from '../assets/crs.jpeg'
import inside from '../assets/inside.jpeg'
import office from '../assets/office.jpeg'

export default function Carousel() {
  return (
    <>
      <Swiper
        centeredSlides={true}
        slidesPerView={'auto'}
        breakpoints={{
          0: {
            spaceBetween: -30
          },
          740: {
            spaceBetween: -100
          }
        }}
        loop={true}
        autoHeight={true}
        pagination={{
          clickable: true
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="relative max-h-[25%] overflow-hidden "
      >
        <SwiperSlide className="block px-6 sm:px-20 sm:-mt-20 2xl:-mt-80">
          <img src={office} alt="office" />
        </SwiperSlide>
        <SwiperSlide className="px-6 block sm:px-20 2xl:-mt-20">
          <img quality={100} src={cr} alt="cr" />
        </SwiperSlide>
        <SwiperSlide className="px-6 sm:px-20 2xl:-mt-40">
          <img quality={100} src={clinic} alt="clinic" />
        </SwiperSlide>
        <SwiperSlide className="px-6 sm:px-20 sm:-mt-20 xl:-mt-40 ">
          <img quality={100} src={inside} alt="inside" />
        </SwiperSlide>
      </Swiper>
    </>
  )
}

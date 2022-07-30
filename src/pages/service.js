import illustration from '../assets/illustration.jpg';

const ServiceCard = ({serviceDescription, serviceName}) => {
  return (
    <div className='bg-white h-96 w-60 rounded-2xl text-teal-800 flex flex-col items-center justify-between p-7 mx-10 mb-10'>
      <img src={illustration} alt='' />
      <p className='font-bold  text-center mt-3'>{serviceName}</p>
      <p className='text-sm mt-2 mb-2 p-1.5 text-center'>
        {serviceDescription}
      </p>
      <button className='bg-important-color text-white px-10 py-1.5 rounded-2xl mt-2 mb-3'>
        More
      </button>
    </div>
  );
};

function Service() {
  return (
    <div className='bg-teal-100 sm:h-screen'>
      <h1 className='text-4xl text-teal-800 text-center font-semibold p-20'>
        Our Features & Services
      </h1>
      <div className='flex flex-row items-center justify-center flex-wrap'>
        <ServiceCard serviceName={'Service'} serviceDescription={'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem velit, corrupti neque!'}/>
        <ServiceCard serviceName={'Service'} serviceDescription={'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem velit, corrupti neque!'}/>
        <ServiceCard serviceName={'Service'} serviceDescription={'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Lorem velit, corrupti neque!'}/>
      </div>
    </div>
  );
}

export default Service;

import dentist from '../assets/dentist.jpg';
import dentist2 from '../assets/dentist2.png';
import dentist3 from '../assets/dentist3.jpg';

const Dentist = ({name, image, role}) => {
  return (
    <div className='flex md:flex-row p-10 flex-col'>
      <div className='md:w-2/5 mb-5'>
        <img src={image} alt='' />
      </div>
      <div className='md:w-1/2 md:px-10'>
        <p className='text-3xl text-slate-100 border-b-2 border-slate-100'>
          {name}, {role}
        </p>
        <p className='text-slate-100 mt-5'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur
          autem nostrum quidem unde facere doloremque impedit, mollitia ex saepe
          ducimus! Eaque quasi esse eveniet rerum amet, at maiores nesciunt qui?
        </p>
        <p className='text-slate-100 mt-5'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur
          autem nostrum quidem unde facere doloremque impedit, mollitia ex saepe
          ducimus! Eaque quasi esse eveniet rerum amet, at maiores nesciunt qui?
        </p>
      </div>
    </div>
  );
};

function Team() {
  return (
    <div className='bg-gradient-to-r from-teal-500 to-teal-700 p-10'>
      <p className='text-slate-100 p-3 text-4xl text-slate-100  text-center'>
        Meet Our Team
      </p>
      <p className='mx-auto p-3 text-slate-100  text-center'>
        Our people set us apart. We’re passionate, dedicated, and friendly. Oh
        yeah, and we’re great at what we do!
      </p>

      <Dentist name={'Daniel Stein'} role='Dentist' image={dentist}/>
      <Dentist name={'Anna Stewart'} role='Dentist' image={dentist3}/>
      <Dentist name={'Matthew Bond'} role='Assistant' image={dentist2}/>

    </div>
  );
}

export default Team;

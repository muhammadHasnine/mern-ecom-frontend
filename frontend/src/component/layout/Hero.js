import React from 'react';
import {Link} from 'react-router-dom';
const Hero = ({img="/images/tv.png", bg="#ffbb40", title="SAMSUNG TV",description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta quod voluptas ad ipsa laborum! Omnis quaerat corrupti quisquam dicta in!" }) => {
  return (
    <section className='h-52 sm:h-[90vh] sm:grid sm:place-items-center overflow-hidden' style={{background:bg}}>
           <div className='flex items-center max-w-5xl m-auto'>
           <div className='hidden sm:flex flex-col gap-5'>
              <h1 className="text-4xl font-medium font-roboto text-white" >{title}</h1>
              <p className='text-white'>{description}</p>
              <Link to='/products' className='grid place-items-center w-32 h-9 rounded-2xl text-black bg-white font-semibold'>Order Now</Link>
            </div>
            <div className='sm:w-screen m-auto'>
            <img className='h-[25vh] sm:h-[unset] m-auto' src={img} alt="product-banner" />
            </div>
           </div>
    </section>
  )
}

export default Hero
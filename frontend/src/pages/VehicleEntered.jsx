import React from 'react';
import Logo from '../assets/Logo';

export default function VehicleEntered() {
  return (
    <div className='h-full w-full flex flex-col items-center justify-center'>
      <div className='w-full flex flex-col items-center justify-center mt-auto'>
        <Logo/>
        <h1 className='text-8xl primary mt-5'>IntelliCharge</h1>
      </div>

      <div className='text-4xl mt-auto px-20 pb-20 text-center'>
        Plug the charging connector into the vehicle to start charging.
      </div>
    </div>
  )
}

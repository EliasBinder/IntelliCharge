import React from 'react';
import Close from '../assets/icons/Close';

export default function VehicleBlocking() {
  return (
    <div className='h-full w-full flex flex-col items-center justify-center'>
      <div className='w-full flex flex-col items-center justify-center mt-auto'>
        <Close/>
        <h1 className='text-6xl text-red-400 mt-5'>Vehicle is blocking the entrance!</h1>
      </div>

      <div className='text-4xl mt-auto px-20 pb-20 text-center'>
        Your vehicle is not allowed to be there. Authorities will be contacted in 5 minutes.
      </div>
    </div>
  )
}

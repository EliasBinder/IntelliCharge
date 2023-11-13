import React from 'react';
import Close from '../assets/Close';

export default function VehicleCantEnter() {
  return (
    <div className='h-full w-full flex flex-col items-center justify-center'>
      <div className='w-full flex flex-col items-center justify-center mt-auto'>
        <Close/>
        <h1 className='text-6xl text-red-400 mt-5'>Vehicle not allowed!</h1>
      </div>

      <div className='text-4xl mt-auto px-20 pb-20 text-center'>
        Your vehicle is not allowed to enter. If this is a mistake please contact support at this number: <br/> +39 333 333 3333
      </div>
    </div>
  )
}

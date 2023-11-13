import React from 'react';
import Police from '../assets/icons/Police';

export default function VehicleIsAbusive() {
  return (
    <div className='h-full w-full flex flex-col items-center justify-center'>
      <div className='w-full flex flex-col items-center justify-center mt-auto'>
        <Police/>
        <h1 className='px-20 text-5xl text-red-400 mt-5 text-center'>Vehicle has been stationary for too long</h1>
      </div>

      <div className='text-4xl mt-auto px-10 pb-10 text-center'>
        Your vehicle has been in this spot, fully charged for too long and the authorities have been notified.
      </div>
    </div>
  )
}

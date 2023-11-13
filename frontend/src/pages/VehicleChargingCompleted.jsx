import React from 'react';
import Done from '../assets/icons/Done';

export default function VehicleChargingCompleted() {
  return (
    <div className='h-full w-full flex flex-col items-center justify-center'>
      <div className='w-full flex flex-col items-center justify-center mt-auto'>
        <Done/>
        <h1 className='text-6xl mt-5 primary'>Charging Completed!</h1>
      </div>

      <div className='text-4xl mt-auto px-20 pb-20 text-center'>
        Please remove your vehicle in x hours, otherwise the authorities will be notified.
      </div>
    </div>
  )
}

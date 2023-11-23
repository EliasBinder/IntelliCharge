import React from 'react';
import Logo from '../assets/icons/Logo';
import EnterAnimation from '../components/EnterAnimation/EnterAnimation';

export default function VehicleEntering() {
  return (
    <div className='h-full w-full flex flex-col items-center justify-center'>
      <div className='w-full flex flex-col items-center justify-center mt-auto'>
        <EnterAnimation />
      </div>
      <div className='text-4xl mt-auto px-20 pb-20 text-center mb-20'>
        Please enter the charging station.
      </div>
    </div>
  )
}

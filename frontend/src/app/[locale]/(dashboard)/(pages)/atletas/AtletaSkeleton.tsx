import React from 'react'

function AtletaSkeleton() {
  return (
    <div className='mx-auto flex items-center z-10'>
      <div className='flex flex-col h-full w-full px-2 rounded-lg items-center justify-between bg-background animate-pulse'>
        <div className='flex flex-row w-full justify-end mt-1'>
          <div className='w-8 h-8 rounded-full bg-gray-300'></div>
        </div>
        <div className='w-40 h-40 rounded-full bg-gray-300 mx-4 -mt-4'></div>
        <div className='w-32 h-6 bg-gray-300 rounded my-2'></div>
      </div>
    </div>
  )
}

export default AtletaSkeleton

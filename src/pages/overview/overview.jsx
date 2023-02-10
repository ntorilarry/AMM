import React from 'react'
import ChartBar from '../../component/charts/barChart'

function Statistic() {
  return (
    <div className='p-4'>
      <div className='statistic'>
        <h3 className='text-2xl dark:text-white font-semibold my-3'>Overview</h3>
        <div className="grid gap-5">
          <div className='bg-white dark:bg-slate-800 dark:text-gray-300 rounded-lg px-4 py-4'>
            
      
          <ChartBar />
          <div className='grid grid-cols-8 gap-5'>
              
              <div className='px-4 py-4 bg-white dark:bg-slate-800 dark:text-gray-300 rounded-md lg:col-span-3 col-span-8'>
                <h4 className='font-medium text-lg mb-3'>Learning Ponts</h4>
                {/* > */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Statistic
import React from 'react'
import AdminPage from './adminPage';

const people = [
  {
    name: 'Jane Cooper',
    title: 'Regional Paradigm Technician',
    department: 'Optimization',
    role: 'Admin',
    email: 'jane.cooper@example.com',
    image: 'https://bit.ly/33HnjK0',
  },
  {
    name: 'John Doe',
    title: 'Regional Paradigm Technician',
    department: 'Optimization',
    role: 'Tester',
    email: 'john.doe@example.com',
    image: 'https://bit.ly/3I9nL2D',
  },
  {
    name: 'Veronica Lodge',
    title: 'Regional Paradigm Technician',
    department: 'Optimization',
    role: ' Software Engineer',
    email: 'veronica.lodge@example.com',
    image: 'https://bit.ly/3vaOTe1',
  },
  // More people...
];

function Adminstrators() {
  return (
    <div className='p-4'>
      <div className='statistic'>
        <h3 className='text-2xl dark:text-white font-semibold my-3'>Adminstrators</h3>
        <AdminPage/>
      </div>
    </div>
  )
}

export default Adminstrators
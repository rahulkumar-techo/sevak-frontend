import Header from '@/components/Header'
import React from 'react'
import ListsOfJobs from './ListsOfJobs'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
        <Header
        activeItem={1}
      />
     <div className='mt-[60px]'>
       <ListsOfJobs/>
     </div>
    </div>
  )
}

export default page
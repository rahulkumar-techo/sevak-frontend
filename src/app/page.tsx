"use client"
import React, { use, useState } from 'react'
import Heading from '@/utils/Heading'
import Header from '@/components/Header'
import Hero from '@/components/home/Hero'

type Props = {}

const page = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<number>(0);
  return (
    <div>

      <Heading
        title="Sevak - Find Jobs & Services Near You"
        description="Sevak helps users easily find jobs and services within a 20 km radius using geolocation. Simple, fast, and accessible even for illiterate users."
        keywords="jobs near me, local services, geolocation, easy job search, Sevak"
      />
      <Header
        activeItem={activeItem}
      />
      <Hero/>
    </div>
  )
}

export default page
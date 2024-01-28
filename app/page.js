'use client'
import Posts from '@/components/Posts'
import SideBar from '@/components/SideBar'
import { useState } from 'react'

export default function Home() {

  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="container flex ">

      {showSidebar ? <SideBar setShow={setShowSidebar} /> : null}

      <Posts />
      
    </div>
  )
}

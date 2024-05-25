import React from 'react'
import { UserButton } from '@clerk/nextjs'

function page() {
  return (
    <div>
      <UserButton afterSignOutUrl="/"/>
    </div>
  ) 
}

export default page

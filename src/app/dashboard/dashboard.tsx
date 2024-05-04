"use client"
import React from 'react'
import ShowTableData from '@/app/dashboard/showTableData'

function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-8">
      <ShowTableData />
    </main>
  )
}

export default Dashboard
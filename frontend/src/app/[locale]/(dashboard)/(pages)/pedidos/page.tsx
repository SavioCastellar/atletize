import React from 'react'
import { OrdersTable } from './components/OrdersTable'

export default function Pedidos() {
  return (
    <div>
      <div className="flex flex-row justify-between items-center pb-4">
        <h1 className='text-4xl font-normal text-zinc-900'>Pedidos</h1>
      </div>
      <OrdersTable />
    </div>
  )
}

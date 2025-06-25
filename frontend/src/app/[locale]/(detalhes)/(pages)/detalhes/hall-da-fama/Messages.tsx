import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from 'lucide-react'
import { Fragment } from 'react'


export default function Example() {
  return (
    <Popover className="relative">
      <Popover.Button>Solutions</Popover.Button>

      <Popover.Panel className="absolute z-40">
        <div className="grid grid-cols-1">
          <a className='text-white' href="/analytics">Analytics</a>
          <a className='text-white' href="/engagement">Engagement</a>
          <a className='text-white' href="/security">Security</a>
          <a className='text-white' href="/integrations">Integrations</a>
        </div>

        <img src="/solutions.jpg" alt="" />
      </Popover.Panel>
    </Popover>
  )
}

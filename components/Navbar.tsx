import React from 'react'
import { ModeToggle } from './ThemeButton'

const Navbar = () => {
    return (
        <div className='w-full justify-between flex fixed top-0 py-6 px-8 bg-neutral-200/20'>
            <div className='text-2xl font-bold bg-gradient-to-tr from-purple-800 to-pink-600 bg-clip-text'>
                <h1 className='text-transparent'>
                    Code Snipper
                </h1>
            </div>
            <ModeToggle />
        </div>
    )
}

export default Navbar
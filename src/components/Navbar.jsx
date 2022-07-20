import React, {useState} from 'react';
import { Link } from 'react-router-dom'


import { MenuIcon, XIcon } from '@heroicons/react/outline';

const Navbar = () => {
    const [nav, setNav] = useState(false)
    const handleClick = () => setNav(!nav)

    const handleClose =()=> setNav(!nav)

  return (
    <div className='w-screen h-[80px] z-10 bg-zinc-200 drop-shadow-lg'>
      <div className='px-10 flex justify-between items-center w-full h-full'>
        <div className='flex items-center'>
          <h1 className='text-3xl font-bold mr-4 sm:text-4xl'>CF Stress</h1>
          <ul className='hidden md:flex'>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about" offset={-200}>About</Link></li>
          {/* <li><Link to="support" offset={-50} duration={500}>Support</Link></li>
          <li><Link to="platforms" offset={-100} duration={500}>Platforms</Link></li>
          <li><Link to="pricing" offset={-50} duration={500}>Pricing</Link></li> */}
          </ul>
        </div>
        <div className='hidden md:flex pr-4'>
          <button className='border-none bg-transparent text-black mr-4'>
            <Link to='/login'>Login</Link>
          </button>
          <Link to="/signup"><button className='px-8 py-3'>Sign Up</button></Link>
        </div>
        <div className='md:hidden mr-4' onClick={handleClick}>
            {!nav ? <MenuIcon className='w-5 cursor-pointer' /> : <XIcon className='w-5 cursor-pointer' />}
          
        </div>
      </div>

      <ul className={!nav ? 'hidden' : 'absolute bg-zinc-200 w-full px-8'}>
          <li className='border-b-2 border-zinc-300 w-full'><Link onClick={handleClose} to="/">Home</Link></li>
          <li className='border-b-2 border-zinc-300 w-full'><Link onClick={handleClose} to="/about" offset={-200}>About</Link></li>
          {/* <li className='border-b-2 border-zinc-300 w-full'><Link onClick={handleClose} to="support" offset={-50} duration={500}>Support</Link></li>
          <li className='border-b-2 border-zinc-300 w-full'><Link onClick={handleClose} to="platforms" offset={-100} duration={500}>Platforms</Link></li>
          <li className='border-b-2 border-zinc-300 w-full'><Link onClick={handleClose} to="pricing" offset={-50} duration={500}>Pricing</Link></li> */}

        <div className='flex flex-col my-4'>
            <Link to="/login"><button className='bg-transparent text-indigo-600 px-8 py-3 mb-4' onClick={handleClose}>LogIn</button></Link>
            <Link to="/signup"><button className='px-8 py-3' onClick={handleClose}>Sign Up</button></Link>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
import { useState, useContext } from 'react';
import { UserContext } from '../App';
import { Link, useHistory } from 'react-router-dom'
import { ColorRing } from 'react-loader-spinner'
import axios from 'axios';

import { MenuIcon, XIcon } from '@heroicons/react/outline';

const Navbar = () => {

  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  const [loader, setLoader] = useState(false);

  const [nav, setNav] = useState(false)
  const handleClick = () => setNav(!nav)
  const handleClose = () => setNav(!nav)

  const submit = async () => {
    const LOGOUT_URL = `http://localhost:8000/api/logout`;
    try {
      setLoader(true);
      const successMessage = await axios.post(LOGOUT_URL, {}, {
        withCredentials: true
      });
      setUser({});
      if (successMessage.data === "success") {
        setUser({});
        history.push('/');
      }
      else {
        console.log(successMessage.data);
      }
      setLoader(false)
    } catch (error) {
      console.log(error);
    }
  }

  const navbarComponent = <div className='w-screen h-[80px] z-10 bg-zinc-200 drop-shadow-lg'>
    <div className='px-10 flex justify-between items-center w-full h-full'>
      <div className='flex items-center'>
        <h1 className='text-3xl font-bold mr-4 sm:text-4xl'>CF Stress</h1>
        <ul className='hidden md:flex'>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/status" offset={-200}>Status</Link></li>
          <li><Link to="/about" offset={-200}>About</Link></li>
          <li><Link to="/contact" offset={-200}>Contact</Link></li>
        </ul>
      </div>
      {
        user?.name ?
          (
            <div className='hidden md:flex pr-4'>
              <button className='border-none bg-transparent text-black mr-4'>
                {user.name}
              </button>
              <div>
                <button className='px-8 py-3' onClick={submit} >Logout</button>
              </div>
            </div>
          ) :
          (
            <div className='hidden md:flex pr-4'>
              <button className='border-none bg-transparent text-black mr-4'>
                <Link to='/login'>Login</Link>
              </button>
              <Link to="/signup"><button className='px-8 py-3'>SignUp</button></Link>
            </div>
          )
      }
      <div className='md:hidden mr-4' onClick={handleClick}>
        {!nav ? <MenuIcon className='w-5 cursor-pointer' /> : <XIcon className='w-5 cursor-pointer' />}

      </div>
    </div>

    <ul className={!nav ? 'hidden' : 'absolute bg-zinc-200 w-full px-8'}>
      <li className='border-b-2 border-zinc-300 w-full'><Link onClick={handleClose} to="/">Home</Link></li>
      <li className='border-b-2 border-zinc-300 w-full'><Link onClick={handleClose} to="/status">Status</Link></li>
      <li className='border-b-2 border-zinc-300 w-full'><Link onClick={handleClose} to="/about" offset={-200}>About</Link></li>
      <li className='border-b-2 border-zinc-300 w-full'><Link onClick={handleClose} to="/contact" offset={-200}>Contact</Link></li>

      {
        user?.name ?
          (
            <div className='flex flex-col my-4'>
              <div><button className='bg-transparent text-indigo-600 px-8 py-3 mb-4' onClick={(e) => { submit(); handleClose(); }}>{user.name}</button></div>
              <div>
                <button className='px-8 py-3' onClick={handleClose}>Logout</button>
              </div>
            </div>
          ) :
          (
            <div className='flex flex-col my-4'>
              <Link to="/login"><button className='bg-transparent text-indigo-600 px-8 py-3 mb-4' onClick={handleClose}>LogIn</button></Link>
              <Link to="/signup"><button className='px-8 py-3' onClick={handleClose}>Sign Up</button></Link>
            </div>
          )
      }
    </ul>
    {loader &&
      <div className='loader-wrapper'>
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={['#55AAFF', '#55AAFF', '#55AAFF', '#55AAFF', '#55AAFF']}
        />
      </div>
    }
  </div>

  return navbarComponent
};

export default Navbar;
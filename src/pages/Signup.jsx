import { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom"
import { UserContext } from "../App";
import { useForm } from "react-hook-form"
import { ColorRing } from 'react-loader-spinner'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from "axios";

const Signup = () => {

  const history = useHistory();
  const { user, setUser } = useContext(UserContext);

  if (user?.name) {
    history.push('/');
  }


  const [signupError, setSignupError] = useState("");
  const [loader, setLoader] = useState(false);

  const schema = yup.object({
    name: yup.string().required("Name is Required"),
    email: yup.string().email().required("Email is required"),
    cfhandle: yup.string().required("CF Handle is required"),
    password: yup.string().min(4).max(20).required("Password is required"),
    cpassword: yup.string().oneOf([yup.ref("password"), null], "Password and Confirm Password should be same"),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      setLoader(true)
      delete data["cpassword"];
      const SIGNUP_URL = "http://localhost:8000/api/signup";
      try {
        const successMessage = await axios.post(SIGNUP_URL, data, {
          withCredentials: true
        });
        if (successMessage.data === "success") {
          history.push('/login');
        }
        else {
          setSignupError(successMessage.data);
        }
        setLoader(false)
      } catch (error) {
        setLoader(false)
        console.log(error);
      }
    } catch (err) {
      console.log(err);
    }
  }


  const signupComponent = <div className='w-full py-10' >
    <div className='mx-5 xl:mx-auto'>
      <div className="block p-8 rounded-lg shadow-lg bg-white max-w-lg mx-auto">
        <div className="text-red-800 m-auto text-center font-bold">{signupError}</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group mb-6">
            <label htmlFor="name" className="form-label inline-block mb-2 text-lg text-gray-800">Name</label>
            <input type="text" className="form-control block w-full px-3 py-1.5 text-base text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" name="name" id="name" placeholder="Name" {...register("name")} />
            <p className="text-red-500 text-sm">{errors.name?.message}</p>
          </div>
          <div className="form-group mb-6">
            <label htmlFor="email" className="form-label inline-block mb-2 text-lg text-gray-800">Email</label>
            <input type="email" className="form-control block w-full px-3 py-1.5 text-base text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" name="email" id="email" placeholder="Email" {...register("email")} />
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>
          <div className="form-group mb-6">
            <label htmlFor="cfhandle" className="form-label inline-block mb-2 text-lg text-gray-800">Codeforces Handle</label>
            <input type="text" className="form-control block w-full px-3 py-1.5 text-base text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" name="cfhandle" id="cfhandle" placeholder="Codeforces Handle" {...register("cfhandle")} />
            <p className="text-red-500 text-sm">{errors.cfhandle?.message}</p>
          </div>
          <div className="form-group mb-6">
            <label htmlFor="password" className="form-label inline-block mb-2 text-lg text-gray-800">Password</label>
            <input type="password" className="form-control block w-full px-3 py-1.5 text-base text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" name="password" id="password" placeholder="Password" {...register("password")} />
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </div>
          <div className="form-group mb-6">
            <label htmlFor="cpassword" className="form-label inline-block mb-2 text-lg text-gray-800">Confirm Password</label>
            <input type="password" className="form-control block w-full px-3 py-1.5 text-base text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" name="cpassword" id="cpassword" placeholder="Confirm Password" {...register("cpassword")} />
            <p className="text-red-500 text-sm">{errors.cpassword?.message}</p>
          </div>
          <button className='px-3 py-2 bg-indigo-500 hover:bg-indigo-600 text-white hover:text-white' type="submit">Sign Up</button>
        </form>
      </div>
    </div>
    <div className="text-center mt-8">
      <Link to="/login" className="text-blue-600 font-semibold">Already have an account? Login</Link>
    </div>
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
      </div>}
  </div >

  return signupComponent

}

export default Signup
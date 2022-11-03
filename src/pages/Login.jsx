import { Link, Redirect, useHistory } from "react-router-dom";
import { useForm, useFormState } from "react-hook-form"
import { UserContext } from '../App';
import { useState, useContext } from "react";
import { ColorRing } from 'react-loader-spinner'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from "axios";

const Login = () => {

	const history = useHistory();
	const { user, setUser } = useContext(UserContext);

	const [loginError, setLoginError] = useState("");
	const [loader, setLoader] = useState(false);
	const schema = yup.object({
		email: yup.string().email().required("Email is required"),
		password: yup.string().required("Password is required"),
	});

	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema)
	});

	const onSubmit = async (data) => {
		const LOGIN_URL = `http://localhost:8000/api/login`;
		try {
			setLoader(true);
			const successMessage = await axios.post(LOGIN_URL, data, {
				withCredentials: true
			});
			if (successMessage.data?.name) {
				setUser(successMessage.data)
				history.push('/');
			}
			else {
				setLoginError(successMessage.data);
			}
			setLoader(false)
		} catch (error) {
			console.log(error);
		}
	}

	const loginComponent = (
		<div className='w-full py-24'>
			<div className='mx-5 xl:mx-auto'>
				<div className="block p-8 rounded-lg shadow-lg bg-white max-w-lg mx-auto">
					<div className="text-red-800 m-auto text-center font-bold">{loginError}</div>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="form-group mb-6">
							<label htmlFor="email" className="form-label inline-block mb-2 text-lg text-gray-800">Email</label>
							<input type="email" className="form-control block w-full px-3 py-1.5 text-base text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" name="email" id="email" placeholder="Email" {...register("email")} />
							<p className="text-red-500 text-sm">{errors.email?.message}</p>
						</div>
						<div className="form-group mb-6">
							<label htmlFor="password" className="form-label inline-block mb-2 text-lg text-gray-800">Password</label>
							<input type="password" className="form-control block w-full px-3 py-1.5 text-base text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" name="password" id="password" placeholder="Password" {...register("password")} />
							<p className="text-red-500 text-sm">{errors.password?.message}</p>
						</div>
						<button type="submit" className='px-3 py-2 bg-indigo-500 hover:bg-indigo-600 text-white hover:text-white'>LogIn</button>
					</form>
				</div>
			</div>
      <div className="text-center mt-8">
        <Link to="/signup" className="text-blue-600 font-semibold">New to CF Stress? Create an account</Link>
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
				</div>
			}
		</div>
	)

	return (
		user?.name ? <Redirect to="/" /> : loginComponent
	)
}

export default Login
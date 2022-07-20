import { Link } from "react-router-dom";
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const Login = () => {
    const schema = yup.object({
        email: yup.string().email().required("Email is required"),
        password: yup.string().required("Password is required"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <div className='w-full py-24'>
            <div className='mx-5 xl:mx-auto'>
                <div className="block p-8 rounded-lg shadow-lg bg-white max-w-lg mx-auto">
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
        </div>
    )
}

export default Login
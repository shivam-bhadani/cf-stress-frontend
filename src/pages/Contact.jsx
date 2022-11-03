import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { ColorRing } from 'react-loader-spinner'
import * as yup from "yup"
import axios from "axios";
import { useState } from "react"
import swal from 'sweetalert';

const Contact = () => {

	const [loader, setLoader] = useState(false);

	const schema = yup.object({
		name: yup.string().required("Name is Required"),
		email: yup.string().email().required("Email is required"),
		subject: yup.string().required("Subject is required"),
		message: yup.string().required("Message is required"),
	});

	const { register, handleSubmit, reset, formState: { errors } } = useForm({
		resolver: yupResolver(schema)
	});

	const onSubmit = async (data) => {
		let CONTACT_URL = `http://localhost:8000/api/contact`;
		try {
			setLoader(true)
			const successMessage = await axios.post(CONTACT_URL, data)
			if (successMessage.data === "success") {
				swal("Sent Successfully!", "I will contact you soon", "success");
				reset()
			}
			setLoader(false)
		} catch (error) {
			console.log(error)
		}
	}


	const contactComponent = (
		<div>
			<div className="w-full flex items-center justify-center my-12">
				<div className="bg-white dark:bg-gray-800 shadow rounded py-16 lg:px-28 px-8">
					<p className="md:text-3xl text-xl font-bold leading-7 text-center text-gray-700 dark:text-white">Get in Touch With Me</p>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="md:flex items-center mt-12">
							<div className="md:w-72 flex flex-col">
								<label className="text-base font-semibold leading-none text-gray-800 dark:text-white">Name</label>
								<input name="name" tabIndex="0" arial-label="Please input name" type="name" className="text-base leading-none text-gray-900 p-3 focus:text-gray-700 focus:border-blue-600 focus:outline-none mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100" placeholder="Please input  name" {...register("name")} />
								<p className="text-red-500 text-sm">{errors.name?.message}</p>
							</div>
							<div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
								<label className="text-base font-semibold leading-none text-gray-800 dark:text-white">Email Address</label>
								<input name="email" tabIndex="0" arial-label="Please input email address" type="name" className="text-base leading-none text-gray-900 p-3 focus:border-blue-600 focus:outline-none mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100" placeholder="Please input email address" {...register("email")} />
								<p className="text-red-500 text-sm">{errors.email?.message}</p>
							</div>
						</div>
						<div>
							<div className="w-full flex flex-col mt-8">
								<label className="text-base font-semibold leading-none text-gray-800 dark:text-white">Subject</label>
								<input name="subject" tabIndex="0" arial-label="Please input email address" type="name" className="text-base leading-none text-gray-900 p-3 focus:border-blue-600 focus:outline-none mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100" placeholder="Please input email address" {...register("subject")} />
								<p className="text-red-500 text-sm">{errors.subject?.message}</p>
							</div>
						</div>
						<div>
							<div className="w-full flex flex-col mt-8">
								<label className="text-base font-semibold leading-none text-gray-800 dark:text-white">Message</label>
								<textarea name="message" tabIndex="0" aria-label="leave a message" role="textbox" type="name" className="h-36 text-base leading-none text-gray-900 p-3 focus:border-blue-600 focus:outline-none mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100 resize-none" {...register("message")} ></textarea>
								<p className="text-red-500 text-sm">{errors.message?.message}</p>
							</div>
						</div>
						<div className="flex items-center justify-center w-full mt-6">
							<button type="submit" className='px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white hover:text-white'>Submit</button>
						</div>
					</form>
				</div>
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
		</div>
	)

	return contactComponent
}

export default Contact
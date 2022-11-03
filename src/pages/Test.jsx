import { Redirect, useParams } from "react-router-dom";
import { UserContext } from '../App';
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { ColorRing } from 'react-loader-spinner'
import axios from "axios";

const Test = () => {
	const history = useHistory();
	const [loader, setLoader] = useState(false);
	const { user, setUser } = useContext(UserContext);
	const [sumbmissionID, setSubmissionID] = useState("");
	const { contestID, problemIndex } = useParams();
	const index = problemIndex.toUpperCase();

	if (user?.name == null) {
		history.push('/login')
	}

	const TEST_URL = `http://localhost:8000/api/test/${contestID}/${problemIndex}`

	const submit = async () => {
		try {
			if(user?.name==null) {
				history.push('/login')
			}
			setLoader(true)
			const response = await axios.post(TEST_URL, {
				submission_id: sumbmissionID,
				cfhandle: user.cfhandle,
			})
			const ticketID = response.data
			if (ticketID?.error) {
				alert(ticketID.error);
				return
			}
			history.push(`/status/${ticketID}`)
			setLoader(false)
		} catch (err) {
			alert("Something Went Wrong")
			console.log(err)
		}
	}

	const testComponent = (
		<div className="w-full my-8">
			<div className='max-w-[1200px] mx-8 xl:mx-auto'>
				<h1 className="text-center">
					<a className='text-2xl text-blue-600 font-medium my-4' href={`https://codeforces.com/problemset/problem/${contestID}/${index}`} target="_blank">{`${contestID}-${index}`}</a>
				</h1>
				<div className="w-full text-center text-2xl font-semibold bg-zinc-300 mt-8 py-2">
					Enter Submission ID
				</div>
				<div>
					<input type="text" onChange={e => setSubmissionID(e.target.value)} className="shadow appearance-none border rounded w-full py-4 px-3 leading-tight focus:outline-none focus:shadow-outline font-semibold text-xl" placeholder='Example: 173167476' />
				</div>
			</div>
			<div className='max-w-[1200px] mx-8 xl:mx-auto flex flex-row justify-center mt-6'>
				<div onClick={submit} className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-green-500 rounded-md hover:bg-green-400 sm:w-auto sm:mb-0 cursor-pointer" data-primary="green-400" data-rounded="rounded-2xl" data-primary-reset="{}">
					Stress Test
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
				</div>
			}
		</div>


	)

	return (
		user?.name ? testComponent : <Redirect to="/login" />
	)
}

export default Test
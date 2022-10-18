import { Redirect } from "react-router-dom";
import { UserContext } from '../App';
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { ColorRing } from 'react-loader-spinner'
import axios from "axios";

const ShowStatus = () => {
	const history = useHistory();
	const [loader, setLoader] = useState(false);
	const { user, setUser } = useContext(UserContext);
	const [ticketID, setTicketID] = useState("");

	const STATUS_URL = `https://cfstressbackend.herokuapp.com/api/status/${ticketID}`

	const submit = async () => {
		try {
			if(!(user?.name)) {
				history.push('/login')
			}
			setLoader(true)
			const response = await axios.get(STATUS_URL)
			const ticket = response.data
			if (ticketID?.error) {
				alert(ticketID.error);
				return
			}
			history.push({
				pathname: `/status/ticket/${ticketID}`,
				state: ticket
			})
			setLoader(false)
		} catch (err) {
			alert("Something Went Wrong")
			console.log(err)
		}
	}

	const showStatusComponent = (
		<div className="w-full my-8">
			<div className='max-w-[1200px] mx-8 xl:mx-auto'>
				<div className="w-full text-center text-2xl font-semibold bg-zinc-300 mt-8 py-2">
					Enter Ticket ID
				</div>
				<div>
					<input type="text" onChange={e => setTicketID(e.target.value)} className="shadow appearance-none border rounded w-full py-4 px-3 leading-tight focus:outline-none focus:shadow-outline font-semibold text-xl" />
				</div>
			</div>
			<div className='max-w-[1200px] mx-8 xl:mx-auto flex flex-row justify-center mt-6'>
				<div onClick={submit} className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-green-500 rounded-md hover:bg-green-400 sm:w-auto sm:mb-0 cursor-pointer" data-primary="green-400" data-rounded="rounded-2xl" data-primary-reset="{}">
					Submit
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
		user?.name ? showStatusComponent : <Redirect to="/login" />
	)
}

export default ShowStatus
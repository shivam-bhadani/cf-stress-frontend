import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from '../App';
import { FaRegCopy } from "react-icons/fa";
import { useParams } from "react-router-dom";

const Status = () => {
	const history = useHistory();
	const { ticketID } = useParams();
	const { user, setUser } = useContext(UserContext);
	const [ticket, setTicket] = useState({});
	const [queue, setQueue] = useState(true);
	const [inputText, setInputText] = useState("");
	const [userOutputText, setUserOutputText] = useState("");
	const [expectedOutputText, setExpectedOutputText] = useState("");
	const [intervalID, setIntervalID] = useState(0);
	const [errorMessage, setErrorMessage] = useState("");

	const STATUS_URL = `https://cfstressbackend.herokuapp.com/api/status/${ticketID}`

	if (user?.name == null) {
		history.push('/login')
	}

	useEffect(() => {
		if (queue) {
			const interval_id = setInterval(async () => {
				const response = await axios.get(STATUS_URL);
				const res = response.data;
				setTicket(res);
				if (res.progress === "processed") {
					setQueue(false)
				}
			}, 2000);
			setIntervalID(interval_id)
		}
	}, [])

	useEffect(() => {
		if (queue === false) {
			if (ticket.verdict === true) {
				setInputText(ticket.testcase.input)
				setUserOutputText(ticket.testcase.participant_output)
				setExpectedOutputText(ticket.testcase.jury_output)
			}
			else {
				setErrorMessage(ticket.error);
			}
			clearInterval(intervalID)
		}
	}, [ticket])


	return (
		<div>
			<div className='max-w-[1200px] mx-8 xl:mx-auto'>
				<div className="w-full text-center text-2xl font-semibold bg-zinc-300 mt-8 py-2">
					Your Ticket ID is - {ticketID}
				</div>
				<div className="mt-4">
					{queue && <h1 className="text-red-500 font-bold font text-2xl">{`Submission is in queue...`}</h1>}
					{<h1 className="text-red-500 font-bold font text-2xl">{errorMessage}</h1>}
				</div>
				<div className="mt-4">
					{ticket.progress === "processed" && ticket.verdict == false && <h1 className="text-red-500 font-bold font text-2xl">{ticket.error}</h1>}
				</div>
			</div>
			{
				ticket.progress === "processed" && ticket.verdict === true &&
				<div className='max-w-[1200px] mx-8 xl:mx-auto flex flex-col justify-center mt-3'>
					<div className="w-full text-xl bg-zinc-300 mt-8 py-2 flex flex-row justify-between items-center px-4">
						<div className="font-semibold">INPUT</div>
						<div><span className="cursor-pointer" onClick={e => navigator.clipboard.writeText(inputText)}><FaRegCopy /></span></div>
					</div>
					<pre className="bg-zinc-100 px-4 py-3">
						{inputText}
					</pre>
					<div className="w-full text-xl bg-zinc-300 mt-8 py-2 flex flex-row justify-between items-center px-4">
						<div className="font-semibold">YOUR OUTPUT</div>
						<div><span className="cursor-pointer" onClick={e => navigator.clipboard.writeText(userOutputText)}><FaRegCopy /></span></div>
					</div>
					<pre className="bg-zinc-100 px-4 py-3">
						{userOutputText}
					</pre>
					<div className="w-full text-xl bg-zinc-300 mt-8 py-2 flex flex-row justify-between items-center px-4">
						<div className="font-semibold">EXPECTED OUTPUT</div>
						<div><span className="cursor-pointer" onClick={e => navigator.clipboard.writeText(expectedOutputText)}><FaRegCopy /></span></div>
					</div>
					<pre className="bg-zinc-100 px-4 py-3 mb-8">
						{expectedOutputText}
					</pre>
				</div>
			}
		</div>
	)
}

export default Status
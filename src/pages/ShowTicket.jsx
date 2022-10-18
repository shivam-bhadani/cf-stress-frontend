import { useLocation, useHistory } from "react-router-dom"
import { useContext } from "react";
import { UserContext } from '../App';
import { FaRegCopy } from "react-icons/fa";

const ShowTicket = () => {

	const history = useHistory();
	const { user, setUser } = useContext(UserContext);

	if(user?.name==null) {
		history.push(`/login`)
	}

	const location = useLocation();
	const ticket = location.state

  return (
    <div>
			<div className='max-w-[1200px] mx-8 xl:mx-auto'>
				<div className="w-full text-center text-2xl font-semibold bg-zinc-300 mt-8 py-2">
					Ticket ID - {ticket.ticket_id}
				</div>
				<h1 className="text-center mt-4">
					<span className="text-2xl font-semibold mt-8 py-2">Submission ID - </span> <a className='text-2xl text-blue-600 font-medium my-4' href={`https://codeforces.com/contest/${ticket.problem.contest_id}/submission/${ticket.submission.id}`} target="_blank">{`${ticket.submission.id}`}</a>
				</h1>
				<div className="mt-4">
					{ticket.progress === "processed" && ticket.verdict == false && <h1 className="text-red-500 font-bold font text-2xl">{ticket.error}</h1>}
				</div>
			</div>
			{
				ticket.progress === "processed" && ticket.verdict === true &&
				<div className='max-w-[1200px] mx-8 xl:mx-auto flex flex-col justify-center mt-3'>
					<div className="w-full text-xl bg-zinc-300 mt-8 py-2 flex flex-row justify-between items-center px-4">
						<div className="font-semibold">INPUT</div>
						<div><span className="cursor-pointer" onClick={e => navigator.clipboard.writeText(ticket.testcase.input)}><FaRegCopy /></span></div>
					</div>
					<pre className="bg-zinc-100 px-4 py-3">
						{ticket.testcase.input}
					</pre>
					<div className="w-full text-xl bg-zinc-300 mt-8 py-2 flex flex-row justify-between items-center px-4">
						<div className="font-semibold">YOUR OUTPUT</div>
						<div><span className="cursor-pointer" onClick={e => navigator.clipboard.writeText(ticket.testcase.participant_output)}><FaRegCopy /></span></div>
					</div>
					<pre className="bg-zinc-100 px-4 py-3">
						{ticket.testcase.participant_output}
					</pre>
					<div className="w-full text-xl bg-zinc-300 mt-8 py-2 flex flex-row justify-between items-center px-4">
						<div className="font-semibold">EXPECTED OUTPUT</div>
						<div><span className="cursor-pointer" onClick={e => navigator.clipboard.writeText(ticket.testcase.jury_output)}><FaRegCopy /></span></div>
					</div>
					<pre className="bg-zinc-100 px-4 py-3 mb-8">
						{ticket.testcase.jury_output}
					</pre>
				</div>
			}
		</div>
  )
}

export default ShowTicket
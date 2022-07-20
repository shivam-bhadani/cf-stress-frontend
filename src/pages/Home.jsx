import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='w-full my-8'>
      <div className='max-w-[1200px] mx-8 xl:mx-auto'>
        <h2 className='text-center text-4xl font-semibold my-5'>Stress Test Your CodeForces Solution</h2>

        <div>
          <div className='py-10'>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-8">
                    Problem ID (NOT the same as Round Number)
                  </th>
                  <th scope="col" className="py-3 px-6 w-auto">
                    <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline" placeholder='1673' />
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <b>Problem Index</b>
                  </th>
                  <th scope='col' className="py-3 px-6 w-auto">
                    <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-none focus:shadow-outline" placeholder='c' />
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className='max-w-[1200px] mx-8 xl:mx-auto flex flex-row justify-center'>
          <Link to='/' className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-green-500 rounded-md hover:bg-green-400 sm:w-auto sm:mb-0" data-primary="green-400" data-rounded="rounded-2xl" data-primary-reset="{}">
            Stress Test
          </Link>
        </div>

        <div className='mt-8'>
          <p>
            Brute-force? Generator? Checker? Interactor? Validator? Forget about all of those.
          </p>
          <p>
            We do all the dirty work, so you can focus on what you do best: <b>Solving Problems!</b>
          </p>
        </div>

      </div>
    </div>
  )
}

export default Home
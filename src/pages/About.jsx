const About = () => {
  return (
    <div className='w-full my-5'>
      <div className='max-w-[1200px] mx-8 xl:mx-auto'>
        <p className='text-3xl py-6 text-black-500'>
          <b>CF Stress</b> is a <b>community driven</b>, highly <b>customizable, no-code</b> tool to stress test Codeforces problems.
        </p>
        <p className='text-lg py-3'>
          You can get the <b>smallest</b> possible <b>counter-example</b> for your failing submissions, with <b>> 95%</b> accuracy.
        </p>
        <p className='text-lg py-3'>
          Just plug in your submission ID, and wait for the ticket to be processed.
        </p>
        <p className='text-lg py-3'>
          It also has support for <b>non-unique answers</b> and <b>interactive</b> problems.
        </p>
        <p className='text-lg py-3'>
          You can also get as many sample test cases as you want.
        </p>
      </div>
    </div>
  )
}

export default About
import React from 'react'

const About = () => {
  return (
    <div>
<div className="hero bg-base-200 min-h-screen bg-white">
  <div className="hero-content flex-col lg:flex-row">
    <div className='lg:w-1/2 relative'>
    <img
      src="https://media.istockphoto.com/id/1478431022/photo/cars-for-sale-stock-lot-row.webp?b=1&s=170667a&w=0&k=20&c=oFqufpm9fBA9dnU1bzIZ_CTFNSCHzDUtoykmufW797Y="
      className="w-3/4 rounded-lg shadow-2xl" />
      <img
      src="https://media.istockphoto.com/id/160554760/photo/car-factory-production-line.webp?b=1&s=170667a&w=0&k=20&c=wjmojMq57fy7MOAM2NxKkSm5D3qxRtQX6DGQLs1aJNA="
      className="w-1/2 rounded-lg shadow-2xl border border-8 border-white  right-5 top-1/2 absolute" />
    </div>
  
    <div className='lg:w-1/2'>
    <h1 className="text-5xl font-bold text-cyan-900">About Us</h1>
      <h1 className="text-5xl font-bold  text-blue-800">Lorem ipsum dolor sit amet.</h1>
      <p className="py-6 font-semibold text-blue-950">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id deleniti voluptate, velit praesentium magni ipsam voluptatum excepturi tempore quo culpa, perferendis ut adipisci. Aliquid, harum dolore possimus odio eaque molestias unde, dolor labore in iusto
         fuga sapiente ipsa delectus sed quam quos, dicta voluptatum perferendis quasi blanditiis obcaecati. Natus, pariatur!
      </p>
      <button className="btn btn-primary">Get More Info</button>
    </div>
  </div>
</div>

    </div>
  )
}

export default About
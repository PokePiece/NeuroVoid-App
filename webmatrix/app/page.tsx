import Image from "next/image";

export default function Home() {
  return (
   <div className=''>
    <div className='flex flex-center flex-col justify-center items-center mt-10'>
      <h1 className='text-2xl justify-center text-center '>Webmatrix</h1>
      <p className='text-lg'>The interconnected sphere of the future that breathes.</p>
    </div>
    <div className='mt-10 flex-col bg-black flex flex-center text-center items-center justify-center border-1 bordery-gray-300 p-10 m-10 pb-20'>
      <h3 className='text-xl mb-3 text-white'>From Heaven Brought Down</h3>
      <p className='text-white'>The Webmatrix connets the world. Envision a future where you don't think; you go.</p>
    </div>
   </div>
  );
}

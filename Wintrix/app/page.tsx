import Chat from '@/components/Chat';
import Link from "next/link";
import Auto from "@/components/Auto";

export default function Home() {
  return (
    <div className=''>
      <div className="text-center flex flex-row justify-center gap-20 py-10 bg-gray-900">
        <Link href='/bergs'><p className='text-white pt-1 text-lg'>Bergs</p></Link>
        <Link href='/' ><p className='text-blue-200 text-2xl'>Wintrix</p></Link>
        <Link href='/ships' ><p className='text-white pt-1 text-lg'>Ships</p></Link>
      </div>
      <div className='pt-3'>
        {/*title wintrix chat */}
        <Chat
          title=""
          bodyPlaceholder="Response will appear here..."
          inputPlaceholder="Type a message..."
        
          /> 
      </div>
      <div>
        <Auto />
      </div>
    </div>
  );
}

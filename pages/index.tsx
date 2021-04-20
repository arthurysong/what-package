import React, { FunctionComponent } from 'react';

import Link from 'next/link'
interface Props {
  
}

const API_URL = "https://arthurblogsapi.com/api/blogs";

const Home = ( props: Props ) => {

  return <div className="min-h-screen bg-gray-800">
    <div className="relative min-h-screen max-w-screen-sm m-auto text-white flex flex-col items-start p-8">
      <header className="flex flex-col items-center">
        <h1 className="p-8 text-4xl my-12">
          What %&!@ing Technology do I need to learn now?
        </h1>
      </header>
      <ul className="list-disc">
      <li><Link href="/chatter" ><a className="underline">Chatter: Scaling Stateful Websockets Elixir app horizontally (AWS) 
        <span className="text-sm">You suck at scaling and systems design**</span></a></Link></li>
      <li><Link href="/chatter" ><a className="underline">What %&!@ing Technology do I need to learn now? (A joke, Javascript/NPM)</a></Link></li>
      </ul>
    </div>
  </div>
}

export default Home;

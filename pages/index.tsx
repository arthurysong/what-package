import React, { FunctionComponent } from 'react';
import useSWR from 'swr';
import Link from 'next/link'
import axios from 'axios';

interface Props {

}

const API_URL = "https://arthurblogsapi.com/api/blogs";
const chatterBlogId = "4e58a24d-d031-4279-960e-fa66bcf8fd23";
const whatId = "2c2dc9a2-9924-4555-a94b-4d2ac1ab4258";

const Home = ( props: Props ) => {

  const { data, error } = useSWR(API_URL, url => (
    axios
      .get(url)
      .then(res => {
        const object = {};
        res.data.data.forEach(p => {
          object[p.id] = p;
        })
        return object
      })
  ))

  console.log("data", data);

  return <div className="min-h-screen bg-gray-800">
    <div className="relative min-h-screen max-w-screen-sm m-auto text-white flex flex-col items-start p-8">
      <header className="flex flex-col items-center">
        <h1 className="p-8 text-4xl my-12">
          What %&!@ing Technology do I need to learn now?
        </h1>
      </header>
      <ul className="list-disc">
        <li className="my-2">
          <div className="flex">
            <Link href="/chatter" >
              <a className="underline">Chatter: Scaling Stateful Websockets Elixir app horizontally (AWS)&nbsp;
                <span className="text-sm text-gray-500 underline">You suck at scaling and systems design**</span>
              </a>
            </Link>

            <div className="whitespace-nowrap justify-self-end" >
              <span>👁️ {data ? data[chatterBlogId].views : ''}</span> &nbsp; <span>💙 {data ? data[chatterBlogId].likes : ''}</span>
            </div>
          </div>
        </li>
        <li className="my-2">
          <div className="flex">
            <Link href="/chatter" ><a className="underline">What %&!@ing Technology do I need to learn now? (A joke, Javascript/NPM)</a>
            </Link>
            <div className="whitespace-nowrap justify-self-end" >
              <span>👁️ {data ? data[whatId].views : ''}</span> &nbsp; <span>💙 {data ? data[whatId].likes : ''}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
}

export default Home;

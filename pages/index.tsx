import React, { FunctionComponent } from 'react';
import useSWR from 'swr';
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios';
import Rectangle from '../components/Rectangle';
import View from '../public/images/view.svg';
import Heart from '../public/images/coloredheart.svg';

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

  const iconSize = 14;

  return <div className="min-h-screen bg-gray-800">
    <div className="relative min-h-screen max-w-screen-sm m-auto text-white flex flex-col items-start p-8 pb-4">
      <header className="flex flex-col items-center">
        <h1 className="p-8 text-3xl mt-12 mb-4">
          What <span className="text-6xl text-pink-500">F&!@ing</span> Technology do you need to learn now?
        </h1>
      </header>
      <Rectangle />
      {/* <div className="m-auto">
        <Image className="" src="/images/texturedcircle.png" width={75} height={75}/>
      </div> */}
      <div className="mt-16" >
        <Link href="/chatter">
          <div className="group flex my-2 bg-gray-900 rounded-md cursor-pointer p-6">
            <h4 className="text-2xl w-5/6 group-hover:text-yellow-200">Chatter: Scaling Stateful Websockets Elixir app horizontally (AWS)&nbsp;
              <span className="text-lg text-gray-500 ">You suck at scaling and systems design**</span>
            </h4>

            <div className="pl-4 flex flex-col whitespace-nowrap justify-self-end align-middle text-gray-400 text-sm" >
              <span className="text-gray-400">
                <View className="inline-block mr-1" fill="white" width={iconSize} height={iconSize}/> {data && data[chatterBlogId]?.views}
              </span>
              <span>
                <Heart className="inline-block mr-1" fill="white" width={iconSize} height={iconSize}/> {data && data[chatterBlogId]?.likes}
              </span>
            </div>
          </div>
        </Link>
        <Link href="/npm-visualizer" >
          <div className="group flex my-2 bg-gray-900 rounded-md cursor-pointer p-6">
            <h4 className="text-2xl w-5/6 group-hover:text-yellow-200">What %&!@ing Technology do I need to learn now? (A joke, Javascript/NPM)</h4>
            <div className="pl-4 flex flex-col whitespace-nowrap justify-self-end align-middle text-gray-400 text-sm" >
              <span>
                <View className="inline-block mr-1" fill="white" width={iconSize} height={iconSize}/> {data && data[whatId]?.views}
              </span>
              <span>
                <Heart className="inline-block mr-1" fill="white" width={iconSize} height={iconSize}/> {data && data[whatId]?.likes}
              </span>
            </div>
          </div>
        </Link>
      </div>

      <div className="border-t border-gray-600 block w-full text-sm mt-44 text-gray-400">
        <br/><br/>
        Created by <span className="hover:text-pink-400 cursor-pointer">Arthur Song</span>, <span className="hover:text-green-400 cursor-pointer">arthursong14@gmail.com</span>

      </div>
    </div>
  </div>
}

export const PostLink = () => {
  // A post should be created using this component.
}

export default Home;

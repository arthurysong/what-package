import React from 'react';
import axios from 'axios'
import useSWR from 'swr';
import Image from 'next/image';
import { API_URL } from '../utils/URL';

const Layout = ({ children, blogId }) => {
  const [likes, setLikes] = React.useState(0);
  const [liked, setLiked] = React.useState(false);

  const { data: postData, error } = useSWR(`${API_URL}/${blogId}`, url => (
    axios
      .get(url)
      .then(res => {
        setLikes(res.data.data.likes);
        return res.data.data
      })
  ))

  return <div className="min-h-screen bg-gray-800">
    <div className="relative min-h-screen max-w-screen-sm m-auto text-white flex flex-col items-start p-8">
    <div className="fixed bottom-0 flex items-end self-end">
          <span className="py-4 text-red-500">{likes}</span>
          <span className="rounded-md bottom-0 bg-white flex items-center justify-center p-2 mb-2 ml-2">
            {liked ? <Image 
              src="/images/coloredheart.svg" 
              className="cursor-pointer"
              onClick={() => {
                setLiked(false);
                setLikes(likes => likes - 1);
                axios
                  .post(`${API_URL}/${blogId}/likes/dec`)
                  .then(() => console.log("likes decremented"))
              }}
              width={25} 
              height={25}/> : <Image 
              className="cursor-pointer"
              onClick={() => {
                setLiked(true)
                setLikes(likes => likes + 1);
                axios
                  .post(`${API_URL}/${blogId}/likes/inc`)
                  .then(() => console.log("likes incremented"))
              }}
              src="/images/outlinedheart.svg" 
              width={25} 
              height={25}/>}
          </span>
        </div>
      {children}
    </div>
  </div>
}

export default Layout
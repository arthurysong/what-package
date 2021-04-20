import React from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { API_URL } from '../utils/URL';

const Views = () => {
  const blogId = "4e58a24d-d031-4279-960e-fa66bcf8fd23"
  const [x, setX] = React.useState(0);
  React.useEffect(() => {
    console.log("views");
    axios.get(`${API_URL}/${blogId}`)
      .then(resp => { 
        // console.log(resp);
        setX(resp.data.data.views) 
      })

      if (process.env.NODE_ENV === "production") {
        axios
          .post(`${API_URL}/${blogId}/views`)
          .then(resp => {
            console.log("incremented view!");
          })
      }
  }, [])

  return <div className="border my-24 rounded-md p-3 w-40 m-auto">
    <span className="text-5xl">{x}</span> Newbie Dogehouse Contributors have read this post about scaling Elixir apps.
  </div>
}

export default Views;
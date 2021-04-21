import React, { FunctionComponent } from 'react';
import useSWR from 'swr';
import Link from 'next/link'
import axios from 'axios';
import Rectangle from '../components/Rectangle';

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

  // console.log("data", data);

  // const style = {
  //   front: "translateZ(-50px) rotateY(0deg)",
  //   back: "translateZ(-50px) rotateY(-180deg)",
  //   right: "translateZ(-150px) rotateY(-90deg)",
  //   left: "translateZ(-150px) rotateY(90deg)",
  //   top: "translateZ(-100px) rotateX(-90deg)",
  //   bottom: "translateZ(-100px) rotateX(90deg)",
  // }

  const style = {
    front: "rotateY(0deg)",
    back: "rotateY(-180deg)",
    right: "rotateY(-90deg)",
    left: "rotateY(90deg)",
    top: "rotateX(-90deg)",
    bottom: "rotateX(90deg)",
  }

  // z is the depth we need to keep depth at 0.
  // so the z length is 100 from top to bottom
  // y length


  const [boxface, setBoxface] = React.useState('front');
  // const [rotateY, setRotateY] = React.useState(0);
  // const [rotateX, setRotateX] = React.useState(0);


  // const [startX, setStartX] = React.useState(0);
  // const [startY, setStartY] = React.useState(0);
  // // const [endX, setEndX] = React.useState(0);

  // const [dragging, setDragging] = React.useState(false);


  // const handleMouseDown = React.useCallback(({ clientX, clientY }) => {
  //   console.log("e down ", clientX, clientY);

  //   setStartX(clientX)
  //   // console.log("startX", startX);

  //   setDragging(true);
  //   console.log("dragging", dragging);
  //   window.addEventListener('mouseup', handleMouseUp);
  //   window.addEventListener('mousemove', handleMouseMove);
  // }, [startX])

  // const handleMouseMove = React.useCallback(({ clientX, clientY }) => {
  //   console.log("e move", clientX, clientY);
  //   console.log('origin', startX, startY);

  //   setRotateX(startX => clientX - startX);
  //   setRotateY(startY => clientY - startY);
  // }, [startX, startY]);

  // const handleMouseUp = React.useCallback(() => {
  //   setDragging(false);
  // }, []);

  // React.useEffect(() => {
  //   if (dragging) {
  //     window.addEventListener('mouseup', handleMouseUp);
  //     window.addEventListener('mousemove', handleMouseMove);
  //   } else {
  //     window.removeEventListener('mouseup', handleMouseUp);
  //     window.removeEventListener('mousemove', handleMouseMove);

  //     setStartX(0);
  //     setStartY(0);
  //   }
  // }, [dragging, handleMouseMove, handleMouseUp])

  return <div className="min-h-screen bg-gray-800">
    <div className="relative min-h-screen max-w-screen-sm m-auto text-white flex flex-col items-start p-8">
      <header className="flex flex-col items-center">
        <h1 className="p-8 text-4xl my-12">
          What <span className="text-8xl text-pink-500">F&!@ing</span> Technology do you need to learn now?
        </h1>
      </header>
      <Rectangle />
      {/* <div style={{ perspective: 500, width: 300, height: 200, transform: "scale(0.5)" }}>
        <div style={{ width: 300, height: 200, position: "relative", transformStyle: "preserve-3d", transition: "transform 1s", transform: `translateZ(-50px) ${style[boxface]}`}}>
          <div style={{ width: 300, height: 200, backgroundColor: "hsla(0, 100%, 50%, 0.7)", border: "2px solid black", textAlign: "center", lineHeight: "200px", fontSize: 40, position: "absolute", transform: "rotateY(0deg) translateZ(50px)" }} >front</div>
          <div style={{ width: 300, height: 200, backgroundColor: "hsla(120, 100%, 50%, 0.7)", border: "2px solid black", textAlign: "center", lineHeight: "200px", fontSize: 40, position: "absolute", transform: "rotateY(180deg) translateZ(50px)" }} >back</div>
          <div style={{ width: 100, height: 200, left: 100, backgroundColor: "hsla(60, 100%, 50%, 0.7)", border: "2px solid black", textAlign: "center", lineHeight: "200px", fontSize: 40, position: "absolute", transform: "rotateY(90deg) translateZ(150px)" }}>right</div>
          <div style={{ width: 100, height: 200, left: 100, backgroundColor: "hsla(180, 100%, 50%, 0.7)", border: "2px solid black", textAlign: "center", lineHeight: "200px", fontSize: 40, position: "absolute", transform: "rotateY(-90deg) translateZ(150px)" }}>left</div>
          <div style={{ width: 300, height: 100, top: 50, backgroundColor: "hsla(240, 100%, 50%, 0.7)", border: "2px solid black", textAlign: "center", lineHeight: "100px", fontSize: 40, position: "absolute", transform: "rotateX(90deg) translateZ(100px)" }}>top</div>
          <div style={{ width: 300, height: 100, top: 50, backgroundColor: "hsla(300, 100%, 50%, 0.7)", border: "2px solid black", textAlign: "center", lineHeight: "100px", fontSize: 40, position: "absolute", transform: "rotateX(-90deg) translateZ(100px)" }}>bottom</div>
        </div>
      </div> */}
      {/* <button onClick={() => setBoxface('front')}>front</button>
      <button onClick={() => setBoxface('back')}>back</button>
      <button onClick={() => setBoxface('left')}>left</button>
      <button onClick={() => setBoxface('right')}>right</button>
      <button onClick={() => setBoxface('top')}>top</button>
      <button onClick={() => setBoxface('bottom')}>bottom</button> */}
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

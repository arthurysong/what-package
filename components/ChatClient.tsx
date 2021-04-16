import { useForm } from 'react-hook-form';
import React from 'react';
import random from 'random-name';

interface Props {
  port: number,
  id: number,
}

const ChatClientOne = ({ port, id }: Props) => {
  // const socket = new WebSocket(`ws://localhost:${port}/ws/chat`);
  const API_URL = "wss://chat.whatdoihavetolearnnow.com/ws/chat"
  const socket = new WebSocket(API_URL);
  const { register, handleSubmit, watch, reset, formState: { errors }} = useForm();
  const [messages, setMessages] = React.useState([])
  const [serverIP, setServerIP] = React.useState('');
  const [name] = React.useState(random.first());
  // console.log("messages", messages);
  const [connection, socketConnection] = React.useState(false);
  React.useEffect(() => {
    // if (!connection) {
      socket.addEventListener('open', function (event) {
        socket.send(JSON.stringify({ data: {
          user: name,
          message: "Hello server!"
        }}))

        // console.log("event", event.data);
        console.log("socket to SERVER 1 opened");
      });
      socket.addEventListener("message", (event) => {
        // console.log("event", event.data);
        const msgData = JSON.parse(event.data);
        console.log('msgData', msgData);
        if (msgData.message === "Hello server!" && msgData.user === name) {
          console.log(`i connected to machine ${msgData.machine_ip}`)
          
          setServerIP(msgData.machine_ip);
        }
        setMessages(messages => [ ...messages, msgData ])
        bottomRef.current.scrollIntoView({ behavior: 'smooth' })
      })
      socket.addEventListener('close', function (event) {
        console.log('socket closed');
      })
    // }
  }, [])

  const bottomRef = React.useRef(null);

  const onSubmit = data => {
    // TODO: should i put a try, catch here to catch websocket still in CONNECTING state..
    socket.send(JSON.stringify({ data: { 
      user: name, 
      message: data.message }
    }))
    bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    reset();
  };

  const formRef = React.useRef(null);
  const checkEnterPress = (e: React.KeyboardEvent) => {
    if(e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
      handleSubmit(onSubmit)();
    }
  }

  return <div className="border border-white rounded w-full">
    <div className="border-b text-red-300 p-2">{name} <span className="text-white float-right">{serverIP}</span></div>
    <div className="h-40 overflow-y-auto break-all p-2 text-sm">
      <ul>
        {messages?.map((m, index) => <li key={index}><span className={m.user === name ? "text-red-300" : "text-blue-300"}>{m.user}</span>: {m.message}</li>)}
      </ul>
      <div className="mb-8" ref={bottomRef} />
    </div>
    <form
      className="w-auto flex flex-col" 
      ref={formRef} onSubmit={
      handleSubmit(onSubmit)}>
      <textarea
        onKeyDown={checkEnterPress} 
        className="flex-grow h-20 text-black w-full block" 
        {...register("message")} />
      <button 
        type="submit" 
        className="bg-blue-500 rounded px-3 py-1 w-full" >
          Send
      </button>
    </form>
  </div>
}

export default ChatClientOne;
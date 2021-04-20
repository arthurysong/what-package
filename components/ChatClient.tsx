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
  React.useEffect(() => {
      socket.addEventListener('open', function (event) {
        socket.send(JSON.stringify({ data: {
          user: name,
          message: "Hello server!"
        }}))

        console.log("socket to SERVER 1 opened");
      });
      socket.addEventListener("message", (event) => {
        const msgData = JSON.parse(event.data);
        console.log('msgData', msgData);


        // if we receive the initial message we sent "Hello server!", set the server IP of the node we're connected to
        if (msgData.message === "Hello server!" && msgData.user === name) {
          console.log(`i connected to machine ${msgData.machine_ip}`)
          
          setServerIP(msgData.machine_ip);
        }
        setMessages(messages => [ ...messages, msgData ])
        messagesRef.current.scrollTo({
          top: messagesRef.current.scrollHeight,
          behavior: 'smooth',
        })
      })
      socket.addEventListener('close', function (event) {
        console.log('socket closed');
      })
  }, [])

  // const bottomRef = React.useRef(null);
  const messagesRef = React.useRef(null);

  const onSubmit = data => {
    socket.send(JSON.stringify({ data: { 
      user: name, 
      message: data.message }
    }))

    reset();
  };

  const formRef = React.useRef(null);
  const checkEnterPress = (e: React.KeyboardEvent) => {
    // if user presses enter w.o shift we're going to submit the text area form
    if(e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      messagesRef.current.scrollTo({
        top: messagesRef.current.scrollHeight,
        behavior: 'smooth',
      })
      handleSubmit(onSubmit)();
    }
  }

  return <div className="border border-white rounded w-full">
    <div className="border-b text-red-300 p-2">{name} 🧍<span className="text-white float-right">🖥️ {serverIP}</span></div>
    <div className="h-40 overflow-y-auto break-all p-2 text-sm" ref={messagesRef}>
      <ul>
        {messages?.map((m, index) => <li key={index}><span className={m.user === name ? "text-red-300" : "text-blue-300"}>{m.user}</span>: {m.message}</li>)}
      </ul>
      <div className="mb-8 float-left clear-both"  />
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
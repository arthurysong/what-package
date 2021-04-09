import { useForm } from 'react-hook-form';
import React, { FunctionComponent } from 'react';
import produce from 'immer';
import dynamic from 'next/dynamic';

const ChatClientOne: FunctionComponent = () => {
  const socket = new WebSocket('ws://localhost:4000/ws/chat');
  const { register, handleSubmit, watch, formState: { errors }} = useForm();
  // const message = watch("message");
  // console.log("message", message);
  const [messages, setMessages] = React.useState([])
  // const [textarea, setTextarea] = React.useState("")
  console.log("messages", messages);
  React.useEffect(() => {
    socket.addEventListener('open', function (event) {
      socket.send(JSON.stringify({ data: {
        message: "Hello server!"
      }}))
      console.log("socket to SERVER 1 opened");
    });
    socket.addEventListener("message", (event) => {
      console.log("event", event.data);
      console.log("messages in event listener", messages);
      // setMessage(messages => )
      // setMessages(event.data);
      setMessages(messages => [ ...messages, event.data ])
    })
  }, [])


  const onSubmit = e => {
    e.preventDefault();
    // console.log("sending message to websocket.")
    // console.log("textarea", textarea);
    // console.log("e", e.target.msg.value);
    // console.log("socket", socket);
    socket.send(JSON.stringify({
      data: { message: e.target.msg.value }
    }))
  };
  return <div>
   This is the chat client one...
    {/* <input type="text" /> */}
    {/* <Input placeholder="Basic usage" /> */}
    <div>{messages}</div>
    <button onClick={() => setMessages(messages => [ ...messages, 'another message'])} >Click me to add data </button>
    <div>
      Your messages are here..
      <ul>
        {messages}
        {/* {messages?.map(m => <li>m</li>)} */}
      </ul>
    </div>
    <form onSubmit={onSubmit}>
    {/* </form>
    <form onSubmit={handleSubmit(onSubmit)} > */}
      <textarea 
        id="msg"
        name="msg"
        // onChange={e => setTextarea(e.target.value)}
        // value={textarea}
        // defaultValue="your message" 
        className="w-30 h-20 text-black" {...register("message")} />
      <input type="submit" className="bg-black" />
    </form>
  </div>
}

export default ChatClientOne;

// export const DynamicChatComponent = dynamic(() => import('./components/ChatClient'), { ssr: false })
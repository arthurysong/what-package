import { useForm } from 'react-hook-form';
import React, { FunctionComponent } from 'react';
// import produce from 'immer';
// import dynamic from 'next/dynamic';

const ChatClientOne: FunctionComponent = () => {
  const socket = new WebSocket('ws://localhost:4000/ws/chat');
  const { register, handleSubmit, watch, reset, formState: { errors }} = useForm();
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

  const bottomRef = React.useRef(null);

  const onSubmit = data => {
    // e.preventDefault();
    console.log('data', data);
    socket.send(JSON.stringify({
      data: { message: data.message }
    }))
    bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    reset();
  };

  const formRef = React.useRef(null);
  const checkEnterPress = (e: React.KeyboardEvent) => {
    if(e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      console.log("i pressed enter without the shift key");
      // handleSubmit(onSubmit);
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
      // formRef.current.submit();
      handleSubmit(onSubmit)();
      // this.myFormRef.submit();
    }
  }

  return <div className="border border-white rounded">
    <h3 className="text-lg">CHAT CLIENT #1</h3>
    <div className="h-40 overflow-y-auto break-all p-2">
      Your messages:
      <ul>
        {messages?.map(m => <li>{m}</li>)}
      </ul>
      <div className="mb-8" ref={bottomRef} />
    </div>
    <form
      className="w-auto" 
      ref={formRef} onSubmit={
      handleSubmit(onSubmit)}>
      <textarea
        onKeyDown={checkEnterPress} 
        // id="msg"
        // name="msg"
        className="h-20 text-black w-full block" {...register("message")} /><br/>
      <button type="submit" className="bg-black border border-white rounded px-3" >Submit</button>
    </form>
  </div>
}

export default ChatClientOne;
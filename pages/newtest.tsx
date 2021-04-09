// import ChatClient from './components/ChatClient';
import dynamic from 'next/dynamic';

const DynamicChatComponent = dynamic(() => import('./components/ChatClient'),
{ ssr: false })

const NewTest = () => {
  return <div>
    New Test
    <DynamicChatComponent />
    </div>
}

export default NewTest;
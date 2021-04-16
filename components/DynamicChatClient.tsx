import dynamic from 'next/dynamic';

// for some reason ChatClient has to be exported with this dynamic method...
const DynamicChatComponent = dynamic(() => import('./ChatClient'), { ssr: false })

export default DynamicChatComponent
import Sidebar from '../Components/Chat/Sidebar'
import ChatMessageBody from './../Components/Chat/ChatMessageBody';
import ChatNavbar from '../Components/Chat/ChatNavbar';
import Main from '../Components/Chat/Main';
import MessageBody from '../Components/Chat/MessageBody'
const Chat = () => {
  return (
    <>
      <main>
          <Sidebar/>
          <ChatMessageBody/>
          <Main/>
          <ChatNavbar/>
          <MessageBody/>
      </main>
    </>
  )
}

export default Chat;
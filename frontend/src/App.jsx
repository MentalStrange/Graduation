import { RouterProvider } from "react-router-dom";
// import Chat from "./Pages/Chat.jsx";
// import Home from './Pages/Home.jsx';
import router from './routes.jsx'
const App = () => {
  return (

    <RouterProvider router={router}/>
  )
}

export default App;
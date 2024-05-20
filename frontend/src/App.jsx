import { RouterProvider } from "react-router-dom";
// import Chat from "./Pages/Chat.jsx";
// import Home from './Pages/Home.jsx';
import router from './routes.jsx'
import { RoleProvider } from "./Context/PanelSidebarContext.jsx";
const App = () => {
  return (
    <RoleProvider>
      <RouterProvider router={router}/>
    </RoleProvider>
  )
}

export default App;
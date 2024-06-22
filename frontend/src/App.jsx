import { RouterProvider } from "react-router-dom";
import { RoleProvider } from "./Context/PanelSidebarContext.jsx";
import router from "./routes.jsx";
import { AuthProvider } from "./Context/AuthenticationContext.jsx";
const App = () => {
  return (
    <AuthProvider>
      <RoleProvider>
        <RouterProvider router={router} />
      </RoleProvider>
    </AuthProvider>
  );
};

export default App;

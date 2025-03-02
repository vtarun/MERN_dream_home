import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/login", element: <LoginPage /> },
]);
function App() {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;

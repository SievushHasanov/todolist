import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from './components/pages/MainPage';
import ErorPage from './components/pages/ErrorPage';
import './App.css';
import { TodoProvider } from './contexts/TodoContext';

function App() {
  const router = createBrowserRouter([
    {
      element: <MainPage />,
      path: '/',
    },
    {
      element: <ErorPage />,
      path: '*',
    },
  ]);
  return (
    <TodoProvider>
      <RouterProvider router={router}/>;
    </TodoProvider>
  );
}

export default App;

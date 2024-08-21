import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from './components/pages/MainPage';
import ErorPage from './components/pages/ErrorPage';
import './App.css';
import { AppProvider } from './contexts/AppContext';

function App() {
  const router = createBrowserRouter([
    {
      element: <MainPage />,
      path: '/todolist',
    },
    {
      element: <ErorPage />,
      path: '*',
    },
  ]);
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;

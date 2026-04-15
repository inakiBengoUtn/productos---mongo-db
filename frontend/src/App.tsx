import { RouterProvider } from 'react-router';
import { router } from './router';
import { ToastProvider } from './components/ToastProvider';

function App() {
  return (
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  );
}

export default App;

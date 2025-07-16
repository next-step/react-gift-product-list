import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthProvider';
import { ReceiverProvider } from '@/contexts/ReceiverProvider';
import routes from '@/routes/router';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <AuthProvider>
      <ReceiverProvider>
        <RouterProvider router={routes} />
        <ToastContainer
          position="bottom-center"
          closeOnClick
          hideProgressBar={true}
        />
      </ReceiverProvider>
    </AuthProvider>
  );
}

export default App;

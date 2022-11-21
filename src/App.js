import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './Routes/Routers/Routes';


function App() {
  return (
    <div className='max-w-[1440px] mx-auto' data-theme="cupcake">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;

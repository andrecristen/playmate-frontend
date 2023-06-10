import { ToastContainer } from 'react-toastify';
import logo from '../images/logo.svg';
import './App.css';
import AppRoutes from './AppRoutes';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <AppRoutes />
    </div>
  );
}

export default App;

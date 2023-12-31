import './App.css';
import {BrowserRouter as Router , Route, Routes} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
// import Header from './components/Header';
import SignUp from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <ToastContainer />
     <Router>
      <Routes>
        <Route path='/' element={<SignUp />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
      </Routes>
    </Router>
    </>
   
  );
}

export default App;


import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import Tasks from './components/Tasks';
import Leaves from './components/Leaves';
import EditProfile from './components/EditProfile';
import Topnavigation from './components/Topnavigation';
import SignOut from './components/SignOut';
import {BrowserRouter,Routes,Route } from 'react-router-dom'



function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/Dashboard' element={<Dashboard/>}></Route>
          <Route path='/Leaves' element={<Leaves/>}></Route>
          <Route path='/Tasks' element={<Tasks/>}></Route>
          <Route path='/Topnavigation' element={<Topnavigation/>}></Route>
          <Route path='/EditProfile' element={<EditProfile/>}></Route>
          <Route path='/SignUp' element={<SignUp/>}></Route>
          <Route path='/SignOut' element={<SignOut/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
    // <div className='App'>
    //   <Login/>
    //   <SignUp/>
    // </div>
  );
}

export default App;

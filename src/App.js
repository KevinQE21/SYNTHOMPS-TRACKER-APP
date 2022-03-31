import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { AuthProvider } from  './contexts/AuthContext'

import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Profile from './pages/Profile';

import Dashboard from './pages/Dashboard';
import RegisterUserInfo from './pages/RegisterUserInfo';
import Home from './pages/Home';

function App() {
  return (
    <AuthProvider>
      <Router>
      <Routes>
        <Route exact path="/" element={ <Dashboard /> }/>

        <Route path="/register" element={ <Register /> }/>
        <Route path="/login" element={ <Login /> }/>
        <Route path="/logout" element={ <Logout /> }/>
        <Route path="/profile" element={ <Profile /> }/>
        <Route path="/home" element={ <Home /> }/>
        
        <Route path="/registerUserInfo" element={ <RegisterUserInfo /> }/>
      </Routes>
    </Router>
    </AuthProvider>    
  );
}

export default App;

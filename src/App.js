import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={ <Dashboard /> }/>

        <Route path="/register" element={ <Register /> }/>
        <Route path="/login" element={ <Login /> }/>
        <Route path="/logout" element={ <Logout /> }/>
      </Routes>
    </Router>
  );
}

export default App;

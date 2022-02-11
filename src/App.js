import {BrowserRouter as Router, Routes, Route, Redirect} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" component={ Register }/>
        <Route path="/login" component={ Login }/>
        <Route path="/logout" component={ Logout }/>
      </Routes>
    </Router>
  );
}

export default App;

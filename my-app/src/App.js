import logo from './logo.svg';
import './App.css';
import {Routes,BrowserRouter as Router,Route,Link} from 'react-router-dom'
import { Home } from './Home';
import {Employee} from './Employee';
import {Department } from './Department';
function App() {
  return (
    <div className="App container">
      <h3 className="d-flex justify-content center m-3">React frontend</h3>
    <Router>
      <nav className='navbar navbar-expand-sm bg-light navbar-dark'>
        <ul className='navbar-nav'>
          <li className='nav-item- m-1'>
            <Link className="btn btn-light btn-outline-primary" to="/home">Home </Link>
            <Link className="btn btn-light btn-outline-primary" to="/department">Department </Link>
            <Link className="btn btn-light btn-outline-primary" to="/employee">Employee </Link>
          </li>

        </ul>
      </nav>
      <Routes>
            <Route path="/home" element={<Home/>}></Route>
            <Route path="/department" element={<Department/>}></Route>
            <Route path="/employee" element={<Employee/>}></Route>
      </Routes>
    </Router>
    </div>
  );
}

export default App;

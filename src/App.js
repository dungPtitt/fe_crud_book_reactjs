import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import LaptopsList from "./components/LaptopsList";
import EditAndAddLaptop from './components/EditAndAddLaptop';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (


    <div className='App'>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/laptops" className="navbar-brand">
          dungPtit
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/laptops"} className="nav-link">
              Laptops
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li> */}
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route path='/' element={<LaptopsList/>}/>
          <Route path='/laptops' element={<LaptopsList/>}/>
          <Route path='/laptop/:id' element={<EditAndAddLaptop/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;

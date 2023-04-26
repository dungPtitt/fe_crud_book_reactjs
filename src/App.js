import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import BooksList from "./components/BooksList";
import EditAndAddBook from './components/EditAndAddBook';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (


    <div className='App'>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/books" className="navbar-brand">
          dungPtit
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/books"} className="nav-link">
              Books
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
          <Route path='/' element={<BooksList/>}/>
          <Route path='/books' element={<BooksList/>}/>
          <Route path='/book/:id' element={<EditAndAddBook/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;

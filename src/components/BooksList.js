import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import bookService from "../services/BookService";

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    retrieveBooks();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveBooks = () => {
    try{
      bookService.getAll()
      .then(response => {
        if(response.data.errCode===0){
          setBooks(response.data.data);
        }
        // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }catch(e){
      console.log(e);
    }
    
  };
  const handleDeleteBook = (idBook)=>{
    try{
      let check = window.confirm("Are you sure delete book!");
      if(!check) return;
      bookService.remove(idBook);
      window.location.reload();
    }catch(e){
      console.log(e);
    }
  }

  const findByTitle = () => {
    try{
      bookService.findByName(searchTitle)
      .then(response => {
        if(response.data.errCode===0){
          setBooks(response.data.data);
        }
        // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    }catch(e){
      console.log(e);
    }
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-8">
        <h4>Books List</h4>
        <table className="table">
          <thead className="table-success">
            <tr>
              <th>STT</th>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>isSold</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books&&
              books.map((book, index)=>(
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.category}</td>
                  <td>
                    <input type="checkbox" checked={book.isSold===1?true:false} disabled/>
                  </td>
                  <td>
                    <button className="btn btn-warning" onClick={()=>navigate(`/book/${book.id}`)}>Edit</button>
                    <button className="btn btn-danger" onClick={()=>{handleDeleteBook(book.id)}}>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>

        <button className="btn btn-success mt-3" onClick={()=>navigate("/book/new")}>New Book</button>
        {/* <ul className="list-group">
          {books &&
            books.map((book, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveTutorial(book, index)}
                key={index}
              >
                {book.name}
              </li>
            ))}
        </ul> */}

        {/* <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllTutorials}
        >
          Remove All
        </button> */}
      </div>
      {/* <div className="col-md-6">
        {currentTutorial ? (
          <div>
            <h4>Tutorial</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentTutorial.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentTutorial.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentTutorial.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/tutorials/" + currentTutorial.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default BooksList;
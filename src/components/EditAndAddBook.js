import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import bookService from '../services/BookService';

export default function EditAndAddBook() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    id: id,
    title: "",
    author: "",
    category: "",
    isSold: 0
  });
  useEffect(()=>{
    if(id==='new') return;
    bookService.get(id)
      .then(response => {
        if(response.data.errCode===0){
          setBook(response.data.data);
        }
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  const handleOnchange = (e)=>{
    let bookTmp = {...book};
    bookTmp[e.target.name] = e.target.value;
    setBook(bookTmp);
  }
  const handleOnchangeCheckbox = (e)=>{
    let bookTmp = {...book};
    bookTmp[e.target.name] = e.target.checked?1:0;
    setBook(bookTmp);
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(id==="new"){
      bookService.create(book)
      .then(response => {
        console.log(response);
        if(response.data.errCode===0){
          
        }
      })
      .catch(e => {
        console.log(e);
      });
      
    }else{
      bookService.update(book);
    }
    return navigate("/books");
    // props.history.push("/");
  }
  return (
    <div className="container">
      <form>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="name">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="Book's title"
              value={book.title}
              required
              onChange={handleOnchange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="author">Author's book</label>
            <input
              type="text"
              className="form-control"
              name="author"
              placeholder="Book's author"
              value={book.author}
              required
              onChange={handleOnchange}

            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              className="form-control"
              name="category"
              placeholder="Book's category"
              value={book.category}
              required
              onChange={handleOnchange}

            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="isSold">IsSold</label>
            <input 
            type="checkbox"
            name="isSold"
            checked={book.isSold===1?true:false}
            onChange={handleOnchangeCheckbox}
            />
          </div>
        </div>
        {/* <input type="text" name="id" value={id} hidden /> */}
        <div className="form-group mt-3">
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
          >
           {id ==='new' ? "Create Book" : "Update"}
          </button>
        </div>
      </form>
    </div>
  )
}

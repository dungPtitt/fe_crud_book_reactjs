import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import laptopService from "../services/LaptopService";

const LaptopsList = () => {
  const [laptops, setLaptops] = useState([]);
  const [constlaptops, setconstLaptops] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    retrieveLaptops();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
    // console.log("check laptop: ", laptops);
    let tmpLaplops = [];
    for(let i=0; i<constlaptops.length; i++){
      if(constlaptops[i].name.includes(searchTitle) || constlaptops[i].brand.includes(searchTitle)){
        tmpLaplops.push(constlaptops[i]);
        // console.log("check laptop abc: ", laptops[i]);
      }
    }
    setLaptops(tmpLaplops);
  };

  const retrieveLaptops = () => {
    try{
      laptopService.getAll()
      .then(response => {
        if(response.data.errCode===0){
          setLaptops(response.data.data);
          setconstLaptops(response.data.data);
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
  const handleDeleteLaptop = (idLaptop)=>{
    try{
      let check = window.confirm("Are you sure delete laptop!");
      if(!check) return;
      laptopService.remove(idLaptop);
      window.location.reload();
    }catch(e){
      console.log(e);
    }
  }

  const findByTitle = () => {
    try{
      laptopService.findByName(searchTitle)
      .then(response => {
        if(response.data.errCode===0){
          setLaptops(response.data.data);
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
        <h4>Laptops List</h4>
        <table className="table">
          <thead className="table-success">
            <tr>
              <th>STT</th>
              <th>Name</th>
              <th>Price</th>
              <th>Brand</th>
              <th>Sold</th>
              <th>Date of manufacture</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {laptops&&
              laptops.map((laptop, index)=>(
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{laptop.name}</td>
                  <td>{laptop.price}</td>
                  <td>{laptop.brand}</td>
                  <td>{laptop.sold}</td>
                  <td>{laptop.manufacturedate}</td>
                  {/* <td>
                    <input type="checkbox" checked={laptop.isSold===1?true:false} disabled/>
                  </td> */}
                  <td>
                    <button className="btn btn-warning" onClick={()=>navigate(`/laptop/${laptop.id}`)}>Edit</button>
                    <button className="btn btn-danger" onClick={()=>{handleDeleteLaptop(laptop.id)}}>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>

        <button className="btn btn-success mt-3" onClick={()=>navigate("/laptop/new")}>New Laptop</button>
      </div>
    </div>
  );
};

export default LaptopsList;
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import laptopService from '../services/LaptopService';

export default function EditAndAddLaptop() {
  const {id} = useParams();
  const navigate = useNavigate();
  const [laptop, setLaptop] = useState({
    id: id,
    name: "",
    price: "",
    brand: "",
    sold: "",
    manufacturedate: ""
  });
  useEffect(()=>{
    if(id==='new') return;
    laptopService.get(id)
      .then(response => {
        if(response.data.errCode===0){
          setLaptop(response.data.data);
        }
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  const handleOnchange = (e)=>{
    let laptopTmp = {...laptop};
    laptopTmp[e.target.name] = e.target.value;
    setLaptop(laptopTmp);
  }
  // const handleOnchangeCheckbox = (e)=>{
  //   let laptopTmp = {...laptop};
  //   laptopTmp[e.target.name] = e.target.checked?1:0;
  //   setLaptop(laptopTmp);
  // }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(id==="new"){
      laptopService.create(laptop)
      .then(response => {
        console.log(response);
        if(response.data.errCode===0){
          
        }
      })
      .catch(e => {
        console.log(e);
      });
      
    }else{
      laptopService.update(laptop);
    }
    return navigate("/laptops");
    // props.history.push("/");
  }
  return (
    <div className="container">
      <form>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Laptop's name"
              value={laptop.name}
              required
              onChange={handleOnchange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="price">Price's laptop</label>
            <input
              type="number"
              className="form-control"
              name="price"
              placeholder="Laptop's price"
              value={laptop.price}
              required
              onChange={handleOnchange}

            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="brand">Brand</label>
            <input
              type="text"
              className="form-control"
              name="brand"
              placeholder="Laptop's brand"
              value={laptop.brand}
              required
              onChange={handleOnchange}

            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="sold">Sold</label>
            <input
              type="number"
              className="form-control"
              name="sold"
              placeholder="Laptop's sold"
              value={laptop.sold}
              required
              onChange={handleOnchange}

            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="manufacturedate">Date of manufacture</label>
            <input
              type="date"
              className="form-control"
              name="manufacturedate"
              placeholder="Laptop's manufacturedate"
              value={laptop.manufacturedate}
              required
              onChange={handleOnchange}
            />
          </div>

          {/* <div className="form-group col-md-6">
            <label htmlFor="isSold">IsSold</label>
            <input 
            type="checkbox"
            name="isSold"
            checked={laptop.isSold===1?true:false}
            onChange={handleOnchangeCheckbox}
            />
          </div> */}
        </div>
        {/* <input type="text" name="id" value={id} hidden /> */}
        <div className="form-group mt-3">
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
          >
           {id ==='new' ? "Create Laptop" : "Update"}
          </button>
        </div>
      </form>
    </div>
  )
}

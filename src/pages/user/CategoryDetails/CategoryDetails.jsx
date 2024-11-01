import axios from "axios";
//import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetchData from "../../../customHooks/useFetchData";
import style from "./CategoryDetails.module.css";

export default function CategoryDetails() {
  //const [products, setproducts] = useState([]);

  const { categoryId } = useParams();

  /*const getproducts = async () => {
    const { data } = await axios.get(`https://ecommerce-node4.onrender.com/products/category/${categoryId}`);
    setproducts(data.products);
  }

  useEffect(() => {
    getproducts();
  }, [])*/

  const { data, loding, error } = useFetchData(
    `https://ecommerce-node4.onrender.com/products/category/${categoryId}`
  );

  if (loding) {
    return (
      <div className={`${style.lod}`}>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      </div>
    );
    //visually-hidden
  }
  if (error) {
    return <div className="alert-dander">{error}</div>;
  }

  return (
    /*<section className="products">

      {data.products.map(product=> 
          <div className="product" key={product._id}>
            

            <h2>{product.name}</h2>
            <img src={product.mainImage.secure_url} className="card-img-top"/>
            

            <h2 >{product.name}</h2>
                      <Link className="btn btn-outline-primary" to={`/product/${product._id}`}>Details</Link>
                      
</div>
      )}
    </section>*/

    //*************************************
    <div className='container py-5'>

    <section className={`${style.products}`}>
    <div className=" row ">
      {data.products.map((product) => (
        <div className="col-lg-4">
          <div className="product" key={product._id}>
          <div className={`${style.allcard}`}>

            <div class="card " style={{ width: "18rem" }}>
              <div className="product card h-100">

                  <div class="card-body">
                    <div className={`${style.body}`}>
                      <h2 className="card-text text-muted">
                        {product.name.substring(0, 20)}...
                      </h2>
                      <img
                        src={product.mainImage.secure_url}
                        className="card-img-top"
                      />
                      <Link
                        className="btn btn-outline-primary"
                        to={`/product/${product._id}`}
                      >
                        Details
                      </Link>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
      ))}
      
      </div>
    </section>
    </div>

  );
}

/*
    <div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>*/

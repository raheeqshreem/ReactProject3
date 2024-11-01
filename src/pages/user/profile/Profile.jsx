import axios from "axios";
//import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFetchData from "../../../customHooks/useFetchData";
import style from "./Profile.module.css";
import { Pagination } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function CategoryDetails() {
  const [products, setProducts] = useState([]);
  const [pagesList, setPagesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const[sort,setSort]=useState('')

  // const SearchComponent = () => {
  //   const [results, setResults] = useState([]);
  // //   const handleSearch = async () => {
  // //     const { data } = await axios.get(
  // //       `https://ecommerce-node4.onrender.com/products?page=${currentPage}&limit=5&search=${query}`
  // //     );
  // //     setResults(data);
  // //   };
  // // };

  const getProducts = async () => {
    const { data } = await axios.get(
      `https://ecommerce-node4.onrender.com/products?page=${currentPage}&limit=5&search=${query}&sort=${sort}`);
    console.log(data);
    setProducts(data?.products);
    const pagesNumber = Math.ceil(data?.total / 5);
    PagesCount(pagesNumber);
  };
  function PagesCount(pagesNumber) {
    const pages = [];
    for (let i = 1; i <= pagesNumber; i++) {
      pages.push(
        <li
          class={`${currentPage == i ? "active" : ""} page-item`}
          onClick={() => {
            setCurrentPage(i);
          }}
        >
          <a class="page-link" href="#">
            {i}
          </a>
        </li>
      );
    }
    setPagesList(pages);
  }
  useEffect(() => {
    getProducts();
  }, [currentPage, query,sort]);

  // if (loding) {
  //   return (
  //     <div className={`${style.lod}`}>
  //     <div className="spinner-border" role="status">
  //       <span className="visually-hidden">Loading...</span>
  //     </div>
  //     </div>
  //   );

  // }
  // if (error) {
  //   return <div className="alert-dander">{error}</div>;
  // }

  return (
    <>
      <div className="container py-5">
        <section className={`${style.products}`}>
          <div className=" row ">
            <div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter the search word"
                className=" rounded p-2 mb-5 shadow "
              />
              <div className="d-flex flex-nowrap gap-4 align-items-center mb-5">
                <p className="text-capitalize fw-bold">sort by price :</p>

                <div>
                  <button className="btn rounded-circle border me-2" onClick={()=>{setSort('price')}}>
                    <i className="fa-solid fa-arrow-up"></i>
                  </button>
                  <button className="btn rounded-circle border me-2" onClick={()=>{setSort('-price')}}>
                    <i className="fa-solid fa-arrow-down"></i>
                  </button>
                </div>
              </div>
              {/*               
              <ul>

                {results.map((item, index) => (
                  <li key={index}>{item.name}</li>
                ))}
              </ul> */}
            </div>

            {products.map((product) => (
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
                            <p className="text-danger">{product.price}$</p>
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
            <div className={`${style.pag}`}>
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                      <span class="sr-only">Previous</span>
                    </a>
                  </li>

                  {pagesList.map((item) => item)}
                  <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                      <span class="sr-only">Next</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

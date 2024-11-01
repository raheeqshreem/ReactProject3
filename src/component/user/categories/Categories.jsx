import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import useFetchData from "../../../customHooks/useFetchData";
import style from './Categories.module.css'
import Navbar from "../navbar/Navbar";

export default function Categories() {
  /*const [categories, setcategories] = useState([]);
  const getCategories = async () => {
    const { data } = await axios.get(``);
    setcategories(data.categories);
  };

  useEffect(() => {
    getCategories();
  }, []);
*/
const{data,loding,error}=useFetchData(`https://ecommerce-node4.onrender.com/categories/active`);

if(loding){
   return <div className={`${style.lod}`}>
   <div className="spinner-border" role="status">
   <span className="visually-hidden">Loading...</span>
 </div>
 </div>
}
if(error){
return <div className='alert-dander'>{error}</div>
}


  return (

    <section className="Categories">
        

      <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
        {data.categories.map((category) => 
        <SwiperSlide>
          <Link key={category._id} to={`/categoryDetails/${category._id}`}>
            <div className={`${style.categorie}`}>
              <img src={category.image.secure_url} />
              </div>
          </Link>
          </SwiperSlide>
        )}
      </Swiper>
     
    </section>  

  );
}

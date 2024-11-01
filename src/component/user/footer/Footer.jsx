import style from './Footer.module.css'

export default function Footer(){
    return(
      
<div className={`${style.footer}`}>
  <div className="row justify-content-around">
    <div className="col-xl-2  col-md-12">
      <div className="card6">
        <div className="card6-body">
          <h5 className="card6-title">Location</h5>
          <p className="card6-text">Sri Lanka</p>
          <p className="card6-text">USA</p>
          <p className="card6-text">London</p>
          <p className="card6-text">Japan</p>
          <p className="card6-text">Italy</p>
        </div>
      </div>
    </div>
    <div className="col-xl-2  col-md-12">
      <div className="card6">
        <div className="card6-body">
          <h5 className="card6-title">Quick Link</h5>
          <p className="card6-text">Home</p>
          <p className="card6-text">About</p>
          <p className="card6-text">Menu</p>
          <p className="card6-text">Gallary</p>
          <p className="card6-text">Order Now</p>
        </div>
      </div>
    </div>
    <div className="col-xl-2  col-md-12">
      <div className="card6">
        <div className="card6-body">
          <h5 className="card6-title">Contact</h5>
          <p className="card6-text">+94 12 3456 789</p>
          <p className="card6-text">+94 25 5589741</p>
          <p className="card6-text">johndeo159@gmail.com</p>
          <p className="card6-text">foodshop123@gmail.com</p>
        </div>
      </div>
    </div>
    <div className="col-xl-2  col-md-12">
      <div className="card6">
        <div className="card6-body">
          <h5 className="card6-title">Our Services</h5>
          <p className="card6-text">Fast Delivery</p>
          <p className="card6-text">Easy Payment</p>
          <p className="card6-text">24/7 Services</p>
        </div>
      </div>
    </div>
  </div>
</div>

    )
}
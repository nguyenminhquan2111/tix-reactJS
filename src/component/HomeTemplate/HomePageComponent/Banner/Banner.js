import React from "react";
import styled from "styled-components";
import BookingTools from "./BookingTools/BookingTools";

const Carousel = styled.section`
  display: none;
  position: relative;
  @media (min-width: 768px) {
    display: block;
  }
`;

export default function Banner() {
  return (
    <Carousel className="banner">
      <div id="demo" className="carousel slide" data-ride="carousel">
        <ul className="carousel-indicators">
          <li data-target="#demo" data-slide-to={0} className="active" />
          <li data-target="#demo" data-slide-to={1} />
          <li data-target="#demo" data-slide-to={2} />
        </ul>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/images/falcon.jpg" alt="Falcon" />
            <div className="carousel-caption">
              <p className="p1">The Falcon</p>
              <p className="p2">and</p>
              <p className="p3">The Winter Soldier</p>

              <h4>COMING SOON</h4>
            </div>
          </div>
          <div className="carousel-item">
            <img src="/images/fast9.jpg" alt="fast9" />
            <div className="carousel-caption">
              <p className="p1">Fast</p>
              <p className="p4">and</p>
              <p className="p3">Furious 9</p>
              <h4>The Fast saga</h4>
            </div>
          </div>
          <div className="carousel-item">
            <img src="/images/godzillavskong.jpg" alt="godzillavskong" />
            <div className="carousel-caption">
              <p>Godzilla vs Kong</p>
              <h4>Khởi chiếu tại rạp 26.03.2021</h4>
            </div>
          </div>
        </div>
        <a className="carousel-control-prev" href="#demo" data-slide="prev">
          <span className="carousel-control-prev-icon" />
        </a>
        <a className="carousel-control-next" href="#demo" data-slide="next">
          <span className="carousel-control-next-icon" />
        </a>
      </div>
      <BookingTools />
    </Carousel>
  );
}

// import React from "react";
// import styled from "styled-components";
// import Slider from "react-slick";

// const Carousel = styled.section`
//   display: none;
//   @media (min-width: 768px) {
//     display: block;
//     width: 100%;
//     margin-top: 3.5rem;
//   }
// `;

// const CarouselItem = styled.div`
//   width: 100%;
// `;

// const Img = styled.img`
//   width: 100%;
//   position: relative;
//   top: -100%;
// `;

// const settingSlick = {
//   className: "list__movie__slider",
//   dots: true,
//   infinite: true,
//   autoplaySpeed: 4000,
//   slidesToShow: 1,
//   slidesToScroll: 1,
//   autoplay: true,
// };

// export default function Banner() {
//   return (
//     <Carousel>
//       <Slider {...settingSlick}>
//         <CarouselItem>
//           <Img src="/images/falcon.jpg" alt="Falcon" />
//         </CarouselItem>
//         <CarouselItem>
//           <Img src="/images/fast9.jpg" alt="fast9" />
//         </CarouselItem>
//         <CarouselItem>
//           <Img src="/images/godzillavskong.jpg" alt="godzillavskong" />
//         </CarouselItem>
//       </Slider>
//     </Carousel>
//   );
// }

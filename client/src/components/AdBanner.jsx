
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const AdBanner = () => {
  const adStyle = {
    height: '300px',
    objectFit: 'cover',
    width: '100%'
  };

  return (
    <div className="container my-5">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
      >
        <SwiperSlide>
          <a href="https://mshelhomes.com" target="_blank" rel="noopener noreferrer">
            <img
              src="/images/ads/mshel.png"
              alt="Mshel Homes"
              style={adStyle}
            />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href="https://www.mtn.ng" target="_blank" rel="noopener noreferrer">
            <img
              src="/images/ads/mtn.png"
              alt="MTN Nigeria"
              style={adStyle}
            />
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <a href="https://www.wtcabuja.com" target="_blank" rel="noopener noreferrer">
            <img
              src="/images/ads/wtc.png"
              alt="World Trade Center Abuja"
              style={adStyle}
            />
          </a>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default AdBanner;

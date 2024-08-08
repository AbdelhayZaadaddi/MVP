import React, { useState, useEffect } from 'react';


import A2 from '../../assets/A2.png';
import A3 from '../../assets/A3.png';


const ads = [ 

    A3,
    A2
];

const Ads = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const newIndex = (currentIndex === 0) ? ads.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const newIndex = (currentIndex === ads.length - 1) ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000); // 3 seconds

        return () => clearInterval(interval); 
    }, [currentIndex]);

    return (
        <div className="carousel-container mt-2 animate-fadeIn">
		<button className="prev-arrow" onClick={prevSlide}></button>
            <img src={ads[currentIndex]} alt="Ad" className="carousel-image" />
		<button className="next-arrow" onClick={nextSlide}></button>
        </div>
    );
};

export default Ads;

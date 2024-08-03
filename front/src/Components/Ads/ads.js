import React, { useState, useEffect } from 'react';

import A1 from '../../assets/A1.png';
import A2 from '../../assets/A2.png';
import A3 from '../../assets/A3.png';
import A4 from '../../assets/A4.png';
import A5 from '../../assets/A5.png';

const ads = [ 
    A1,
    A2,
    A3,
    A4,
    A5
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
        <div className="carousel-container mt-5 animate-fadeIn">
            <button className="prev-arrow" onClick={prevSlide}>&#8592;</button>
            <img src={ads[currentIndex]} alt="Ad" className="carousel-image" />
            <button className="next-arrow" onClick={nextSlide}>&#8594;</button>
        </div>
    );
};

export default Ads;

import { useEffect, useState } from "react";

function Carousel (){
    const images = [
        "/img/1.jpg",
        "/img/2.jpg",
        "/img/3.jpg"
    ];
    
    const [currentImage, setCurrentImage] = useState(0);
    useEffect (() => {
        const interval = setInterval(() => {
            setCurrentImage(prev => (prev + 1)% images.length)
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="relative h-96 overflow-hidden mt-16">
            {images.map((img, index) => {
                <img
                    key={index}
                    src={img}
                    alt={`slide ${index + 1}`}
                    className={`absolute w-full h-full object-cover transition-opacity duration-300 ${index === currentImage ? 'opacity-100' : 'opacity-0'}`}
                />
            })}
        </div>
    );
}

export default Carousel;
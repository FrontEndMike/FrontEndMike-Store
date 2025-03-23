import React from "react";

const Hero = ({ heroImage, headline, subheadline, introText, buttons }) => {
    return(
        <div className="hero" style={{ 
            backgroundImage: `url(${heroImage})`
        }}>
        <div className="absolute top-0 right-0 bottom-0 left-0 bg-gray-900 opacity-75"></div>
        
            <div className="max-w-[1280px] mx-auto w-full z-2">
                <div className="px-4 text-left ">
                    <h1 className="text-4xl leading-10 font-extrabold sm:text-5xl text-white sm:leading-none md:text-6xl">
                        {headline} 
                        {subheadline && (
                            <span className="text-tangerine block">{subheadline}</span>
                        )}
                    </h1>
                    {introText && (
                        <p className="mt-3 text-white sm:mt-5 sm:max-w-xl md:mt-5 text-lg font-light">
                            {introText}
                        </p>
                    )}
                    {buttons && (
                        <div className="mt-5 sm:mt-8 flex-wrap flex gap-4 justify-start">
                            <a href="#content" className="w-auto cursor-pointer mt-2 px-4 py-2 bg-primary text-white rounded hover:brightness-90 transition duration-300">
                                Show Now
                            </a>

                            <a href="#" className="w-auto cursor-pointer mt-2 px-4 py-2 bg-tangerine text-white rounded hover:brightness-90 transition duration-300">
                                Live demo
                            </a>
                        </div>
                    )}
                </div>
            </div>
        
        </div>
    )
}

export default Hero;


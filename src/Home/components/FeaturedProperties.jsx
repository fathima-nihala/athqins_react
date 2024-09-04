// import { useEffect, useRef } from 'react';
// import './featured.css';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCategory } from '../../action/ecomAction';

// const FeaturedProperties = () => {
//     const scrollRef = useRef(null);
//     const dispatch = useDispatch();

//     const scrollLeft = () => {
//         scrollRef.current.scrollBy({
//             top: 0,
//             left: -300,
//             behavior: 'smooth'
//         });
//     };

//     const scrollRight = () => {
//         scrollRef.current.scrollBy({
//             top: 0,
//             left: 300,
//             behavior: 'smooth'
//         });
//     };

//     useEffect(()=>{
//         dispatch(fetchCategory())
//     },[dispatch])

//     const { category } = useSelector((state) => state.ecomState);
//     console.log(category,'hdjhsjsdj');
//     const properties =  category?.category || [];
    
//     return (
//         <div className="container mx-auto md:mt-24 mt-10 relative py-6 md:px-6">
//             <div className="flex flex-col md:flex-row items-center md:mb-8 md:px-10 ">
//                 <div className="md:w-1/4">
//                     <h2 className="lg:text-3xl md:text-2xl text-3xl font-bold">Featured <br /> Properties</h2>
//                     <p className="text-[#333] opacity-70">Browse our latest hot offers</p>
//                     <a href="#" className="relative md:text-[10px] lg:text-[16px] mt-10 text-[#333] font-light md:font-bold uppercase tracking-wider group flex items-center">
//                         View Details
//                         <span className="ml-2 inline-block h-0.5 w-5 md:w-10 bg-[#333] transition-all duration-300 ease-in-out md:group-hover:w-20 group-hover:w-10"></span>
//                     </a>
//                 </div>
//                 <div className="md:w-3/4 w-3/4 mt-8 md:mt-0 relative">
//                     <button
//                         onClick={scrollLeft}
//                         className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full p-4 z-10"
//                     >
//                         <ArrowBackIcon
//                             onMouseOver={(e) => e.currentTarget.style.transform = 'translateX(-4px)'}
//                             onMouseOut={(e) => e.currentTarget.style.transform = 'translateX(0)'} />
//                     </button>
//                     <div
//                         ref={scrollRef}
//                         className="flex space-x-4 overflow-x-auto scrollbar-hide"
//                         style={{ scrollBehavior: 'smooth' }}
//                     >
//                         {properties.map((property, index) => (

//                             <div key={index} className=" group bg-gray-800 text-white rounded-lg overflow-hidden bg-cover bg-center flex-none w-64  h-96 relative  transition-transform duration-300 ease-in-out transform hover:scale-105" style={{ backgroundImage: `url(${property.image})` }}>
//                                 <div className="absolute bottom-0 left-0 right-0 p-5  rounded-b-lg transition-transform duration-400 ease-in-out z-10 group-hover:translate-y-[-30%]">
//                                     <div className="text-xl font-extrabold">{property.name}</div>
//                                     <div className="absolute bottom-0 left-3 cursor-pointer  right-0 p-2 text-xs font-light uppercase tracking-wider opacity-0 transition-transform duration-400 ease-in-out transform translate-y-[400%] group-hover:translate-y-0 group-hover:opacity-100">
//                                         View Details
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                     <button
//                         onClick={scrollRight}
//                         className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full p-4 z-10"
//                     >
//                         <ArrowForwardIcon
//                             onMouseOver={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
//                             onMouseOut={(e) => e.currentTarget.style.transform = 'translateX(0)'} />
//                     </button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default FeaturedProperties



import { useEffect, useRef, useState } from 'react';
import './featured.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory } from '../../action/ecomAction';

const FeaturedProperties = () => {
    const scrollRef = useRef(null);
    const dispatch = useDispatch();
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                top: 0,
                left: -300,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                top: 0,
                left: 300,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        dispatch(fetchCategory());
    }, [dispatch]);

    const { category } = useSelector((state) => state.ecomState);
    const properties = category?.category || [];

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
        }
    };

    useEffect(() => {
        checkScroll();
        scrollRef.current.addEventListener('scroll', checkScroll);
        return () => scrollRef.current.removeEventListener('scroll', checkScroll);
    }, [properties]);

    return (
        <div className="container mx-auto md:mt-24 mt-10 relative py-6 md:px-6">
            <div className="flex flex-col md:flex-row items-center md:mb-8 md:px-10">
                <div className="md:w-1/4">
                    <h2 className="lg:text-3xl md:text-2xl text-3xl font-bold">
                        Featured <br /> Properties
                    </h2>
                    <p className="text-[#333] opacity-70">Browse our latest hot offers</p>
                    <a href="#" className="relative md:text-[10px] lg:text-[16px] mt-10 text-[#333] font-light md:font-bold uppercase tracking-wider group flex items-center">
                        View Details
                        <span className="ml-2 inline-block h-0.5 w-5 md:w-10 bg-[#333] transition-all duration-300 ease-in-out md:group-hover:w-20 group-hover:w-10"></span>
                    </a>
                </div>
                <div className="md:w-3/4 w-3/4 mt-8 md:mt-0 relative">
                    {canScrollLeft && (
                        <button
                            onClick={scrollLeft}
                            className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full p-4 z-10"
                        >
                            <ArrowBackIcon
                                onMouseOver={(e) => e.currentTarget.style.transform = 'translateX(-4px)'}
                                onMouseOut={(e) => e.currentTarget.style.transform = 'translateX(0)'} />
                        </button>
                    )}
                    <div
                        ref={scrollRef}
                        className="flex space-x-4 overflow-x-auto scrollbar-hide"
                        style={{ scrollBehavior: 'smooth' }}
                    >
                        {properties.map((property, index) => (
                            <div key={index} className="group bg-gray-800 text-white rounded-lg overflow-hidden bg-cover bg-center flex-none w-64 h-96 relative transition-transform duration-300 ease-in-out transform hover:scale-105" style={{ backgroundImage: `url(${property.image})` }}>
                                <div className="absolute bottom-0 left-0 right-0 p-5 rounded-b-lg transition-transform duration-400 ease-in-out z-10 group-hover:translate-y-[-30%]">
                                    <div className="text-xl font-extrabold">{property.name}</div>
                                    <div className="absolute bottom-0 left-3 cursor-pointer right-0 p-2 text-xs font-light uppercase tracking-wider opacity-0 transition-transform duration-400 ease-in-out transform translate-y-[400%] group-hover:translate-y-0 group-hover:opacity-100">
                                        View Details
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {canScrollRight && (
                        <button
                            onClick={scrollRight}
                            className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full p-4 z-10"
                        >
                            <ArrowForwardIcon
                                onMouseOver={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
                                onMouseOut={(e) => e.currentTarget.style.transform = 'translateX(0)'} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FeaturedProperties;

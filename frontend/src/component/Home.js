import React, { Fragment, useEffect } from "react";
import MouseIcon from '@mui/icons-material/Mouse';
import MetaData from "./layout/MetaData";
import ProductCard from "./ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { getProduct, clearErrors } from "../actions/productAction";
import Loader from "./layout/Loader/Loader";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { EffectFade,Autoplay, Pagination, Navigation } from "swiper";
import Hero from './layout/Hero';
const Home = () => {
  const dispatch = useDispatch();
  const banner = [
    {
      img:"/images/tv.png",
      bg:"#ffbb40",
      color:"white",
      title:"SAMSUNG TV",
      description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta quod voluptas ad ipsa laborum! Omnis quaerat corrupti quisquam dicta in!"
    },
    {
      img:"/images/smartwatch.png",
      bg:"#5aafe9",
      title:"Smart Watch",
      description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta quod voluptas ad ipsa laborum! Omnis quaerat corrupti quisquam dicta in!"
    },
    {
      img:"/images/sofa.png",
      bg:"#43a299",
      title:"Sofa",
      description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta quod voluptas ad ipsa laborum! Omnis quaerat corrupti quisquam dicta in!"
    },
    {
      img:"/images/kurta.png",
      bg:"#ff7540",
      title:"New Kurta",
      description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta quod voluptas ad ipsa laborum! Omnis quaerat corrupti quisquam dicta in!"
    },
    {
      img:"/images/hadephone.png",
      bg:"#ff4040",
      title:"Hadephone",
      description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta quod voluptas ad ipsa laborum! Omnis quaerat corrupti quisquam dicta in!"
    },
  ]
  const { loading, products, error } = useSelector((state) => state.products);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Ecommerce" />
          {/* <div className="clip-path h-[100vmin] text-center flex flex-col justify-center items-center bg-[url('https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80')] text-white after:content-[''] after:w-[100vw] after:h-[100vmin] after:bg-white after:absolute md:after:top-0 after:top-[1px] after:left-0 after:z-[5] after:max-w-full">
            <p className="text-[2.4vmax] md:text-[1.4vmax] font-roboto font-medium tracking-wide">
              Welcome to Ecommerce
            </p>
            <h1 className="text-[2.5vmax] font-semibold my-[5vmax]">
              FIND AMAZING PRODUCTS BELOW
            </h1>

            <a href="#container">
              <button className="bg-white border hidden  border-white mb-[5vmax] w-[9vmax] cursor-pointer text-black p-[1vmax] text-[1vmax] font-medium md:flex gap-1 justify-center items-center hover:bg-[#673ab700] hover:text-white transition-all ease-in duration-300">
                Scroll <MouseIcon />
              </button>
            </a>
          </div> */}
          <Swiper
          spaceBetween={30}
          centeredSlides={true}
          effect={"fade"}
          autoplay={{
            delay: 5500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
        >
          {
            banner.map((item,index)=>(
              <SwiperSlide>
                <Hero img={item.img} bg={item.bg}/>
              </SwiperSlide>
            ))
          }
        </Swiper>
        {/* <Hero img={'/images/kurta.png'}/> */}
          
          <h1 className="text-[2.4vmax] md:text-[1.4vmax] border-b border-[#15151580] w-[24vmax] md:w-[20vmax] m-[5vmax_auto] text-center p-[1vmax] text-[#000000b3] font-roboto">
            Featured Products
          </h1>
          <div
            id="container"
            className="flex w-[80vw] m-[2vmax_auto] justify-center flex-wrap max-w-full"
          >
            {products &&
              products.map((product, i) => (
                <ProductCard key={i} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;

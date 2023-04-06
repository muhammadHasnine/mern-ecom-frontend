import React, { useEffect, useRef, useState } from "react";
import {FiMenu,FiShoppingCart} from 'react-icons/fi';
import {BiSearch,BiSitemap} from 'react-icons/bi';
import {IoIosArrowDown, IoIosArrowBack, IoIosLogIn, IoIosLogOut, IoIosStats, IoIosCreate, IoIosListBox} from 'react-icons/io'
import {MdAccountCircle, MdClose, MdRateReview, MdDashboard} from 'react-icons/md';
import {Link} from 'react-router-dom';
import {RiAccountBoxFill} from 'react-icons/ri';
import {FaUsers} from 'react-icons/fa';
import {logOut} from "../actions/userAction";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
const Test = ({user}) => {
  const [open, setOpen] = useState(false)
  const [openDashborad, setOpenDashborad] = useState(false)
  const [modal, setModal] = useState(false)
  const optionRef = useRef()
  const buttonRef = useRef()
  const dispatch = useDispatch();
  const logout = () =>{
    dispatch(logOut());
    setModal(false)
    toast.success("Log Out Successfully");
  }
  useEffect(() => {
    let handler = (event) => {
      if (!optionRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
        setModal(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  return (
    // desktop and tab
    <>
    <nav className="bg-white drop-shadow-md relative z-20">
      <div className="justify-between items-center max-w-6xl mx-auto font-roboto font-medium hidden sm:flex py-3">
      <div className="flex gap-4 items-center">
        <div className="logo w-32">
          <img src="/Martcom-logos_black.png" alt="logo"/>
        </div>
        <ul className="flex gap-5">
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/products'>Products</Link></li>
          <li><Link to='/contact'> Contact</Link></li>
          <li><Link to='/about'>About</Link></li>
        </ul>
      </div>
      <ul className="flex gap-4 text-2xl items-center">
        <li><Link to='/search'> <BiSearch/> </Link>
        
        </li>
        <li> <Link to='/cart'><FiShoppingCart/></Link> </li>
        {
         user && user ? <li ref={buttonRef} className="flex items-center gap-1" onClick={()=>setModal(!modal)}>  <img className="w-10 h-10 rounded-full object-cover" src={user?.avatar?.url} alt="profile" /> <p className="text-xl">{user?.name}</p>  <IoIosArrowBack className={`transition-all duration-300 ease-in-out ${modal ? 'rotate-0' : 'rotate-[-90deg]'}`}/>  </li> : <Link to='/login'><IoIosLogIn/></Link>
        }
       
      </ul>
      </div>
      <div className="flex bg-white z-20 items-center sm:hidden justify-between text-2xl py-3 px-4">
        {
          open ? <FiMenu onClick={()=>setOpen(false)}/> : <MdClose onClick={()=>setOpen(true)}/>
        }
        
        
       <div className="flex gap-4 items-center">
      <Link to='/search'> <BiSearch/> </Link>
        
        
       <Link to='/cart'><FiShoppingCart/></Link> 
       {/* <MdAccountCircle onClick={()=>setModal(!modal)}/> 
        */}
        {
          user && user ? <div ref={buttonRef} className="flex items-center gap-1" onClick={()=>setModal(!modal)}><img className="w-10 h-10 rounded-full object-cover" src={user?.avatar?.url} alt="profile" /> <p className="text-xl">{user?.name}</p>  <IoIosArrowBack className={`transition-all duration-300 ease-in-out ${modal ? 'rotate-0' : 'rotate-[-90deg]'}`}/>  </div> : <Link to='/login'><IoIosLogIn/></Link>
        }
       
       </div>
      </div>
     
    
    </nav>
      <div className={`flex w-full z-30 h-screen fixed top-0 ${open ? 'left-[-100%]' : 'left-0'} transition-all duration-300 ease-in-out sm:hidden`}>
      <ul className="flex-[1] bg-slate-200 p-8 flex flex-col gap-5">
        <li className="w-44" ><Link to='/'><img src="/Martcom-logos_black.png" alt="logo"/></Link></li>
       <li><Link to='/'>Home</Link></li>
         <li><Link to='/products'>Products</Link></li>
         <li><Link to='/contact'> Contact</Link></li>
         <li><Link to='/about'>About</Link></li>
      </ul>
      <div className='backdrop-blur-sm flex-[0.3]' onClick={()=>setOpen(true)}></div>
      </div>
      {
        modal &&  <div ref={optionRef} className={`absolute flex flex-col gap-3 p-4 rounded-md z-10 right-5 sm:right-[10%] shadow-2xl bg-slate-50  ${modal ? 'top-[70px] sm:top-[75px]' : 'top-[-16px]'}`}>
        <div>
         {
           user && user?.role === 'admin' && <>
           <div className='flex items-center gap-1' onClick={()=>setOpenDashborad(!openDashborad)}><MdDashboard/> <p>Dashborad</p> <IoIosArrowDown className={`transition-all duration-200 ease-in ${openDashborad ? 'rotate-0' : 'rotate-[-180deg]'}`}/> </div>
         <div className={`flex flex-col gap-1 overflow-hidden transition-all duration-300 ease-in-out ${openDashborad ? 'h-[164px]' : 'h-0'}`}>
           <Link className='flex items-center gap-2' to='/admin/dashboard'> <IoIosStats/><span>Statistics</span> </Link>
           <Link className='flex items-center gap-2' to='/admin/products'><BiSitemap/><span>All Products</span></Link>
           <Link className='flex items-center gap-2' to='/admin/product'><IoIosCreate/><span>Create Product</span></Link>
           <Link className='flex items-center gap-2' to='/admin/orders'><IoIosListBox/> <span>Orders</span></Link>
           <Link className='flex items-center gap-2' to='/admin/users'><FaUsers/><span>Users</span></Link>
           <Link className='flex items-center gap-2' to='/admin/reviews'><MdRateReview/><span>Reviews</span></Link>
         </div>
           </>
         }
        </div>
         <Link className='flex items-center gap-2' to='/account'><RiAccountBoxFill/><span>Profile</span></Link>
         <div className='flex items-center gap-2' onClick={logout}><IoIosLogOut/><span>Logout</span></div>
       </div>
       }
      </>
  );
};

export default Test;

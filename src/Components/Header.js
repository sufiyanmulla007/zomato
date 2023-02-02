import React,{useState,useEffect} from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from '@mui/material/Badge';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { DLT } from "../redux/action/action";
const Header = () => {
  const [price,setPrice] = useState(0);
  // console.log(price);

  const getdata = useSelector((state)=>state.cartreducer.carts);
  console.log(getdata);
  const  dispatch = useDispatch();
  const [anchorEl, setAnchorEl] =useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dlt = (id)=>{
    dispatch(DLT(id))
}
//TOTAL item
const total = ()=>{
  let price = 0;
  getdata.map((ele,k)=>{
      price = ele.price * ele.qnty + price
  });
  setPrice(price);
};
useEffect(()=>{
  total();
},[total])
  return (
    <>
      <Navbar bg="dark" variant="dark" style={{height:"60px"}}>
        <Container>
          <NavLink to="/" style={{textDecoration:"none",color:"white",margin:"15px"}}>Add to Card</NavLink>
          <Nav className="me-auto">
            <NavLink to="/" style={{textDecoration:"none",color:"white"}}>Home</NavLink>
          </Nav>

          <Badge badgeContent={getdata.length} color="primary"
           id="basic-button"
           aria-controls={open ? 'basic-menu' : undefined}
           aria-haspopup="true"
           aria-expanded={open ? 'true' : undefined}
           onClick={handleClick}
          >
            <ShoppingCartIcon
              style={{
                color: "lightblue",
                fontSize: "2rem",
                cursor: "pointer",
              }}
            />
          </Badge>
        </Container>
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
       {
        getdata.length ?
        <div className='card_details' style={{width:"24rem",padding:10}}>
        <Table>
          <thead>
            <tr>
              <th>item</th>
              <th>Restaurant Name</th>
            </tr>
          </thead>
          <tbody>
            {
              getdata.map((e)=>{
                return (
                  <>
                  <tr>
                    <td>
                    <NavLink to={`/CardDetails/${e.id}`} onClick={handleClose}>
                    <img src={e.imgdata} style={{width:"5rem",height:"5rem"}} alt="pic"/>
                    </NavLink>
                    </td>
                    <td>
                    <p>{e.rname}</p>
                    <p>Price : ₹{e.price}</p>
                    <p>Quantity : {e.qnty}</p>
                    <p style={{color:"red",fontSize:20,cursor:"pointer"}}
                    onClick={()=>dlt(e.id)}
                    >
                    <i className='fas fa-trash smalltrash'></i></p>
                    </td>
                    <td className='mt-5'style={{color:"red",fontSize:20,cursor:"pointer"}}
                    onClick={()=>dlt(e.id)}
                    >
                    <i className='fas fa-trash largetrash'></i>
                    </td>
                  </tr>
                  </>
                )
              })
            }
          <p className='text-center'>Total :{price}</p>
          </tbody>
        </Table>
        </div>:
        <div className='card_details d-flex justify-content-center align-items-center'style={{width:"24rem",padding:10,position:"relative"}}>
        <i className="fas fa-close smallclose"
         onClick={handleClose}
        style={{position:"absolute",top:2,right:20,fontSize:20,cursor:"pointer"}}
        ></i>
        <p style={{fontSize:22}}>Your card is empty</p>
        <img src="./assets/cart.gif" alt="pic" className='emptycart_img'style={{width:"5rem",padding:10}}/>
       </div>
       }

       
      </Menu>
      </Navbar>
    </>
  );
};

export default Header;

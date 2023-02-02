import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Cardsdata from './CardData';
import "../Style/Style.css";
import { useDispatch } from 'react-redux';
import { Add } from '../redux/action/action';
const Home = () => {
const [data,setData]=useState(Cardsdata);
// console.log(data);
const dispatch = useDispatch();

const send = (e)=>{
  // console.log(e);
  dispatch(Add(e));
}

  return (
   <>
   <div className='container mt-3'>
   <h2 className='text-center'>Add to Cart Projects</h2>
   
   <div className='row d-flex justify-content-center align-items-center'>
    {
      data.map((elem,id)=>{
      return(
      <>
      <Card style={{ width: '22rem',border:"none" }} className="mx-2 mt-4 card_style">
      <Card.Img variant="top" src={elem.imgdata} style={{height:"16rem"}} className="mt-3" />
      <Card.Body>
        <Card.Title>{elem.rname}</Card.Title>
        <Card.Text>
        Price : ₹{elem.price}
        </Card.Text>
        <div className="button_div d-flex justify-content-center">
        <Button variant="primary"
        onClick={()=> send(elem)}
        className='col-lg-12'>Add to Cart</Button>
        </div>
      </Card.Body>
    </Card>

      </>
      )
      })
    }
   </div>
   </div>
   </>
  );
};

export default Home;

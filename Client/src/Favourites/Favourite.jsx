import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import image from '../Image/1669125652900.jpg';
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const accessToken = localStorage.getItem('token');

const config = {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
};

const Favourite = () => {
  const [data, setData] = useState([]); // Update the initial state to an array
  const [favorites, setFavorites] = useState({});
  const [loadfav, setloadfav] = useState(false); 
  // useEffect(() => {

  // },[loadfav])
  
  const navigate = useNavigate();

  useEffect(() => {
    setloadfav(false)
    const url = `https://pgbackend.adityachoudhury.com/api/property/get/favourite`;
    axios
      .get(url, config)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setData(res.data);
        } else {
          console.log('error');
        }
      })
      .catch((err) => {
        alert('ERROR');
      });
  }, [loadfav]);

  const togglefav = (itemId) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [itemId]: !prevFavorites[itemId],
    }));

    const f = `https://pgbackend.adityachoudhury.com/api/property/favourite/add/${itemId}`;
    axios
      .post(f, {}, config)
      .then((res) => {
        if (res.status === 201) {
          console.log('DONE');
          toast('DONE');
        } else {
          console.log('error');
        }
      })
      .catch((err) => {
        toast('already exist');
      });
  };

  return (
    <div data-aos={'fade-in'}>
      {(data.length == 0) ? (<><div style={{textAlign:"center" , fontSize:"2rem"}}>OOPS ! You haven't saved any property as your Favourite</div></>) : (<div
        className='wrap-all'
      >
        {data.map((item, index) => {
          return (
            <div
              className='each-card-style'
             

              key={item.propertyId._id}
            >
              {/* IMAGE DIV */}
              <div style={{ borderRadius: '20px' }}>
                <img
                  src={item.propertyId.photos[0]}
                  style={{ width: "295px", height: "240px", borderRadius: "19px", padding: "5px",cursor:"pointer" }}
                  onClick={() => {
                    navigate("/More_Info", { state: { name: item.propertyId._id, fromUser: "false" } });
                  }}
                />
              </div>

              {/* INFO DIV */}
              <div style={{ margin: '1px', padding: '7px', fontSize: '13.7px' }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <h3 style={{fontFamily:"cursive"}}>Rent:₹{item.propertyId.rent}</h3>
                  <button
                    style={{ marginLeft: '11.5rem' }}
                  // onClick={() => {
                  //   togglefav(item.propertyId._id);
                  // }}
                  onClick={() => {
                    alert(item.propertyId._id)
                    axios.delete(`https://pgbackend.adityachoudhury.com/api/property/favourite/delete/${item.propertyId._id}`, config)
                .then((res) => {
                  if (res.status === 200) {
                    alert("fav removed successfully")
                    setloadfav(true);
                    
                  }
                  else
                    alert("error")
                }).catch((err) => {
                  //   toast("already exist")
                  toast("Incomplete Data")
                })
                  }}
                  >
                    {(favorites[item._id]) ?
                      (<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"><path fill="#f50f0f" d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" /></svg>) :
                      (<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"><path fill="#f50f0f" d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" /></svg>)}
                  </button>
                </div>
                <h3 style={{ color: "black" }}>Nearest College: {item.propertyId.nerbyColleges[0]?.collegeName}</h3>
                <h3>Rooms Available: {item.propertyId.rooms}</h3>
                <h3>Within: {item.propertyId.nearbyCollegesDistances[0]} KM</h3>
                <h1
                  style={{
                    marginLeft: '15.5rem',
                    marginTop: '-1.5rem',
                    cursor: 'pointer',
                    width:"3rem",
                    color:"#ff7b00a5"
                  }}
                  
                >
                  <FontAwesomeIcon icon={faStar} /> 4
                </h1>
              </div>
            </div>
          )
        })}
      </div>)}
    </div>
  );
};

export default Favourite;

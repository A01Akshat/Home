import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaSearch } from 'react-icons/fa';
import './App.css';
import AOS from 'aos';
import axios from 'axios';
// import { Toast } from 'react-toastify/dist/components';
import Navbar from "./Navbar/Navbar";
import SidebarOwner from './DashBoardOwner/SidebarOwner';
import { useNavigate } from "react-router";
// import { grey } from '@mui/material/colors';
import { toast } from 'react-toastify';
// import { MultiSelect } from 'primereact/multiselect';



const names = [
  'PG', 'Home', 'Rooms'
]
const Main_Page = () => {

  let yellow = '#ffc800';
  const [isModalOpen, setIsModalOpen] = useState(true);

  const [newName, setnewName] = useState("");
  const [search, setsearch] = useState("");
  const [check, setCheck] = useState("Hi");
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [address, setaddress] = useState("");
  const [gender, setgender] = useState("");
  const [rent, setrent] = useState("");
  const [rooms, setrooms] = useState("");
  const [colleges, setColleges] = useState([]);
  const [bgColor, setBgColor] = useState(yellow);
  const [dist,setdist]=useState([]);
  const navigate = useNavigate();

  const accessToken = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };



  useEffect(() => {
    AOS.init({
      duration: 2000
    });
  }, []);
  const handleChange = (e) => {
    if (e.key === 'Enter') {

      setCheck(search);
      // const f=` https://pgbackend.adityachoudhury.com/api/property/get/search?nearbyCollege=${e.target.value}`
      // axios.get(f) 
      // .then((res) => {
      //     if (res.status === 200) {
      //         console.log("DONE");
      //         console.log(res);
      //         // console.log(dataeach[0].name);
      //     }
      //     else
      //         console.log("error")
      // }).catch((err) => {

      // })
    }
    // {{locahost}}/api/property/get/search?city=street&minPrice=500&maxPrice=1500&minRooms=1&furnished=true&nearbyCollege=KIIT&distance=1&page=1&pageSize=10
  };
  const shuffle = useCallback(() => {
    const index = Math.floor(Math.random() * names.length);
    setnewName(names[index]);
  }, []);

  useEffect(() => {
    const intervalID = setInterval(shuffle, 1000);
    return () => clearInterval(intervalID);
  }, [shuffle]);

  const openModal = () => {
    setIsModalOpen(true);
  };



  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const openModal2 = () => {
    setIsModalOpen2(true);
};

const closeModal2 = () => {
    setIsModalOpen2(false);
};

  const [wifi, setwifi] = useState(false);
  const [ac, setac] = useState(false);
  const [parking, setparking] = useState(false);
  const [laundry, setlaundry] = useState(false);
  const [mess, setmess] = useState(false);
  const [geyser, setgeyser] = useState(false);
  const [furnished, setfurnished] = useState(false);
  const [nonfurnished, setnonfurnished] = useState(false);
  const [semifurnished, setsemifurnished] = useState(false);
  const [bathroomcond, setbathroomcond] = useState("");
  const [fur, setfur] = useState("");
  const [collid, setcollid] = useState("");
  const [nearestColl, setnearestColl] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [base, setbase] = useState("");


  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1];
        setSelectedFile(base64String);
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get('https://pgbackend.adityachoudhury.com/api/college');
        setColleges(response.data); // Assuming response.data contains the array of colleges
      } catch (error) {
        console.error('Error fetching colleges:', error);
        // Handle error gracefully, e.g., display a message to the user
      }
    };

    fetchColleges();
  }, []);





  return (
    <>
      <Navbar />
      {/* , backgroundColor: "#EEF5FF" */}

      <div style={{ width: "100%", height: "250px" }} className="hero-div ${isModalOpen ? 'blur' : ''}">
        <div style={{ display: "flex", marginTop: "80px", alignItems: "center", flexDirection: "column", gap: "20px" }}>
          <h1 style={{ textAlign: "center" }} className=" text-3xl text-white">Search {newName}</h1>
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Nearest College..." name="search" id="search" value={search} onChange={(e) => setsearch(e.target.value)} onKeyDown={handleChange} />
          </div>

        </div>

        <div style={{ display: "flex", flexDirection: "row", marginTop: "6rem" }}>
          <div className="w-1/5">
            <SidebarOwner />
          </div>
          <div className="wrap-post">
            {(isModalOpen) ? (<div className="prop-box" onClick={openModal}>
              <p style={{ background: "#FFA34D" }}>Add a new Property</p>
            </div>) : (<div className="prop-box" onClick={openModal}>
              <p>Add a New Property</p>
            </div>)}
            <div className="prop-box2" onClick={() => { navigate('/prev') }}>
              <p>Show your Previous Property</p>
            </div>
          </div>
        </div>
      </div>
      {(isModalOpen) ? (
        <div className="modal-post" style={{ width: "50rem",top:"95%" }}>
          <div className="modal-content" >
            <h1 style={{ marginBottom: "10px" }}><u>Share The Property Details:</u></h1>
            <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
              <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "0.2rem" }}>
                <input
                  type="text"
                  id="exampleInput"
                  name="exampleInput"
                  style={{ width: "49.5%" }}
                  placeholder="Enter your PG's name"
                  className="input2"
                  value={name}
                  onChange={(e) => {
                    setname(e.target.value)
                  }}
                />

                <input
                  type="text"
                  id="exampleInput"
                  name="exampleInput"
                  placeholder="Enter your phone number"
                  className="input2"
                  style={{ width: "49.5%" }}
                  value={phone}
                  onChange={(e) => {
                    setphone(e.target.value)
                  }}
                />
                <input
                  type="text"
                  id="exampleInput"
                  name="exampleInput"
                  placeholder="Enter your email"
                  className="input2"
                  style={{ width: "49.5%" }}
                  value={email}
                  onChange={(e) => {
                    setemail(e.target.value)
                  }}
                />

                <input
                  type="text"
                  id="exampleInput"
                  name="exampleInput"
                  placeholder="Enter your PG's Address"
                  className="input2"
                  style={{ width: "49.5%" }}
                  value={address}
                  onChange={(e) => {
                    setaddress(e.target.value)
                  }}
                />

                <input
                  type="text"
                  id="exampleInput"
                  name="exampleInput"
                  placeholder="Enter your PG's Rent"
                  className="input2"
                  style={{ width: "49.5%" }}
                  value={rent}
                  onChange={(e) => {
                    setrent(e.target.value)
                  }}
                />
                <input
                  type="text"
                  id="exampleInput"
                  name="exampleInput"
                  placeholder="Enter number of rooms available"
                  className="input2"
                  style={{ width: "49.5%" }}
                  value={rooms}
                  onChange={(e) => {
                    setrooms(e.target.value)
                  }}
                />
                {/* nearbyCollegesDistances */}
                <input
                  type="text"
                  id="exampleInput"
                  name="exampleInput"
                  placeholder="Enter the Distance of Nearest College in KM"
                  className="input2"
                  style={{ width: "49.5%" }}
                  value={dist}
                  onChange={(e) => {
                    setdist(e.target.value)
                  }}
                />
                <div id="exampleInput"
                  
                  className="input2"
                  style={{ width: "49.5%" , color:"grey",textAlign:"left",cursor:"pointer" }}
                  onClick={openModal2}><p>Add Nearest College</p>
                  </div>
                  <div>
                  <select className='input2' style={{width:"100%"}} onChange={(e) => {
                    setbathroomcond(e.target.value)
                    alert(bathroomcond)
                  }}    >
                    <option style={{ color: "grey", width: "80%" }} disabled selected>Select the Bathroom condition </option>
                    <option style={{ width: "49.5%" }} value="Common" >Common Bathroom</option>
                    <option style={{ width: "49.5%" }} value="Attached">Attached Bathroom</option>

                  </select>
                </div>
                <div id="exampleInput"
                   style={{ width: "100%" , color:"grey",textAlign:"left",cursor:"pointer" , display:"flex" , flexDirection:"row" , gap:"0.3rem" }}
                  className="input2"> <p style={{width:"35%"}}> Add pictures of your PG </p>
                 <input  type="file" onChange={handleFileInputChange}/>
                  </div>
                <div>
                  {isModalOpen2 && (
                    <div className="modal" style={{marginTop:"4rem" }}>
                        <div className="modal-content" >
                            <h1 style={{ marginBottom: "10px" }}><u>Select the Nearest College</u></h1>
                            <div style={{ display: "flex", flexDirection: "column", gap: "7px", height:"15rem" , overflowY:"scroll" }}>
                            {colleges.map(data => (
                      <div className='each-collName' key={data._id} value={data._id} style={{cursor:"pointer"}} onClick={() => {
                        setnearestColl(data._id)
                        closeModal2()
                      }} >{data.collegeName}</div>
                    ))}

                                </div>
                                {/* Add more content or form fields as needed */}
                               
                                <button
                                    onClick={closeModal2}
                                    className="Apply2" style={{ marginTop: "20px", marginBottom: "-25px", background: "red", height: "2rem" }}>Close</button>
                            </div>
                        </div>
            )}
                </div>
                
              </div>
              {/* <div style={{border:"2px solid grey"}}>
              <select >
                <option value="someOption">Furnished</option>
                <option value="otherOption">Not Furnished</option>
                <option value="otherOption">Semi-Furnished</option>
              </select>
              </div> */}

              <div>
                <h2 className='input2' style={{ color: "grey", fontSize: "14px", width: "100%" }}>How the property is Furnished</h2>
                <div style={{ display: "flex", flexDirection: "row", gap: "1rem", flexWrap: "wrap", marginTop: "0.7rem" }}>
                  {(furnished) ? (<button className="each-amenities" style={{ background: "rgba(32, 178, 171, 0.411)", width: "8rem" }} onClick={() => {
                    setfurnished(false)
                  }} >Fully Furnished</button>) : (<button className="each-amenities" style={{ width: "8rem" }} onClick={() => {
                    setfurnished(true)
                    setfur("Furnished")
                    setsemifurnished(false)
                    setnonfurnished(false)
                  }} >Fully Furnished</button>)}


                  {(semifurnished) ? (<button className="each-amenities" style={{ background: "rgba(32, 178, 171, 0.411)", width: "8rem" }} onClick={() => {
                    setsemifurnished(false)
                  }} >Semi Furnished</button>) : (<button className="each-amenities" style={{ width: "8rem" }} onClick={() => {
                    setfur("Semi Furnished")
                    setsemifurnished(true)
                    setnonfurnished(false)
                    setfurnished(false)
                  }} >Semi Furnished</button>)}

                  {(nonfurnished) ? (<button className="each-amenities" style={{ background: "rgba(32, 178, 171, 0.411)", width: "8rem" }} onClick={() => {
                    setnonfurnished(false)
                  }} >Non Furnished</button>) : (<button className="each-amenities" style={{ width: "8rem" }} onClick={() => {
                    setnonfurnished(true)
                    setfurnished(false)
                    setsemifurnished(false)
                    setfur("Non Furnished")
                  }} >Non Furnished</button>)}
                </div>

              </div>
              <div>
                <h2 className='input2' style={{ color: "grey", fontSize: "14px", width: "100%" }}>Select the Facilities offered</h2>
                <div style={{ display: "flex", flexDirection: "row", gap: "1rem", flexWrap: "wrap", marginTop: "0.7rem" }}>
                  {(wifi) ? (<button className="each-amenities" style={{ background: "rgba(32, 178, 171, 0.411)" }} onClick={() => {
                    setwifi(false)
                  }} >Wifi</button>) : (<button className="each-amenities" onClick={() => {
                    setwifi(true)
                  }} >Wifi</button>)}


                  {(ac) ? (<button className="each-amenities" style={{ background: "rgba(32, 178, 171, 0.411)" }} onClick={() => {
                    setac(false)
                  }} >AC</button>) : (<button className="each-amenities" onClick={() => {
                    setac(true)
                  }} >AC</button>)}

                  {(parking) ? (<button className="each-amenities" style={{ background: "rgba(32, 178, 171, 0.411)" }} onClick={() => {
                    setparking(false)
                  }} >Parking</button>) : (<button className="each-amenities" onClick={() => {
                    setparking(true)
                  }} >Parking</button>)}

                  {(mess) ? (<button className="each-amenities" style={{ background: "rgba(32, 178, 171, 0.411)" }} onClick={() => {
                    setmess(false)
                  }} >Mess</button>) : (<button className="each-amenities" onClick={() => {
                    setmess(true)
                  }} >Mess</button>)}

                  {(laundry) ? (<button className="each-amenities" style={{ background: "rgba(32, 178, 171, 0.411)" }} onClick={() => {
                    setlaundry(false)
                  }} >Laundry</button>) : (<button className="each-amenities" onClick={() => {
                    setlaundry(true)
                  }} >Laundry</button>)}

                  {(geyser) ? (<button className="each-amenities" style={{ background: "rgba(32, 178, 171, 0.411)" }} onClick={() => {
                    setgeyser(false)
                  }} >Geyser</button>) : (<button className="each-amenities" onClick={() => {
                    setgeyser(true)
                  }} >Geyser</button>)}
                </div>

              </div>

            </div>
            {/* Add more content or form fields as needed */}
           
            {/* <button onClick={() => {
              const gh = `data:image/jpeg;base64,${selectedFile}`
              console.log(gh)
            }}>get</button> */}
            <button onClick={() => {
              // if(name === "" || ownerContact === "" || address === "" || rent === "" || rooms === ""){
              //   toast("Incomplete Data")
              // }
              // else{
                alert(nearestColl)
                alert(bathroomcond)
                const gh = `data:image/jpeg;base64,${selectedFile}`


              const body = {
                name: name,
                description: "Secluded property with stunning hill views",
                ownerContact: phone,
                address: address,
                rent: rent,
                specialOffers: "Nature trails for residents",
                photos: [ gh ],
                furnished: fur,
                rooms: rooms,
                bathroom: bathroomcond,
                facilities: {
                  wifi: wifi,
                  parking: parking,
                  laundry: laundry,
                  ac: ac,
                  lift: false,
                  food: mess,
                  hotWater: geyser,
                  powerBackup: true,
                },
                nerbyColleges: [nearestColl],
                nearbyCollegesDistances: [dist]
              }

              axios.post("https://pgbackend.adityachoudhury.com/api/property/add", body, config)
                .then((res) => {
                  if (res.status === 201) {
                    alert("post done successfully")
                    // toast("DONE")
                    // navigate("/")
                    closeModal()
                  }
                  else
                    alert("error")
                }).catch((err) => {
                  //   toast("already exist")
                  toast("Incomplete Data")
                })
              // }

            }} className="Apply2" style={{ marginRight: "2rem", marginTop: "1rem", height: "2rem", background: "#3bf594" }}>Submit</button>
            {/* <button
              onClick={closeModal}
              className="Apply2" style={{ marginTop: "20px", marginBottom: "-25px", background: "red", height: "2rem" }}>Close</button> */}
          </div>
        </div>
      ) : (<div className="modal-post" style={{ width: "50rem", marginTop: "-10rem" }}>
        <div className="modal-content" >
          <p>Thank You for adding the Property</p>
        </div>
      </div>
      )}


    </>
  )
}

export default Main_Page;








import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import "../App.css";
import Product from "../components/Product";
import axios from "axios";
import Footer from "../components/Footer";

const Home = () => {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);

  const getItem = () => {
    console.log("in get");
    axios
      .get("http://localhost:8000/products")
      .then((response) => {
        setdata(response?.data);
        console.log(response?.data);
        setloading(true);
        if (!response?.data?.length) {
          axios
            .get("https://fakestoreapi.com/products?limit=20&sort=desc")
            .then((response) => {
              setdata(response?.data);
              console.log(response?.data);
              setloading(true);
            })
            .catch((e) => {
              console.log(e);
            });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getItem();
  }, []);

  return (
    <>
      <Box
        mb={10}
        sx={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "1500px",
          }}
        >
          <img
            className="home__image"
            src="https://assets-global.website-files.com/6009ec8cda7f305645c9d91b/60107f25c4e460d97bb8aec2_6002086f72b727312201e451_ecommerce-website-design-examples-p-1600.jpeg"
            alt=""
          />
        </Box>

        <Grid
          container
          spacing={5}
          sx={{
            justifyContent: "space-around",
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: { md: "1450px", sm: "900px", xs: "325px" },
          }}
        >
          {data?.map((item, i) => (
            <Grid
              item={true}
              key={i}
              xl={5.8}
              lg={5}
              md={5.3}
              sm={5.2}
              xs={11}
              mt={4}
            >
              <Product
                key={item.id}
                title={item.title ?? item.name}
                price={item.price ?? item.prices}
                image={item.image}
                loading={loading}
                id={item.id}
              />
            </Grid>
          ))}
          {/* <Grid xl={5.8} lg={5} md={5.3} sm={5.2} xs={11} mt={4}>

            {
                data.map((item, i) => 
                    
                        <Product key={item.id} title={item.title} price={item.price} rating={item.rating.rate} image={item.image} loading={loading} id={item.id}/>
                    
                )
                
            }
            </Grid> */}
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default Home;

// "https://assets-global.website-files.com/6009ec8cda7f305645c9d91b/60107f25c4e460d97bb8aec2_6002086f72b727312201e451_ecommerce-website-design-examples-p-1600.jpeg"

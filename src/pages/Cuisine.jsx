import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

function Cuisine() {
  const [cuisine, setCuisine] = useState([]);
  let params = useParams();
  
  const getCuisine = async (name) => {
    const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`)
    const recipes = await data.json();
    setCuisine(recipes.results);
  }
  
  useEffect(() => {
    getCuisine(params.type)
  }, [params.type])
  
  return (
    <Grid 
      animate={{opacity: 1}}
      initial={{opacity: 0}}
      exit={{opacity: 0}}
      transition={{duration: 0.5}}
    >
      {cuisine.map((item) => {
        return(
          <Card 
            key={item.id}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Link to={'/recipe/' + item.id}>
              <ImageWrapper>
                <img src={item.image} alt={item.title}/>
                <Overlay />
              </ImageWrapper>
              <CardContent>
                <h4>{item.title}</h4>
              </CardContent>
            </Link>
          </Card>
        )
      })}
    </Grid>
  )
}

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  
  &:hover {
    box-shadow: 0 10px 40px rgba(102, 126, 234, 0.2);
    
    img {
      transform: scale(1.05);
    }
  }
  
  a {
    text-decoration: none;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 60%, rgba(0, 0, 0, 0.1) 100%);
  pointer-events: none;
`;

const CardContent = styled.div`
  padding: 1.5rem;
  
  h4 {
    color: #2d3436;
    font-weight: 600;
    font-size: 1.1rem;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.3s ease;
  }
  
  &:hover h4 {
    color: #667eea;
  }
`;

export default Cuisine;
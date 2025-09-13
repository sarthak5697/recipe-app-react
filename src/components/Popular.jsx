import {useEffect, useState} from "react";
import styled from "styled-components";
import {Splide, SplideSlide} from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Veggie() {
  const [veggie, setVeggie] = useState([]);

  useEffect(() => {
    getVeggie();
  }, []);

  const getVeggie = async() => {
    const check = localStorage.getItem('veggie');

    if(check){
      setVeggie(JSON.parse(check));
    } else {
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=12&tags=vegetarian`);
      const data = await api.json();
      localStorage.setItem("veggie", JSON.stringify(data.recipes));
      setVeggie(data.recipes);
    }
  };

  return (
    <Wrapper>
      <Splide 
        options={{
          perPage: 3,
          arrows: true,
          pagination: false,
          drag: 'free',
          gap: '2rem',
          breakpoints: {
            1200: { perPage: 2 },
            768: { perPage: 1 }
          },
          autoplay: true,
          interval: 4500,
          pauseOnHover: true,
        }}
      >
        {veggie.map((recipe) => {
          return(
            <SplideSlide key={recipe.id}>
              <Link to={"/recipe/" + recipe.id}>
                <Card
                  as={motion.div}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <ImageContainer>
                    <img src={recipe.image} alt={recipe.title} />
                    <Overlay />
                  </ImageContainer>
                  <ContentWrapper>
                    <Badge>Vegetarian</Badge>
                    <Title>{recipe.title}</Title>
                    <Stats>
                      <StatItem>
                        <span>⏱</span>
                        {recipe.readyInMinutes || 30} min
                      </StatItem>
                      <StatItem>
                        <span>🥗</span>
                        Healthy
                      </StatItem>
                    </Stats>
                  </ContentWrapper>
                </Card>
              </Link>
            </SplideSlide>
          );
        })}
      </Splide>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 3rem 0rem;
  
  .splide__arrow {
    background: white;
    opacity: 0.9;
    border-radius: 50%;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    
    svg {
      fill: #4ecdc4;
    }
    
    &:hover {
      opacity: 1;
      transform: scale(1.1);
      box-shadow: 0 6px 20px rgba(78, 205, 196, 0.3);
    }
  }
  
  .splide__arrow--prev {
    left: -2rem;
  }
  
  .splide__arrow--next {
    right: -2rem;
  }
`;

const Card = styled.div`
  position: relative;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  height: 380px;
  
  &:hover {
    box-shadow: 0 10px 40px rgba(78, 205, 196, 0.25);
    
    img {
      transform: scale(1.1);
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 60%;
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
  background: linear-gradient(
    to bottom,
    transparent 0%,
    transparent 50%,
    rgba(0, 0, 0, 0.1) 100%
  );
  pointer-events: none;
`;

const ContentWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  padding: 1.5rem;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Badge = styled.span`
  position: absolute;
  top: -15px;
  left: 1.5rem;
  background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
  color: white;
  padding: 0.3rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 15px rgba(78, 205, 196, 0.3);
`;

const Title = styled.h4`
  color: #2d3436;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.4;
  margin: 0.5rem 0 1rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.3s ease;
  
  ${Card}:hover & {
    color: #4ecdc4;
  }
`;

const Stats = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: auto;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: #666;
  font-size: 0.9rem;
  
  span {
    font-size: 1rem;
  }
`;

export default Veggie;
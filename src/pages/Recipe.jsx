import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

function Recipe() {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");

  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const detailData = await data.json();
    setDetails(detailData);
  };

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  return (
    <DetailWrapper
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ImageSection>
        <RecipeTitle>{details.title}</RecipeTitle>
        <ImageContainer>
          <img src={details.image} alt={details.title} />
          <ImageOverlay />
        </ImageContainer>
      </ImageSection>

      <InfoSection>
        <TabContainer>
          <TabButton
            className={activeTab === "instructions" ? "active" : ""}
            onClick={() => setActiveTab("instructions")}
          >
            <span>📝</span> Instructions
          </TabButton>
          <TabButton
            className={activeTab === "ingredients" ? "active" : ""}
            onClick={() => setActiveTab("ingredients")}
          >
            <span>🥘</span> Ingredients
          </TabButton>
        </TabContainer>

        <ContentArea>
          {activeTab === "instructions" && (
            <Instructions
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Summary
                dangerouslySetInnerHTML={{ __html: details.summary }}
              ></Summary>
              <InstructionText
                dangerouslySetInnerHTML={{ __html: details.instructions }}
              ></InstructionText>
            </Instructions>
          )}

          {activeTab === "ingredients" && (
            <Ingredients
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {details.extendedIngredients?.map((ingredient) => (
                <IngredientItem key={ingredient.id}>
                  <CheckMark>✓</CheckMark>
                  <span>{ingredient.original}</span>
                </IngredientItem>
              ))}
            </Ingredients>
          )}
        </ContentArea>
      </InfoSection>
    </DetailWrapper>
  );
}

const DetailWrapper = styled(motion.div)`
  max-width: 1200px;
  margin: 3rem auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  padding: 0 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const RecipeTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;
`;

const ImageContainer = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.1) 0%, transparent 50%);
  pointer-events: none;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const TabButton = styled.button`
  padding: 1rem 2rem;
  background: white;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  color: #666;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    font-size: 1.2rem;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.12);
  }

  &.active {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 5px 20px rgba(102, 126, 234, 0.3);
  }
`;

const ContentArea = styled.div`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  min-height: 400px;
`;

const Instructions = styled(motion.div)`
  color: #333;
  line-height: 1.8;
`;

const Summary = styled.h3`
  font-size: 1.1rem;
  font-weight: 400;
  margin-bottom: 2rem;
  color: #666;
  line-height: 1.8;

  a {
    color: #667eea;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const InstructionText = styled.div`
  font-size: 1rem;
  color: #444;
  line-height: 1.8;

  ol,
  ul {
    margin: 1rem 0;
    padding-left: 1.5rem;
  }

  li {
    margin: 0.5rem 0;
  }
`;

const Ingredients = styled(motion.ul)`
  list-style: none;
  padding: 0;
`;

const IngredientItem = styled.li`
  display: flex;
  align-items: center;
  padding: 1rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #f0f2f5 100%);
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%);
    transform: translateX(5px);
  }

  span {
    color: #333;
    font-size: 1.05rem;
  }
`;

const CheckMark = styled.span`
  color: #4ecdc4;
  font-weight: bold;
  margin-right: 1rem;
  font-size: 1.2rem;
`;

export default Recipe;

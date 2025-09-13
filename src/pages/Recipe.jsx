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
    <Container>
      {/* Hero Section with Image and Basic Info */}
      <HeroSection
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <HeroImage>
          <img src={details.image} alt={details.title} />
          <Gradient />
        </HeroImage>
        <HeroContent>
          <RecipeTitle>{details.title}</RecipeTitle>
          <MetaInfo>
            {details.readyInMinutes && (
              <MetaItem>
                <MetaIcon>⏱</MetaIcon>
                <div>
                  <MetaLabel>Cook Time</MetaLabel>
                  <MetaValue>{details.readyInMinutes} minutes</MetaValue>
                </div>
              </MetaItem>
            )}
            {details.servings && (
              <MetaItem>
                <MetaIcon>👥</MetaIcon>
                <div>
                  <MetaLabel>Servings</MetaLabel>
                  <MetaValue>{details.servings} people</MetaValue>
                </div>
              </MetaItem>
            )}
            {details.healthScore && (
              <MetaItem>
                <MetaIcon>💪</MetaIcon>
                <div>
                  <MetaLabel>Health Score</MetaLabel>
                  <MetaValue>{details.healthScore}/100</MetaValue>
                </div>
              </MetaItem>
            )}
          </MetaInfo>
          {details.summary && (
            <Summary dangerouslySetInnerHTML={{ __html: details.summary }} />
          )}
        </HeroContent>
      </HeroSection>

      {/* Tabbed Content Section */}
      <ContentSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <TabContainer>
          <TabButton
            className={activeTab === "instructions" ? "active" : ""}
            onClick={() => setActiveTab("instructions")}
          >
            <span>📖</span> Instructions
          </TabButton>
          <TabButton
            className={activeTab === "ingredients" ? "active" : ""}
            onClick={() => setActiveTab("ingredients")}
          >
            <span>🥘</span> Ingredients
          </TabButton>
          <TabButton
            className={activeTab === "nutrition" ? "active" : ""}
            onClick={() => setActiveTab("nutrition")}
          >
            <span>📊</span> Nutrition
          </TabButton>
        </TabContainer>

        <TabContent>
          {activeTab === "instructions" && (
            <InstructionsTab
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {details.instructions ? (
                <InstructionContent>
                  <SectionTitle>How to Make It</SectionTitle>
                  <InstructionText
                    dangerouslySetInnerHTML={{ __html: details.instructions }}
                  />
                </InstructionContent>
              ) : (
                <EmptyState>
                  <span>📝</span>
                  <p>No instructions available for this recipe.</p>
                </EmptyState>
              )}
            </InstructionsTab>
          )}

          {activeTab === "ingredients" && (
            <IngredientsTab
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SectionTitle>What You'll Need</SectionTitle>
              <IngredientsGrid>
                {details.extendedIngredients?.map((ingredient) => (
                  <IngredientCard key={ingredient.id}>
                    <IngredientImage>
                      {ingredient.image ? (
                        <img
                          src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                          alt={ingredient.name}
                        />
                      ) : (
                        <PlaceholderIcon>🥄</PlaceholderIcon>
                      )}
                    </IngredientImage>
                    <IngredientInfo>
                      <IngredientName>{ingredient.name}</IngredientName>
                      <IngredientAmount>{ingredient.original}</IngredientAmount>
                    </IngredientInfo>
                  </IngredientCard>
                ))}
              </IngredientsGrid>
            </IngredientsTab>
          )}

          {activeTab === "nutrition" && (
            <NutritionTab
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SectionTitle>Nutritional Information</SectionTitle>
              {details.nutrition ? (
                <NutritionGrid>
                  {details.nutrition.nutrients?.slice(0, 9).map((nutrient) => (
                    <NutritionCard key={nutrient.name}>
                      <NutrientValue>
                        {Math.round(nutrient.amount)}
                      </NutrientValue>
                      <NutrientUnit>{nutrient.unit}</NutrientUnit>
                      <NutrientName>{nutrient.name}</NutrientName>
                    </NutritionCard>
                  ))}
                </NutritionGrid>
              ) : (
                <EmptyState>
                  <span>📊</span>
                  <p>Nutritional information not available.</p>
                </EmptyState>
              )}
            </NutritionTab>
          )}
        </TabContent>
      </ContentSection>
    </Container>
  );
}

// Container and Layout Styles
const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
`;

const HeroSection = styled(motion.div)`
  background: white;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  margin-bottom: 3rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 500px;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    min-height: auto;
  }
`;

const HeroImage = styled.div`
  position: relative;
  height: 100%;
  min-height: 500px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 968px) {
    min-height: 300px;
  }
`;

const Gradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent);
`;

const HeroContent = styled.div`
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 968px) {
    padding: 2rem;
  }
`;

const RecipeTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

// Meta Information Styles
const MetaInfo = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const MetaIcon = styled.span`
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 12px;
`;

const MetaLabel = styled.div`
  font-size: 0.85rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const MetaValue = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
`;

const Summary = styled.div`
  font-size: 1.05rem;
  line-height: 1.7;
  color: #666;

  a {
    color: #667eea;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

// Content Section Styles
const ContentSection = styled(motion.div)`
  background: white;
  border-radius: 30px;
  padding: 3rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
  border-bottom: 2px solid #f0f2f5;
  padding-bottom: 1rem;
  flex-wrap: wrap;
`;

const TabButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: transparent;
  border: 2px solid transparent;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  color: #888;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    font-size: 1.2rem;
  }

  &:hover {
    background: #f8f9fa;
    color: #667eea;
  }

  &.active {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-color: transparent;
    box-shadow: 0 5px 20px rgba(102, 126, 234, 0.3);
  }
`;

const TabContent = styled.div`
  min-height: 400px;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #333;
`;

// Instructions Tab
const InstructionsTab = styled(motion.div)``;

const InstructionContent = styled.div``;

const InstructionText = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;

  ol,
  ul {
    margin: 1.5rem 0;
    padding-left: 2rem;
  }

  li {
    margin: 1rem 0;
    line-height: 1.8;
  }

  p {
    margin: 1rem 0;
  }
`;

// Ingredients Tab
const IngredientsTab = styled(motion.div)``;

const IngredientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
`;

const IngredientCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 16px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const IngredientImage = styled.div`
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PlaceholderIcon = styled.span`
  font-size: 1.5rem;
`;

const IngredientInfo = styled.div`
  flex: 1;
`;

const IngredientName = styled.div`
  font-weight: 600;
  color: #333;
  text-transform: capitalize;
  margin-bottom: 0.25rem;
`;

const IngredientAmount = styled.div`
  font-size: 0.9rem;
  color: #666;
`;

// Nutrition Tab
const NutritionTab = styled(motion.div)``;

const NutritionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
`;

const NutritionCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
`;

const NutrientValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
`;

const NutrientUnit = styled.div`
  font-size: 0.9rem;
  opacity: 0.9;
  margin-bottom: 0.5rem;
`;

const NutrientName = styled.div`
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.95;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #888;

  span {
    font-size: 3rem;
    display: block;
    margin-bottom: 1rem;
    opacity: 0.5;
  }

  p {
    font-size: 1.1rem;
  }
`;

export default Recipe;

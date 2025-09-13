import Veggie from "../components/Veggie";
import Popular from "../components/Popular";
import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

function Home() {
  return (
    <HomeContainer
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Section>
        <SectionTitle
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          🥗 Vegetarian Picks
        </SectionTitle>
        <Veggie/>
      </Section>

      <Section>
        <SectionTitle
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          🔥 Popular Choices
        </SectionTitle>
        <Popular/>
      </Section>
    </HomeContainer>
  );
}

const HomeContainer = styled(motion.div)`
  padding: 2rem 0;
`;

const Section = styled.div`
  margin-bottom: 4rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
`;

export default Home;

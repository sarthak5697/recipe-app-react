import Home from "./Home";
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Recipe from "./Recipe";
import Cuisine from "./Cuisine";
import Searched from "../pages/Searched";
import { AnimatePresence, motion } from "framer-motion";

function Pages() {
  const location = useLocation();

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    in: {
      opacity: 1,
      y: 0,
    },
    out: {
      opacity: 0,
      y: -20,
    },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4,
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/cuisine/:type"
          element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Cuisine />
            </motion.div>
          }
        />
        <Route
          path="/searched/:search"
          element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Searched />
            </motion.div>
          }
        />
        <Route
          path="/recipe/:name"
          element={
            <motion.div
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Recipe />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default Pages;

import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Search() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/searched/" + input);
  };

  return (
    <FormStyle onSubmit={submitHandler}>
      <SearchWrapper>
        <FaSearch />
        <input
          onChange={(e) => setInput(e.target.value)}
          type="text"
          value={input}
          placeholder="Search for recipes..."
        />
      </SearchWrapper>
    </FormStyle>
  );
}

const FormStyle = styled.form`
  margin: 2rem auto;
  max-width: 800px;
  padding: 0 1rem;
`;

const SearchWrapper = styled.div`
  position: relative;
  width: 100%;

  input {
    width: 100%;
    border: none;
    background: white;
    font-size: 1.1rem;
    color: #333;
    padding: 1.2rem 3.5rem;
    border-radius: 50px;
    outline: none;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    font-family: "Poppins", sans-serif;

    &:focus {
      box-shadow: 0 8px 30px rgba(102, 126, 234, 0.3);
      transform: translateY(-2px);
    }

    &::placeholder {
      color: #999;
      font-weight: 300;
    }
  }

  svg {
    position: absolute;
    top: 50%;
    left: 1.3rem;
    transform: translateY(-50%);
    color: #667eea;
    font-size: 1.2rem;
    transition: all 0.3s ease;
  }

  &:focus-within svg {
    color: #764ba2;
    transform: translateY(-50%) scale(1.1);
  }
`;

export default Search;

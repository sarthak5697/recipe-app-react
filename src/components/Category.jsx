import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiChopsticks } from "react-icons/gi";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

function Category() {
  return (
    <List>
      <SLink to={"/cuisine/Italian"}>
        <IconWrapper>
          <FaPizzaSlice />
        </IconWrapper>
        <h4>Italian</h4>
      </SLink>
      <SLink to={"/cuisine/American"}>
        <IconWrapper>
          <FaHamburger />
        </IconWrapper>
        <h4>American</h4>
      </SLink>
      <SLink to={"/cuisine/Thai"}>
        <IconWrapper>
          <GiNoodles />
        </IconWrapper>
        <h4>Thai</h4>
      </SLink>
      <SLink to={"/cuisine/Japanese"}>
        <IconWrapper>
          <GiChopsticks />
        </IconWrapper>
        <h4>Japanese</h4>
      </SLink>
    </List>
  );
}

const List = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 3rem 0rem;
  flex-wrap: wrap;
`;

const IconWrapper = styled.div`
  width: 70px;
  height: 70px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

const SLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;

  h4 {
    color: #333;
    font-size: 0.9rem;
    margin-top: 0.8rem;
    font-weight: 500;
    transition: all 0.3s ease;
  }

  svg {
    color: #667eea;
    font-size: 1.8rem;
    transition: all 0.3s ease;
  }

  &:hover ${IconWrapper} {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  &:hover svg {
    color: white;
    transform: scale(1.1);
  }

  &:hover h4 {
    color: #667eea;
    font-weight: 600;
  }

  &.active ${IconWrapper} {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    box-shadow: 0 6px 20px rgba(245, 87, 108, 0.4);
    transform: translateY(-3px);
  }

  &.active svg {
    color: white;
  }

  &.active h4 {
    color: #f5576c;
    font-weight: 600;
  }
`;

export default Category;

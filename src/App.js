import Category from "./components/Category";
import Pages from "./pages/Pages";
import { BrowserRouter, Link } from 'react-router-dom';
import Search from "./components/Search";
import styled from "styled-components";
import { GiKnifeFork } from "react-icons/gi";

function App() {
  return (
    <AppWrapper>
      <BrowserRouter basename="/recipe-app-react">
        <Nav>
          <LogoWrapper to={"/"}>
            <IconWrapper>
              <GiKnifeFork />
            </IconWrapper>
            <Logo>Deliciousss</Logo>
          </LogoWrapper>
        </Nav>
        <Search />
        <Category />
        <Pages />
      </BrowserRouter>
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const Nav = styled.nav`
  padding: 2rem 0rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoWrapper = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  
  svg {
    font-size: 1.5rem;
    color: white;
  }
`;

const Logo = styled.span`
  font-size: 2rem;
  font-weight: 700;
  font-family: 'Lobster Two', cursive;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export default App;
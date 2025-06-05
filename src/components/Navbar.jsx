import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';

const Container = styled(motion.div)`
  height: 80px;
  padding: 20px 40px;
  margin: 40px 80px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgb(201, 218, 237);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  position: relative;

  @media (max-width: 950px) {
    padding: 15px 24px;
    margin: 20px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LogoImage = styled.img`
  width: 30px;
`;

const LogoTitle = styled.p`
  color: black;
  font-size: 1.3rem;
  font-weight: 520;
`;

const NavMenu = styled.ul`
  display: none;
`;

const ActionGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 950px) {
    display: none;
  }
`;

const ResumeButton = styled(motion.a)`
  padding: 10px 24px;
  border-radius: 30px;
  background: #0467d5;
  cursor: pointer;
  color: white;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: 2px solid transparent;

  &:hover {
    transform: scale(1.1);
    background: transparent;
    color: #0467d5;
    border-color: #0467d5;
  }
`;

const HamBurgerContainer = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 950px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 40%;
  height: 100vh;
  backdrop-filter: blur(18px);
  background: rgba(255, 255, 255, 0.85);
  box-shadow: -5px 0 30px rgba(0, 0, 0, 0.1);
  padding: 90px 30px 30px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  z-index: 999;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;

  @media (max-width: 360px) {
    width: 60%;
  }
`;

const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 998;
`;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const navigate = useNavigate();

  return (
    <>
      <Container
        initial={{ y: -50, opacity: 0, filter: 'blur(5px)' }}
        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <Logo
          as={motion.div}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          onClick={() => navigate('/')}
        >
          <LogoImage src='/assets/mylogo.png' />
          <LogoTitle>Sahil Raza</LogoTitle>
        </Logo>

        <NavMenu />

        <HamBurgerContainer onClick={toggleMenu}>
          <Menu size={28} />
        </HamBurgerContainer>

        <ActionGroup
          as={motion.div}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          <ResumeButton
            href="https://sahilraza.onrender.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            My Portfolio
          </ResumeButton>
        </ActionGroup>
      </Container>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <Backdrop
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMenu}
            />
            <MobileMenu
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <div style={{ alignSelf: 'flex-end', cursor: 'pointer' }} onClick={closeMenu}>
                <X size={28} />
              </div>

              <ResumeButton
                href="https://sahilraza.onrender.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                My Portfolio
              </ResumeButton>
            </MobileMenu>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem 2rem;
  min-height: 70vh;
`;

const Card = styled(motion.div)`
  background: #ffffff;
  border-radius: 32px;
  padding: 3rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  text-align: center;
  max-width: 500px;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #0467d5;
  margin-bottom: 1rem;
`;

const Message = styled.p`
  font-size: 1.1rem;
  color: #444;
  margin-bottom: 1.5rem;
`;

const WorkLink = styled.a`
  display: inline-block;
  margin-top: 1.5rem;
  padding: 0.8rem 1.6rem;
  background-color: #0467d5;
  color: white;
  border-radius: 24px;
  text-decoration: none;
  font-weight: 600;
  transition: 0.3s ease;

  &:hover {
    background-color: #0357ba;
    transform: scale(1.05);
  }
`;

const ThankYou = () => {
  const location = useLocation();
  const name = location.state?.name || 'Friend';

  return (
    <Wrapper>
      <Card
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 180, damping: 12 }}
      >
        <Title>Thank You, {name}!</Title>
        <Message>Your words made my day. I'm truly grateful for your kind feedback! 🌱</Message>
        <Message>Want to check out some of my work?</Message>
        <WorkLink href="https://sahilraza.onrender.com/projects" target="_blank" rel="noopener noreferrer">
          View My Projects
        </WorkLink>
      </Card>
    </Wrapper>
  );
};

export default ThankYou;

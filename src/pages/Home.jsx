import React from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Form from '../components/Form'
import TestimonialForm from '../components/Form'

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  transition: all 0.3s ease;
  position: relative;
  overflow-x: hidden;
`;

const Home = () => {
  return (
    <Container>
        <Navbar/>
        <TestimonialForm/>
    </Container>
  )
}

export default Home
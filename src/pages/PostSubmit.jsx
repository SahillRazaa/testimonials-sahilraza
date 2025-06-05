import React from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import Form from '../components/Form'
import ThankYou from '../components/ThankYou'

const Container = styled.div`
    background-color: #f1f5f9;
    width: 100vw;
    height: 100vh;
    transition: all 0.3 ease;
    position: relative;
    overflow: hidden;
`

const PostSubmit = () => {
  return (
    <Container>
        <Navbar/>
        <ThankYou/>
    </Container>
  )
}

export default PostSubmit
import React from 'react';
import styled from 'styled-components';
import {
  LinearProgress,
} from '@mui/material';
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
  text-align: center;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  color: white;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 150px;
  height: 150px;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 1rem 0;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const IconsContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const IconLink = styled.a`
  color: white;
  font-size: 2rem;

  &:hover {
    color: #61dafb;
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <ProfileImage src="https://via.placeholder.com/150" alt="Profile" />
      <Title>Web Developer</Title>
      <Subtitle>Hi! Welcome to my website, built with React.</Subtitle>
      <IconsContainer>
        <IconLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-linkedin"></i>
        </IconLink>
        <IconLink href="https://github.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-github"></i>
        </IconLink>
      </IconsContainer>
      <LinearProgress color="secondary" />
    </HomeContainer>
  );
};

export default Home;

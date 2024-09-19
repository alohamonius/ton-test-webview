import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const WelcomePage = () => {
  const [moonImage, setMoonImage] = useState("");

  useEffect(() => {
    // You can replace this with any free moon image link or an API call
    const fetchMoonImage = async () => {
      try {
        const response = await axios.get(
          "https://api.unsplash.com/photos/random",
          {
            params: { query: "moon" },
            headers: {
              Authorization: "Client-ID YOUR_UNSPLASH_ACCESS_KEY",
            },
          }
        );
        setMoonImage(response.data.urls.regular);
      } catch (error) {
        console.error("Error fetching moon image:", error);
      }
    };
    fetchMoonImage();
  }, []);

  return (
    <Container id="text-container">
      <Title>Welcome to the Full Moon Calendar</Title>

      {/* <Subtitle>
        Discover how many full moons have graced your birthday!
      </Subtitle>
      <MoonImage
        src={moonImage || "https://example.com/default-moon.jpg"}
        alt="Full Moon"
      />
      <Footer>
        <p>
          Start exploring the lunar phases and the mysteries of the full moon!
        </p>
      </Footer> */}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #1a1a1d;
  color: #fff;
  text-align: center;
  padding: 20px;

  @media (prefers-color-scheme: dark) {
    background-color: #111;
    color: #fefefe;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 30px;
`;

const MoonImage = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
`;

const Footer = styled.div`
  margin-top: 40px;
`;

export default WelcomePage;

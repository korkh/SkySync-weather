import styled from "styled-components";

export const WeatherContainer = styled.div`
  background-color: ${({ theme }) => theme.container_BgColor};
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 1.5rem 2rem;
  display: flex;
  flex-direction: column;
`;
export const Title = styled.h6`
  font-weight: 400;
  font-size: ${({ theme }) => theme.fontSize.big};
  color: ${({ theme }) => theme.titleColor};
`;
export const CurrentWeatherContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;
export const CurrentWeatherStatus = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 1.5rem;
  width: 25rem;

  @media (max-width: 800px) {
    margin: 2rem 0rem;
  }

  h4 {
    font-weight: 600;
    font-size: 1.25rem;
    color: #396bae;
    margin-bottom: 2rem;
  }
  span {
    display: flex;
    font-weight: 200;
    font-size: 6rem;
    color: red;
    margin-left: 1.5rem;
    line-height: 1;
    sup {
      line-height: 0;
    }
  }
  h6 {
    font-size: ${({ theme }) => theme.fontSize.medium};
    text-align: left;
    color: #7b98b2;
  }
`;
export const CurrentWeatherInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem;
  margin: 2rem 1rem;
  margin-left: 2rem;

  background: rgba(230, 255, 255, 0.3); /* Background color with opacity */
  backdrop-filter: blur(10px); /* Frosted glass effect */
  border: 1px solid rgba(0, 0, 0, 0.1); /* Very light visible border */
  border-radius: 10px; /* Rounded corners */
  padding: 1rem; /* Add padding for better spacing */

  /* Additional styles for your content */
  font-size: ${({ theme }) => theme.fontSize.medium};
  color: ${({ theme }) => theme.titleColor};
`;
export const FeelsLike = styled.div`
  display: flex;
  font-weight: 600;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.medium};
  color: #7b98b2;
  span {
    color: inherit;
  }
`;
export const HighLowContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  width: 2rem;
`;
export const WeatherDegree = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1.25rem;
  color: #3a86ca;
  margin-top: 0.8rem;
  margin-right: 2.5rem;
  svg {
    fill: ${({ theme }) => theme.smallIconColor};
    margin-right: 1rem;
  }
`;
export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.8rem;
  div {
    color: ${({ theme }) => theme.smallIconTextColor};
    display: flex;
    align-items: center;
    font-size: 1rem;
    width: 8rem;
  }
  svg {
    fill: ${({ theme }) => theme.smallIconColor};
    margin-right: 1rem;
    width: 1.6rem;
    margin-left: -0.3rem;
  }
  span {
    color: #3080c8;
    font-weight: 500;
    font-size: 1rem;
  }
`;

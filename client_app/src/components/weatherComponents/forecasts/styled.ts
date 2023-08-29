import styled from "styled-components";

export const ForecastContainer = styled.div`
  margin-top: 1rem;
  background-color: ${({ theme }) => theme.forecastPanelBgColor};
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 1.5rem 2rem;
  overflow: hidden;
`;
export const SectionTitle = styled.h6`
  font-weight: 500;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.panelTitleColor};
`;
export const ForecastItems = styled.div`
  display: block;
  justify-content: space-between;
  overflow-x: auto;
  cursor: pointer;

  > :last-child {
    margin-right: 0;
  }
`;

export const ForecastItemContainer = styled.div`
  display: flex;
  align-items: center;
  text-align: center;

  margin-top: 1rem;
  border-top: 1px solid #ccc;
  padding-top: 1rem;
  &:first-child {
    margin: 0 1rem 0 1rem;
  }
  &:last-child {
    margin-right: 1rem;
  }
  h6 {
    font-weight: 600;
    font-size: 1.5rem;
    color: #4581c5;
  }
  h3 {
    font-weight: 600;
    font-size: 2rem;
    color: red;
  }
  svg {
    width: 5rem;
    height: 5rem;
    margin: 0.5rem 1rem 0.5rem 2rem;
  }
  p {
    font-weight: 600;
    font-size: 1.125rem;
    color: #4a6fa1;
    margin-right: 1rem;
  }
  span {
    font-size: 1.125rem;
    color: #4a6fa1;
    text-align: left;
    &:first-child {
      margin: 0 5rem 0 1rem;
    }
    &:last-child {
      margin-right: 1rem;
    }
  }
  div {
    flex: 1; /* Take remaining space */
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:first-child {
      right: 0;
    }
  }
`;

export const ForecastMainItemContainer = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  background: rgba(230, 255, 255, 0.3); /* Background color with opacity */
  backdrop-filter: blur(10px); /* Frosted glass effect */
  border: 1px solid rgba(0, 0, 0, 0.1); /* Very light visible border */
  border-radius: 10px;
  padding: 0.5rem; /* Add padding for better spacing */
  margin-top: 1rem;
  border-top: 1px solid #ccc;
  padding-top: 1rem;
  h6 {
    font-weight: 600;
    font-size: 1rem;
    color: #4581c5;
  }
  h3 {
    font-weight: 600;
    font-size: 2rem;
    color: red;
    margin: 0;
  }
  svg {
    width: 5rem;
    height: 5rem;
    margin: 0.5rem 1rem 0.5rem 2rem;
  }
  p {
    font-weight: 600;
    font-size: 1.125rem;
    color: #4a6fa1;
    margin-right: 1rem;
  }
  span {
    color: #4a6fa1;
    text-align: center;
    &:first-child {
      margin-right: 5rem;
    }
    &:last-child {
      margin-right: 1rem;
    }
  }
  div {
    flex: 1; /* Take remaining space */
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const ToggleAllButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: transparent;
  display: contents;
  position: relative;

  /* Tooltip */
  &::after {
    content: "Collapse all";
    position: absolute;
    bottom: 15%; /* Position above the button */
    right: 23%;
    background-color: teal;
    color: white;
    padding: 5px;
    border-radius: 5px;
    font-size: 1rem;
    opacity: 0; /* Initially hidden */
    visibility: hidden; /* Initially hidden */
    transition: opacity 0.2s ease, visibility 0.2s ease;
    z-index: 10;
  }

  &:hover::after {
    opacity: 1; /* Show tooltip on hover */
    visibility: visible; /* Show tooltip on hover */
  }

  @media (max-width: 768px) {
    &::after {
      bottom: -28%;
      right: 10%;
    }
  }
`;

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
  h6 {
    font-weight: 600;
    font-size: 1.5rem;
    color: #4581c5;
    margin-right: 1rem; /* Add some spacing between elements */
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
    margin-right: 1rem; /* Add some spacing between elements */
  }
  span {
    font-size: 1.125rem;
    color: #4a6fa1;
    width: 10rem;
    text-align: center;
  }
  div {
    flex: 1; /* Take remaining space */
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

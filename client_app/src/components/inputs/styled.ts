import styled from "styled-components";

export const SearchElement = styled.div`
  position: relative;
  width: 40vw;
  min-width: 40vw;
  height: 3.25rem;
  border-radius: 26px;
  background: ${({ theme }) => theme.container_BgColor};
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.4rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  z-index: 1;
  @media (max-width: 768px) {
    width: 92vw;
  }
`;
export const SearchInput = styled.input`
  flex: 1;
  margin-left: 1rem;
  height: 3.25rem;
  border: none;
  background-color: ${({ theme }) => theme.container_BgColor};
  font-size: 1.125rem;
  color: ${({ theme }) => theme.searchInput.color};
  width: 100%;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${({ theme }) => theme.searchInput.placeholderColor};
  }
`;

export const LocationButton = styled.button`
  border: none;
  cursor: pointer;
  background-color: transparent;
  height: 100%;
  display: contents;
  position: relative;
  /* Tooltip */
  &::before {
    content: "Get Weather for Current Location"; /* Tooltip text */
    position: absolute;
    bottom: 80%; /*?? Position above the button */
    right: 5%;
    /* transform: translateX(-50%); */
    background-color: teal;
    color: white;
    padding: 5px;
    border-radius: 5px;
    font-size: 1rem;
    opacity: 0; /* Initially hidden */
    visibility: hidden; /* Initially hidden */
    transition: opacity 0.2s ease, visibility 0.2s ease;
  }

  &:hover::before {
    opacity: 1; /* Show tooltip on hover */
    visibility: visible; /* Show tooltip on hover */
  }
`;

export const SearchResult = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  background: ${({ theme }) => theme.searchSuggestion.backgroundColor};
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
  width: 98%;
  left: 1%;
  top: 3.35rem;
  border-radius: 5px;
  overflow: hidden;
`;

export const SuggestionItem = styled.a`
  color: #2079c9;
  text-decoration: none;
  padding: 0.6rem 1rem;
  display: block;
  text-align: left;
  border-bottom: 1px dotted
    ${({ theme }) => theme.searchSuggestion.seperatorLineColor};
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) =>
      theme.searchSuggestion.hoverBackgroundColor};
  }
`;

import React from "react";
import styled from "styled-components";
import Button from "./Button";
import Search from "./Search";
import DynamicButton from "./DynamicButton";
import { Type1, Type3, Type4, Type5 } from "./Typography";
const StyledHeader = styled.header`
  .header__left {
    padding-left: 8px;
    padding-right: 24px;
    width: 132px;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 0 -4px;
    width: calc(100% - 132px);
  }

  .action {
    margin: 0 12px;
  }

  .actions > .action:first-child {
    flex-grow: 1;
  }

  .search {
    display: flex;
    justify-content: flex-start;
  }

  .search form {
    flex-grow: 0;
    width: 296px;
  }
`;

const Header = ({ avatar, hidden }) => {
  return (
    <StyledHeader className={`page__header${hidden ? " hidden" : ""}`}>
      <div className="header__left">
  

      <p className="frame__tagline">Front-end experimentation</p>

    
      </div>
      <ul className="list actions">
        <li className="list__item action">
          <Search className="search" />
        </li>
        <li className="list__item action">
          <DynamicButton
            regular={
              <Button className="button" primary>
              View More
              </Button>
            }
            small={
              <Button
                className="button button--icon"
                icon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.99976 8.9998L13.6568 8.9998C14.2097 8.9998 14.6566 8.55291 14.6566 7.99995C14.6566 7.44699 14.2097 7.0001 13.6568 7.0001L8.99976 7.0001L8.99976 2.34309C8.99976 1.79014 8.55287 1.34325 7.99991 1.34325C7.44695 1.34325 7.00006 1.79014 7.00006 2.34309L7.00006 7.0001L2.34305 7.0001C1.7901 7.0001 1.34321 7.44699 1.34321 7.99995C1.3425 8.27643 1.45493 8.52604 1.63595 8.70706C1.81697 8.88808 2.06728 8.9998 2.34305 8.9998L7.00006 8.9998V13.6568C6.99935 13.9333 7.11178 14.1829 7.2928 14.3639C7.47382 14.5449 7.72414 14.6567 7.99991 14.6567C8.55287 14.6567 8.99976 14.2098 8.99976 13.6568V8.9998Z"
                      fill="black"
                    />
                  </svg>
                }
                primary
              />
            }
          />
        </li>
        <div className="frame__demos">
      <a
        href="http://isengupt.github.io/real-glitch/"
        activeClassName="frame__demo--current"
        className="frame__demo"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          width="16"
          height="16"
        >
          <path
            fill-rule="evenodd"
            d="M7.78 12.53a.75.75 0 01-1.06 0L2.47 8.28a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 1.06L4.81 7h7.44a.75.75 0 010 1.5H4.81l2.97 2.97a.75.75 0 010 1.06z"
          ></path>
        </svg>
      </a>
      <a
        href="https://github.com/isengupt/dependencies-web/"
        activeClassName="frame__demo--current"
        className="frame__demo"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          width="16"
          height="16"
        >
          <path
            fill-rule="evenodd"
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
          ></path>
        </svg>
      </a>
      <a
    href='#'
        activeClassName="frame__demo--current"
        className="frame__demo"

       
                 
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          width="16"
          height="16"
        >
          <path
            fill-rule="evenodd"
            d="M8 2a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5 0v-4.5h-4.5a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 018 2z"
          ></path>
        </svg>
      </a>
    </div>
      
    
      </ul>
    </StyledHeader>
  );
};

export default Header;

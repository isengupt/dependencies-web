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
  <Type1>
          Dependencies Network
          </Type1>
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
      
    
      </ul>
    </StyledHeader>
  );
};

export default Header;

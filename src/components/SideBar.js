import React, { useState } from "react";
import styled from "styled-components";
import { Type1, Type3, Type4, Type5 } from "./Typography";
import TwoStatesInteractiveIcon from "./TwoStatesInteractiveIcon";
import Slider from "@material-ui/core/Slider";
import content from "./content";
import Button from "./Button";
import MenuIcon from "@material-ui/icons/AddOutlined";

import "date-fns";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NodeInfo from "../NodeInfo"
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const StyledSideBar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  background-color: #2b3034;
  height: 100%;
  width: 398px;
  box-sizing: border-box;
  padding: 8px 0;

  .sidebar__tab {
    width: 56px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .sidebar__items {
    padding: 8px;
  }

  .sidebar__item {
    button,
    a {
      display: inline-block;
      background-color: transparent;
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      box-sizing: border-box;
      padding: 8px;
      cursor: pointer;
      transition: background-color 0.15s ${({ content }) => content.ease};
    }

    button:focus {
      outline: none;
    }

    span {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
      box-sizing: content-box;
      transition: transform 0.15s ${({ content }) => content.ease};
    }

    svg {
      position: relative;
      width: 100%;
      height: 100%;
    }

    path {
      fill: #535a60;
      transition: fill 0.15s ${({ content }) => content.ease};
    }

    &:hover {
      button,
      a {
        background-color: #212529;
      }

      path {
        fill: #fff;
      }
    }

    &:active {
      span {
        /* transform: scale(0.875); */
        transform: scale3D(0.875, 0.875, 1);
      }
    }

    .active-page path {
      fill: #fff;
    }

    .pulse {
      position: relative;

      ::before,
      ::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        border-radius: 50%;
        z-index: -1;
      }

      ::before {
        /* background: ${({ content }) => content.colors.blueA["1000"]}; */
        background: #fff;
        animation: pulse 2s ${({ content }) => content.ease} infinite;
      }

      ::after {
        background: #2b3034;
        transform: scale(0.875);
        /* box-shadow: 0 0 4px 2px #2b3034; */
      }

      @keyframes pulse {
        0% {
          opacity: 0.1;
          transform: scale(0.875);
        }
        50% {
          opacity: 0.75;
          transform: scale(1);
        }
        100% {
          opacity: 0;
          transform: scale(1.125);
        }
      }

      &:hover::before,
      &:active::before {
        content: none;
      }
    }
  }

  .drawer {
    position: absolute;
    top: 0;
    left: 56px;
    width: 320px;
    height: 100%;
    box-sizing: border-box;
    color: #fff;
  }

  .drawer__header {
    position: relative;
    height: 88px;
    padding: 0 24px 0 16px;
  }

  .drawer__header__box {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;

    div p:first-child {
      margin-bottom: 4px;
    }
  }

  .drawer__close {
    margin-right: -8px;
    background-color: transparent;
    transition: background-color 0.15s ${({ ease }) => ease};
    border-radius: 8px;
    width: 32px;
    height: 32px;

    span {
      display: inline-block;
      transition: transform 0.15s ${({ ease }) => ease};
    }

    path {
      transition: fill 0.15s ${({ ease }) => ease};
    }

    &:hover {
      background-color: #212529;

      path {
        fill: #fff;
      }
    }

    &:active span {
      transform: scale(0.875);
    }
  }

  .drawer__body {
    position: relative;
    height: calc(100% - 88px);
    padding: 0 24px 0 16px;
    overflow-y: auto;
  }

  .drawer__card {
    width: 100%;
    padding: 24px 0 24px 8px;
    box-sizing: border-box;

    header {
      display: flex;
      align-items: center;
      margin-bottom: 8px;

      svg {
        margin: 0 8px 0 -4px;
      }
    }

    .link {
      color: #fff;
    }
  }

  .drawer__header__box,
  .drawer__card:not(:last-child) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .drawer__image {
    width: 100%;
    border-radius: 4px;
  }


`;

const SideBar = ({
  openDrawer,
  toggleDrawer,
  getSnap,
  switchRange,
  onChange,
  snapdate,
  rangeEnabled,
  nodeClick,
  getDepTree, 
  getDependencies,
  getDownloads,
  slideValue,
  setSlideValue,
  getKeywords,
  loading,
  setValue,
  value,
  items,
  getTimes,
}) => {
  const [activePage, updateActivePage] = useState([
    false,
    true,
    false,
    false,
    false,
    false,
    false,
  ]);

  return (
    <StyledSideBar className="sidebar" content={content}>
      <div className="sidebar__tab">
        <ul className="sidebar__items">
          <li className="sidebar__item">
            <MenuIcon />
          </li>
         
        </ul>
        <ul className="sidebar__items border-top">
          <li className="sidebar__item" onClick={toggleDrawer}>
            <TwoStatesInteractiveIcon
              states={[
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 5C6 5.552 5.552 6 5 6C4.448 6 4 5.552 4 5C4 3.346 5.346 2 7 2H19C19.553 2 20 2.448 20 3C20 3.552 19.553 4 19 4C18.448 4 18 4.449 18 5C18 5.552 17.553 6 17 6C16.447 6 16 5.552 16 5C16 4.648 16.072 4.314 16.184 4H7C6.449 4 6 4.449 6 5ZM5 7H18C19.103 7 20 7.897 20 9V19C20 20.654 18.654 22 17 22H7C5.346 22 4 20.654 4 19V8C4 7.448 4.448 7 5 7ZM17 20C17.552 20 18 19.552 18 19V9H6V19C6 19.552 6.449 20 7 20H17ZM11.293 12.292C11.482 12.104 11.733 12 12 12C12.551 12 13 12.449 13 13C13 13.268 12.896 13.519 12.706 13.708C12.518 13.896 12.268 14 12 14C11.448 14 11 14.447 11 15C11 15.553 11.448 16 12 16C12.803 16 13.557 15.688 14.12 15.122C14.688 14.557 15 13.803 15 13C15 11.346 13.654 10 12 10C11.198 10 10.445 10.312 9.87801 10.879C9.48801 11.27 9.48801 11.903 9.87901 12.293C10.271 12.683 10.903 12.683 11.293 12.292ZM13 18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18C11 17.4477 11.4477 17 12 17C12.5523 17 13 17.4477 13 18Z"
                    fill="#535a60"
                  />
                </svg>,
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.152 6.012L12.914 5.052C12.312 4.959 12.099 5.82 12.675 6.019L18 7.858V18.93L16 18.793V9.5C16 9.076 15.732 8.698 15.333 8.557L7.278 5.253C6.618 4.983 6.811 4 7.525 4H19C19.553 4 20 3.552 20 3C20 2.448 19.553 2 19 2H6.5C5.119 2 4 3.119 4 4.5V15C4 17.875 4.718 19.213 6.649 19.937L14.649 22.937C14.763 22.979 14.882 23 15 23C15.201 23 15.4 22.939 15.569 22.822C15.839 22.635 16 22.328 16 22V20.798L18.932 20.998C18.955 20.999 18.978 21 19 21C19.253 21 19.497 20.904 19.683 20.73C19.885 20.542 20 20.277 20 20V7C20 6.506 19.64 6.087 19.152 6.012ZM9.414 18C8.862 18 8.414 17.552 8.414 17C8.414 16.448 8.862 16 9.414 16C9.966 16 10.414 16.448 10.414 17C10.414 17.552 9.966 18 9.414 18ZM11.534 14.622C10.969 15.187 10.216 15.5 9.414 15.5C8.862 15.5 8.414 15.053 8.414 14.5C8.414 13.947 8.862 13.5 9.414 13.5C9.681 13.5 9.932 13.396 10.121 13.207C10.311 13.019 10.414 12.768 10.414 12.5C10.414 12.233 10.31 11.982 10.122 11.793C9.743 11.414 9.085 11.415 8.708 11.792C8.317 12.183 7.685 12.183 7.294 11.793C6.903 11.403 6.903 10.77 7.293 10.379C8.426 9.245 10.403 9.245 11.536 10.379C12.102 10.944 12.414 11.698 12.414 12.5C12.414 13.303 12.102 14.057 11.534 14.622Z"
                    fill="black"
                  />
                </svg>,
              ]}
              toggle={!openDrawer}
              className="pulse"
            />
          </li>
        
        </ul>
      </div>
      <div className="drawer">
        <header className="drawer__header">
          <div className="drawer__header__box">
            <div>
              <Type5>Adjustments</Type5>
              <Type1>Dependency Controls</Type1>
            </div>
            <button className="drawer__close" onClick={toggleDrawer}>
              <span>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.2963 9.41061C11.101 9.21534 10.7844 9.21534 10.5892 9.41061L9.41066 10.5891C9.2154 10.7844 9.2154 11.101 9.41066 11.2962L13.7711 15.6567L9.41061 20.0172C9.21534 20.2125 9.21534 20.5291 9.41061 20.7243L10.5891 21.9028C10.7844 22.0981 11.101 22.0981 11.2962 21.9028L15.6567 17.5423L20.0173 21.9028C20.2125 22.0981 20.5291 22.0981 20.7244 21.9028L21.9029 20.7243C22.0981 20.5291 22.0981 20.2125 21.9029 20.0172L17.5424 15.6567L21.9028 11.2962C22.0981 11.101 22.0981 10.7844 21.9028 10.5891L20.7243 9.41061C20.5291 9.21534 20.2125 9.21534 20.0172 9.41061L15.6567 13.7711L11.2963 9.41061Z"
                    fill="white"
                  />
                </svg>
              </span>
            </button>
          </div>
        </header>
        <section className="drawer__body">
          <article className="drawer__card">
            <header>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.1212 24.6201C15.2522 24.6997 15.344 24.7606 15.3922 24.7946C15.4142 24.8113 15.4368 24.827 15.46 24.8418C15.6311 24.9525 15.8177 25.0025 16 25.0018C16.1823 25.0025 16.3689 24.9525 16.54 24.8418C16.5632 24.827 16.5858 24.8113 16.6078 24.7946C16.656 24.7606 16.7478 24.6997 16.8788 24.6201C17.135 24.4643 17.4285 24.3073 17.7523 24.1606C18.6451 23.7561 19.5829 23.511 20.4879 23.4999C21.4063 23.511 22.3425 23.7562 23.2396 24.1612C23.5655 24.3083 23.8617 24.4657 24.1209 24.622C24.2708 24.7124 24.3706 24.7789 24.4134 24.8099C25.0746 25.2888 26 24.8164 26 24V10C26 9.78691 25.9319 9.5794 25.8057 9.40771C25.5579 9.07058 25.1077 8.61471 24.4428 8.16923C23.3521 7.43845 22.0334 7 20.5 7C18.8801 7 17.5115 7.6826 16.405 8.79465C16.2589 8.94148 16.124 9.08827 16 9.23289C15.876 9.08827 15.7411 8.94148 15.595 8.79465C14.4885 7.6826 13.1199 7 11.5 7C9.96655 7 8.64795 7.43845 7.55722 8.16923C6.89232 8.61471 6.4421 9.07058 6.19428 9.40771C6.06807 9.5794 6 9.78691 6 10V24C6 24.8164 6.92537 25.2888 7.58656 24.8099C7.62937 24.7789 7.7292 24.7124 7.8791 24.622C8.13834 24.4657 8.43454 24.3083 8.76036 24.1612C9.65749 23.7562 10.5937 23.511 11.5121 23.4999C12.4171 23.511 13.3549 23.7561 14.2477 24.1606C14.5715 24.3073 14.865 24.4643 15.1212 24.6201ZM8 10.3902C8.17457 10.2018 8.40216 10.0105 8.67044 9.83077C9.4454 9.31155 10.3824 9 11.5 9C12.5312 9 13.4181 9.4424 14.1773 10.2053C14.4534 10.4828 15 11.2654 15 11.2654V22.3383C13.8732 21.8278 12.7465 21.5148 11.5119 21.5001C10.264 21.5148 9.12996 21.7799 8 22.2899V10.3902ZM23.3296 9.83077C23.5978 10.0105 23.8254 10.2018 24 10.3902V22.2899C22.87 21.7799 21.736 21.5148 20.4881 21.5001C19.2535 21.5148 18.1268 21.8278 17 22.3383V11.2654C17 11.2654 17.5466 10.4828 17.8227 10.2053C18.5819 9.4424 19.4688 9 20.5 9C21.6176 9 22.5546 9.31155 23.3296 9.83077Z"
                  fill="white"
                />
              </svg>
              <Type4>Primary</Type4>
            </header>
            <Type3>
              Click once you have adjusted the settings for the graph or tree
            </Type3>
            <br />
            <Button className="button" primary onClick={() => getSnap()}>
              Launch
            </Button>
            <br />
          </article>
          <article className="drawer__card">
            <header>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.1212 24.6201C15.2522 24.6997 15.344 24.7606 15.3922 24.7946C15.4142 24.8113 15.4368 24.827 15.46 24.8418C15.6311 24.9525 15.8177 25.0025 16 25.0018C16.1823 25.0025 16.3689 24.9525 16.54 24.8418C16.5632 24.827 16.5858 24.8113 16.6078 24.7946C16.656 24.7606 16.7478 24.6997 16.8788 24.6201C17.135 24.4643 17.4285 24.3073 17.7523 24.1606C18.6451 23.7561 19.5829 23.511 20.4879 23.4999C21.4063 23.511 22.3425 23.7562 23.2396 24.1612C23.5655 24.3083 23.8617 24.4657 24.1209 24.622C24.2708 24.7124 24.3706 24.7789 24.4134 24.8099C25.0746 25.2888 26 24.8164 26 24V10C26 9.78691 25.9319 9.5794 25.8057 9.40771C25.5579 9.07058 25.1077 8.61471 24.4428 8.16923C23.3521 7.43845 22.0334 7 20.5 7C18.8801 7 17.5115 7.6826 16.405 8.79465C16.2589 8.94148 16.124 9.08827 16 9.23289C15.876 9.08827 15.7411 8.94148 15.595 8.79465C14.4885 7.6826 13.1199 7 11.5 7C9.96655 7 8.64795 7.43845 7.55722 8.16923C6.89232 8.61471 6.4421 9.07058 6.19428 9.40771C6.06807 9.5794 6 9.78691 6 10V24C6 24.8164 6.92537 25.2888 7.58656 24.8099C7.62937 24.7789 7.7292 24.7124 7.8791 24.622C8.13834 24.4657 8.43454 24.3083 8.76036 24.1612C9.65749 23.7562 10.5937 23.511 11.5121 23.4999C12.4171 23.511 13.3549 23.7561 14.2477 24.1606C14.5715 24.3073 14.865 24.4643 15.1212 24.6201ZM8 10.3902C8.17457 10.2018 8.40216 10.0105 8.67044 9.83077C9.4454 9.31155 10.3824 9 11.5 9C12.5312 9 13.4181 9.4424 14.1773 10.2053C14.4534 10.4828 15 11.2654 15 11.2654V22.3383C13.8732 21.8278 12.7465 21.5148 11.5119 21.5001C10.264 21.5148 9.12996 21.7799 8 22.2899V10.3902ZM23.3296 9.83077C23.5978 10.0105 23.8254 10.2018 24 10.3902V22.2899C22.87 21.7799 21.736 21.5148 20.4881 21.5001C19.2535 21.5148 18.1268 21.8278 17 22.3383V11.2654C17 11.2654 17.5466 10.4828 17.8227 10.2053C18.5819 9.4424 19.4688 9 20.5 9C21.6176 9 22.5546 9.31155 23.3296 9.83077Z"
                  fill="white"
                />
              </svg>
              <Type4>Calender</Type4>
            </header>
            <Type3>
              Pick a date to get a snapshot of the state of dependencies in the
              ecosystem at that time
            </Type3>
            <br />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
              className="calender__component"
                disableToolbar
                white
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                value={snapdate}
                onChange={onChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
            <br />
          </article>
          <article className="drawer__card">
            <header>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.1212 24.6201C15.2522 24.6997 15.344 24.7606 15.3922 24.7946C15.4142 24.8113 15.4368 24.827 15.46 24.8418C15.6311 24.9525 15.8177 25.0025 16 25.0018C16.1823 25.0025 16.3689 24.9525 16.54 24.8418C16.5632 24.827 16.5858 24.8113 16.6078 24.7946C16.656 24.7606 16.7478 24.6997 16.8788 24.6201C17.135 24.4643 17.4285 24.3073 17.7523 24.1606C18.6451 23.7561 19.5829 23.511 20.4879 23.4999C21.4063 23.511 22.3425 23.7562 23.2396 24.1612C23.5655 24.3083 23.8617 24.4657 24.1209 24.622C24.2708 24.7124 24.3706 24.7789 24.4134 24.8099C25.0746 25.2888 26 24.8164 26 24V10C26 9.78691 25.9319 9.5794 25.8057 9.40771C25.5579 9.07058 25.1077 8.61471 24.4428 8.16923C23.3521 7.43845 22.0334 7 20.5 7C18.8801 7 17.5115 7.6826 16.405 8.79465C16.2589 8.94148 16.124 9.08827 16 9.23289C15.876 9.08827 15.7411 8.94148 15.595 8.79465C14.4885 7.6826 13.1199 7 11.5 7C9.96655 7 8.64795 7.43845 7.55722 8.16923C6.89232 8.61471 6.4421 9.07058 6.19428 9.40771C6.06807 9.5794 6 9.78691 6 10V24C6 24.8164 6.92537 25.2888 7.58656 24.8099C7.62937 24.7789 7.7292 24.7124 7.8791 24.622C8.13834 24.4657 8.43454 24.3083 8.76036 24.1612C9.65749 23.7562 10.5937 23.511 11.5121 23.4999C12.4171 23.511 13.3549 23.7561 14.2477 24.1606C14.5715 24.3073 14.865 24.4643 15.1212 24.6201ZM8 10.3902C8.17457 10.2018 8.40216 10.0105 8.67044 9.83077C9.4454 9.31155 10.3824 9 11.5 9C12.5312 9 13.4181 9.4424 14.1773 10.2053C14.4534 10.4828 15 11.2654 15 11.2654V22.3383C13.8732 21.8278 12.7465 21.5148 11.5119 21.5001C10.264 21.5148 9.12996 21.7799 8 22.2899V10.3902ZM23.3296 9.83077C23.5978 10.0105 23.8254 10.2018 24 10.3902V22.2899C22.87 21.7799 21.736 21.5148 20.4881 21.5001C19.2535 21.5148 18.1268 21.8278 17 22.3383V11.2654C17 11.2654 17.5466 10.4828 17.8227 10.2053C18.5819 9.4424 19.4688 9 20.5 9C21.6176 9 22.5546 9.31155 23.3296 9.83077Z"
                  fill="white"
                />
              </svg>
              <Type4>Downloads</Type4>
            </header>
            <Type3>Filter out the dependencies on the graph by downloads</Type3>
            <br />
            <Slider
            
            white
              value={slideValue}
              onChange={(event, newValue) => setSlideValue(newValue)}
              aria-labelledby="continuous-slider"
            />
            <Button className="button" primary onClick={() => getDownloads()}>
              Launch
            </Button>
            <br />
          </article>
          <article className="drawer__card">
            <header>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.1212 24.6201C15.2522 24.6997 15.344 24.7606 15.3922 24.7946C15.4142 24.8113 15.4368 24.827 15.46 24.8418C15.6311 24.9525 15.8177 25.0025 16 25.0018C16.1823 25.0025 16.3689 24.9525 16.54 24.8418C16.5632 24.827 16.5858 24.8113 16.6078 24.7946C16.656 24.7606 16.7478 24.6997 16.8788 24.6201C17.135 24.4643 17.4285 24.3073 17.7523 24.1606C18.6451 23.7561 19.5829 23.511 20.4879 23.4999C21.4063 23.511 22.3425 23.7562 23.2396 24.1612C23.5655 24.3083 23.8617 24.4657 24.1209 24.622C24.2708 24.7124 24.3706 24.7789 24.4134 24.8099C25.0746 25.2888 26 24.8164 26 24V10C26 9.78691 25.9319 9.5794 25.8057 9.40771C25.5579 9.07058 25.1077 8.61471 24.4428 8.16923C23.3521 7.43845 22.0334 7 20.5 7C18.8801 7 17.5115 7.6826 16.405 8.79465C16.2589 8.94148 16.124 9.08827 16 9.23289C15.876 9.08827 15.7411 8.94148 15.595 8.79465C14.4885 7.6826 13.1199 7 11.5 7C9.96655 7 8.64795 7.43845 7.55722 8.16923C6.89232 8.61471 6.4421 9.07058 6.19428 9.40771C6.06807 9.5794 6 9.78691 6 10V24C6 24.8164 6.92537 25.2888 7.58656 24.8099C7.62937 24.7789 7.7292 24.7124 7.8791 24.622C8.13834 24.4657 8.43454 24.3083 8.76036 24.1612C9.65749 23.7562 10.5937 23.511 11.5121 23.4999C12.4171 23.511 13.3549 23.7561 14.2477 24.1606C14.5715 24.3073 14.865 24.4643 15.1212 24.6201ZM8 10.3902C8.17457 10.2018 8.40216 10.0105 8.67044 9.83077C9.4454 9.31155 10.3824 9 11.5 9C12.5312 9 13.4181 9.4424 14.1773 10.2053C14.4534 10.4828 15 11.2654 15 11.2654V22.3383C13.8732 21.8278 12.7465 21.5148 11.5119 21.5001C10.264 21.5148 9.12996 21.7799 8 22.2899V10.3902ZM23.3296 9.83077C23.5978 10.0105 23.8254 10.2018 24 10.3902V22.2899C22.87 21.7799 21.736 21.5148 20.4881 21.5001C19.2535 21.5148 18.1268 21.8278 17 22.3383V11.2654C17 11.2654 17.5466 10.4828 17.8227 10.2053C18.5819 9.4424 19.4688 9 20.5 9C21.6176 9 22.5546 9.31155 23.3296 9.83077Z"
                  fill="white"
                />
              </svg>
              <Type4>Keywords</Type4>
            </header>
            <Type3>
              Get only dependencies that have a certain keyword associated with
              them
            </Type3>
            <br />
            <FormControl>
              <InputLabel style={{color: '#fff'}} id="demo-simple-select-label">Keyword</InputLabel>
              <Select
              style={{width: '100%'}}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                onChange={(e) => setValue(e.currentTarget.value)}
              >
                {items.map(({ label, value }) => (
                  <MenuItem value={value}>{label}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <br />
          </article>
          <article className="drawer__card">
            <header>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.1212 24.6201C15.2522 24.6997 15.344 24.7606 15.3922 24.7946C15.4142 24.8113 15.4368 24.827 15.46 24.8418C15.6311 24.9525 15.8177 25.0025 16 25.0018C16.1823 25.0025 16.3689 24.9525 16.54 24.8418C16.5632 24.827 16.5858 24.8113 16.6078 24.7946C16.656 24.7606 16.7478 24.6997 16.8788 24.6201C17.135 24.4643 17.4285 24.3073 17.7523 24.1606C18.6451 23.7561 19.5829 23.511 20.4879 23.4999C21.4063 23.511 22.3425 23.7562 23.2396 24.1612C23.5655 24.3083 23.8617 24.4657 24.1209 24.622C24.2708 24.7124 24.3706 24.7789 24.4134 24.8099C25.0746 25.2888 26 24.8164 26 24V10C26 9.78691 25.9319 9.5794 25.8057 9.40771C25.5579 9.07058 25.1077 8.61471 24.4428 8.16923C23.3521 7.43845 22.0334 7 20.5 7C18.8801 7 17.5115 7.6826 16.405 8.79465C16.2589 8.94148 16.124 9.08827 16 9.23289C15.876 9.08827 15.7411 8.94148 15.595 8.79465C14.4885 7.6826 13.1199 7 11.5 7C9.96655 7 8.64795 7.43845 7.55722 8.16923C6.89232 8.61471 6.4421 9.07058 6.19428 9.40771C6.06807 9.5794 6 9.78691 6 10V24C6 24.8164 6.92537 25.2888 7.58656 24.8099C7.62937 24.7789 7.7292 24.7124 7.8791 24.622C8.13834 24.4657 8.43454 24.3083 8.76036 24.1612C9.65749 23.7562 10.5937 23.511 11.5121 23.4999C12.4171 23.511 13.3549 23.7561 14.2477 24.1606C14.5715 24.3073 14.865 24.4643 15.1212 24.6201ZM8 10.3902C8.17457 10.2018 8.40216 10.0105 8.67044 9.83077C9.4454 9.31155 10.3824 9 11.5 9C12.5312 9 13.4181 9.4424 14.1773 10.2053C14.4534 10.4828 15 11.2654 15 11.2654V22.3383C13.8732 21.8278 12.7465 21.5148 11.5119 21.5001C10.264 21.5148 9.12996 21.7799 8 22.2899V10.3902ZM23.3296 9.83077C23.5978 10.0105 23.8254 10.2018 24 10.3902V22.2899C22.87 21.7799 21.736 21.5148 20.4881 21.5001C19.2535 21.5148 18.1268 21.8278 17 22.3383V11.2654C17 11.2654 17.5466 10.4828 17.8227 10.2053C18.5819 9.4424 19.4688 9 20.5 9C21.6176 9 22.5546 9.31155 23.3296 9.83077Z"
                  fill="white"
                />
              </svg>
              <Type4>Node</Type4>
            </header>
            <Type3>Get info on a node on select</Type3>
            <br />
 
            <NodeInfo
            nodeClick={nodeClick}
            getTree={getDepTree}
            getDependencies={getDependencies}
          />
            <br />
          </article>
        </section>
      </div>
    </StyledSideBar>
  );
};

export default SideBar;

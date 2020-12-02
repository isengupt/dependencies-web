import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";
// import BezierEasing from "bezier-easing";
import { Type1, Type3 } from "./Typography";
import Header from "./Header";
import Container from "./Container";
import CardGrid from "./CardGrid";
import content from "./content";
import Tree from "react-d3-tree";
import GraphGL, { JSONLoader, NODE_TYPE, D3ForceLayout } from "graph.gl";

const DEFAULT_NODE_SIZE = 5;
const DEFAULT_COLOR = "rgb(236, 81, 72)";
const StyledPage = styled(animated.main)`
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 16px 0 0 16px;
  background: #fff;
  height: 100%;
  width: calc(100% - 56px);
  overflow: hidden;
  /* safari overflow fix */
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);

  .body__container {
    height: 100vh;
  }

  .page__scrollable-content {
    position: absolute;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-bottom: 24px;
    overflow: auto;

    @supports (overflow: overlay) {
      overflow: overlay;
    }
  }

  .page__header {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    background-color: #fff;
    box-sizing: border-box;
    padding: 0 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 1;
    transition: transform 0.3s cubic-bezier(0.2, 0, 0.38, 0.9);
  }

  .page__header.hidden {
    transform: translateY(-80px);
  }

  .page__body {
    position: relative;
    width: 100%;
    min-height: calc(100% - 80px);
  }

  .section__header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
`;

// const ease = BezierEasing(0.2, 0, 0.38, 0.9);

const Page = ({ openDrawer, handleClick, setNodeInfo, treeData, treeOn, graph }) => {
  const openDrawerProps = useSpring({
    // config: { duration: 250, easing: ease },
    width: openDrawer ? "calc(100% - 382px)" : "calc(100% - 56px)"
  });

  const [hiddenHeader, setHiddenHeader] = useState(false);

  const handleScroll = e => {
    const scrollTop = e.target.scrollTop;

    if ((scrollTop > 30 && !hiddenHeader) || (scrollTop < 30 && hiddenHeader)) {
      setHiddenHeader(!hiddenHeader);
    }
  };

  return (
    <StyledPage style={{ ...openDrawerProps }} className="page">
      <div className="page__scrollable-content" onScroll={e => handleScroll(e)}>
        <Header avatar={content.avatar} hidden={hiddenHeader} />
        <div className="page__body">
          <Container className="body__container">
            <section className="padding-h40">
              <header className="section__header">
                <div>
                  <Type1>
                  Rust Crates{" "}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 1C4.14 1 1 4.14 1 8C1 11.86 4.14 15 8 15C11.859 15 15 11.859 15 8C15 4.141 11.859 1 8 1ZM8 13C5.243 13 3 10.757 3 8C3 5.243 5.243 3 8 3C10.757 3 13 5.243 13 8C13 10.757 10.757 13 8 13Z"
                        fill="#8492A6"
                      />
                      <path
                        d="M8.073 4.5C7.406 4.5 6.778 4.76 6.305 5.232C5.914 5.623 5.914 6.255 6.305 6.646C6.696 7.037 7.328 7.037 7.719 6.646C7.774 6.592 7.893 6.5 8.073 6.5C8.349 6.5 8.573 6.724 8.573 7C8.573 7.18 8.482 7.298 8.427 7.354C8.372 7.408 8.253 7.5 8.073 7.5C7.521 7.5 7.073 7.948 7.073 8.5C7.073 9.052 7.521 9.5 8.073 9.5C8.74 9.5 9.368 9.24 9.84 8.769C10.313 8.297 10.573 7.669 10.573 7.001C10.573 5.621 9.452 4.5 8.073 4.5Z"
                        fill="#8492A6"
                      />
                      <path
                        d="M8.71 10.289C8.66 10.249 8.61 10.199 8.56 10.17C8.5 10.13 8.44 10.1 8.38 10.079C8.32 10.05 8.26 10.029 8.2 10.019C8 9.98 7.8 9.999 7.62 10.079C7.49 10.13 7.39 10.199 7.29 10.289C7.2 10.39 7.13 10.489 7.08 10.619C7.03 10.74 7 10.87 7 10.999C7 11.27 7.1 11.52 7.29 11.709C7.48 11.899 7.73 11.999 8 11.999C8.27 11.999 8.52 11.899 8.71 11.709C8.9 11.52 9 11.27 9 10.999C9 10.869 8.98 10.739 8.92 10.619C8.87 10.49 8.8 10.39 8.71 10.289Z"
                        fill="#8492A6"
                      />
                    </svg>
                  </Type1>
                  <Type3 classNane="subtitle" style={{ color: "#8492A6" }}>
                    Open menu to filter
                  </Type3>
                </div>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 4C7.448 4 7 4.448 7 5V8C7 8.265 7.105 8.52 7.293 8.707L9.293 10.707C9.488 10.903 9.744 11 10 11C10.256 11 10.512 10.902 10.707 10.707C11.098 10.316 11.098 9.684 10.707 9.293L9 7.586V5C9 4.448 8.552 4 8 4Z"
                    fill="#8492A6"
                  />
                  <path
                    d="M13.657 2.343C12.145 0.832 10.136 0 8 0C5.863 0 3.854 0.832 2.343 2.343C0.832 3.855 0 5.864 0 8C0 10.137 0.832 12.146 2.343 13.657C2.461 13.775 2.599 13.868 2.724 13.978H1.5C0.948 13.978 0.5 14.425 0.5 14.978C0.5 15.531 0.948 15.978 1.5 15.978H5C5.552 15.978 6 15.531 6 14.978V11.5C6 10.947 5.552 10.5 5 10.5C4.448 10.5 4 10.947 4 11.5V12.447C3.921 12.376 3.833 12.318 3.757 12.242C2.624 11.109 2 9.603 2 8C2 6.398 2.624 4.891 3.757 3.757C4.891 2.624 6.397 2 8 2C9.602 2 11.109 2.624 12.243 3.757C13.376 4.891 14 6.397 14 8C14 9.603 13.376 11.11 12.242 12.243C11.108 13.376 9.602 14 8 14C7.448 14 7 14.447 7 15C7 15.553 7.448 16 8 16C10.136 16 12.145 15.168 13.656 13.656C15.168 12.147 16 10.137 16 8C16 5.863 15.168 3.854 13.657 2.343Z"
                    fill="#8492A6"
                  />
                </svg>
              </header>
            
            </section>
            {treeOn ? (
          <div id="treeWrapper" style={{ width: "100%", height: "100%" }}>
            <Tree data={treeData} onClick={handleClick} />
          </div>
        ) : (
          <GraphGL
          style={{height: '100vh'}}
            graph={graph}
            layout={new D3ForceLayout()}
            nodeStyle={[
              {
                type: NODE_TYPE.CIRCLE,
                radius: DEFAULT_NODE_SIZE,
                fill: (node) => (node._data ? node._data.color : "red"),
                size: (node) => (node._data ? node._data.size : "red"),
                scaleWithZoom: true,
                marker: "circle-filled",

                ":hover": {
                  fill: "blue",
                },
              },

              {
                type: NODE_TYPE.LABEL,
                text: (node) => (node._data ? node._data.label : node.id),
                color: (node) => (node._data ? node._data.color : "red"),
                fontSize: 13,
                offset: [0, 15],
                opacity: 0.8,
                scaleWithZoom: false,
              },
            ]}
            edgeStyle={{
              stroke: (edge) => (edge._data ? edge._data.color : "green"),
              strokeWidth: 1,
            }}
            nodeEvents={{
              onClick: (e) => setNodeInfo(e),
            }}
          />
        )}
           
          </Container>
        </div>
      </div>
    </StyledPage>
  );
};

export default Page;

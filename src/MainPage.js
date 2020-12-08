import React, { useState } from "react";
import Page from "./components/Page";
import SideBar from "./components/SideBar";

import styled from "styled-components";
import "./styles.css";
import { getFlatArray,
  getGraphSnapshot,
  getKeywordSnapshot,
  getDownloadFilter,
  getReverseDependencies,
  getTimeSeries } from './tree.js'
  import GraphGL, { JSONLoader, NODE_TYPE, D3ForceLayout } from "graph.gl";
const DEFAULT_NODE_SIZE = 5;
const DEFAULT_COLOR = "rgb(236, 81, 72)";

const StyledApp = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
`;

export default function MainPage() {
  const [openDrawer, updateDrawer] = useState(false);
  const [loading, setLoading] = React.useState(false);
  const [items, setItems] = React.useState([
    { label: "science", value: "science" },
    { label: "geometry", value: "geometry" },
    { label: "math", value: "math" },
    { label: "quantum", value: "quantum" },
    { label: "linear-algebra", value: "linear-algebra" },
    { label: "high-energy-physics", value: "high-energy-physics" },
    { label: "algebra", value: "algebra" },
    { label: "linear", value: "linear" },
    { label: "data-structure", value: "data-structure" },
    { label: "crypto", value: "crypto" },
    { label: "framework", value: "framework" },
    { label: "random", value: "random" },
    { label: "bioinformatics", value: "bioinformatics" },
    { label: "serde", value: "serde" },
    { label: "statistics", value: "statistics" },
    { label: "async", value: "async" },
    { label: "ffi9", value: "ffi9" },
    { label: "deep-learning", value: "deep-learning" },
    { label: "mathematics", value: "mathematics" },
    { label: "vector", value: "vector" },
    { label: "numerics", value: "numerics" },
  ]);
  const [value, setValue] = React.useState("science");
  const [slideValue, setSlideValue] = React.useState(30);
  const [treeOn, setTreeOn] = React.useState(false);
  const [snapdate, setSnapdate] = React.useState(
    new Date("2018-11-15T00:00:00.000000+00:00")
  );
  const [nodeClick, setNodeClick] = React.useState(null);

  const [root, setRoot] = React.useState("wasm-bindgen");
  const [rangeEnabled, setRangeEnabled] = React.useState(false);

  const [treeData, setTreeData] = React.useState([
    {
      name: "Top Level",
      attributes: {
        keyA: "val A",
        keyB: "val B",
        keyC: "val C",
      },
      children: [
        {
          name: "Level 2: A",
          attributes: {
            keyA: "val A",
            keyB: "val B",
            keyC: "val C",
          },
          children: [
            {
              name: "Level 3: A",
            },
          ],
        },

        {
          name: "Level 2: B",
        },
      ],
    },
  ]);
  const [myGraph, setMyGraph] = React.useState({
    nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }],
    edges: [
      { id: 0, sourceId: "Harry", targetId: "Sally" },
      { id: 1, sourceId: "Harry", targetId: "Alice" },
    ],
  });

  function setNodeInfo(e) {
    console.log(e["object"]["_data"]);
    setNodeClick(e["object"]["_data"]);
  }

  React.useEffect(() => {
    getSnap();
  }, []);

  const graph = JSONLoader({
    json: myGraph,
    nodeParser: (node) => ({ id: node.id }),
    edgeParser: (edge) => ({
      id: edge.id,
      sourceId: edge.sourceId,
      targetId: edge.targetId,
      directed: true,
    }),
    onClick: (e) => setNodeInfo(e),
  });



  function getSnap() {
    setTreeOn(false);

    
let graph_vals = getGraphSnapshot(snapdate)
console.log(graph_vals)
setMyGraph(graph_vals)


  }

  function getKeywords() {
    setTreeOn(false);
    let keysnap = getKeywordSnapshot(snapdate, value)
    console.log(keysnap)
    setMyGraph(keysnap);

  }

  function getDownloads() {
    setTreeOn(false);
    let downsnap = getDownloadFilter(snapdate, value)
    console.log(downsnap)
    setMyGraph(downsnap);

  }

  function getTimes() {
    setTreeOn(false);
    let timesnap = getTimeSeries(snapdate, slideValue)
    console.log(timesnap)
    setMyGraph(timesnap);

  }

  function switchRange() {
    setRangeEnabled(true);
  }

  const handleClick = (nodeData, evt) => {
    console.log(nodeData, evt);
  };

  function getDependencies(root) {
    setTreeOn(true);
    let revdeps = getReverseDependencies(root)
    console.log(revdeps)
    setTreeData(revdeps[0]);
  
  }
  function getDepTree(root) {
    setTreeOn(true);
    let deps = getFlatArray(root)
    console.log(deps)
    setTreeData(deps[0]);
 
  }

  const onChange = (date) => {
    console.log(date);
    setSnapdate(date);
  };


  const toggleDrawer = () => {
    updateDrawer(!openDrawer);
  };

  return (
    <main>
    <div className="frame">
    <div className="frame__title-wrap">
    
    </div>
    <div className="frame__links">
    
    </div>
    <div className="frame__demos">
      <a
        href="https://isengupt.github.io/glass-blur/"
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
        href="https://github.com/isengupt/fiber-website"
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
  </div>
    <StyledApp className={`app-wrapper${openDrawer ? " open-drawer" : ""}`}>
  
      <SideBar openDrawer={openDrawer} toggleDrawer={toggleDrawer} getSnap={getSnap} switchRange={switchRange} onChange={onChange} snapdate={snapdate} rangeEnabled={rangeEnabled} getDownloads={getDownloads} slideValue={slideValue} setSlideValue={setSlideValue} getKeywords={getKeywords} loading={loading} setValue={setValue} value={value} items={items} getTimes={getTimes} nodeClick={nodeClick} getDepTree={getDepTree} getDependencies={getDependencies} />
      <Page openDrawer={openDrawer} graph={graph} treeOn={treeOn} treeData={treeData} handleClick={handleClick} setNodeInfo={setNodeInfo} />
    </StyledApp>
    </main>
  );
}
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
    <StyledApp className={`app-wrapper${openDrawer ? " open-drawer" : ""}`}>
      <SideBar openDrawer={openDrawer} toggleDrawer={toggleDrawer} getSnap={getSnap} switchRange={switchRange} onChange={onChange} snapdate={snapdate} rangeEnabled={rangeEnabled} getDownloads={getDownloads} slideValue={slideValue} setSlideValue={setSlideValue} getKeywords={getKeywords} loading={loading} setValue={setValue} value={value} items={items} getTimes={getTimes} nodeClick={nodeClick} getDepTree={getDepTree} getDependencies={getDependencies} />
      <Page openDrawer={openDrawer} graph={graph} treeOn={treeOn} treeData={treeData} handleClick={handleClick} setNodeInfo={setNodeInfo} />
    </StyledApp>
  );
}
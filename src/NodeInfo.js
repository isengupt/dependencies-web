import React from 'react';

import Button from "./components/Button"
import { Type1, Type3, Type4, Type5 } from "./components/Typography";

function NodeInfo(props) {
    console.log(props.nodeClick)

    if(props.nodeClick) {
    return (
        <div className="node-info">
           <div className="control-row">
           <Button className="button node-button"  primary onClick={() => props.getTree(props.nodeClick.info.id)}>
            Tree
            </Button>
            <Button className="button node-button" primary onClick={() => props.getDependencies(props.nodeClick.info.id)}>
            Dependencies
            </Button>
 
          </div>
          <div className="text-border">

     <Type5 className="text-container" > Name: <span className="node-text"> {props.nodeClick.info.id}</span></Type5>
         <Type5 className="text-container">Description: <span className="node-text">  {props.nodeClick.info.description}</span></Type5>
         <Type5 className="text-container">Homepage: <span className="node-text">  {props.nodeClick.info.homepage}</span></Type5>
         <Type5 className="text-container">Repository: <span className="node-text"> {props.nodeClick.info.repository}</span> </Type5>
         <Type5 className="text-container" > Documentation: <span className="node-text">  {props.nodeClick.info.documentation}</span> </Type5>
         <Type5 className="text-container"> Downloads: <span className="node-text">  {props.nodeClick.info.downloads}</span> </Type5>
          </div>
            </div>
        
    )
    }else {
        return (
            <div className="text-border">
            No node clicked
            </div>
        )
    }
}

export default NodeInfo




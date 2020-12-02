import crates from './science_crates.json'
var colorArray = [
  "#E8442E",
  "#A6366D",
  "#F07A30",
  "#FFFF99",
  "#4175B7",
  "#847316",
  "#417B27",
  "#494B9D",
  "#4274B7",
  "#513214",
  "#946160"



];

export function buildHierarchy(arry) {
  var roots = [],
    children = {};

  // find the top level nodes and hash the children based on parent
  for (var i = 0, len = arry.length; i < len; ++i) {
    var item = arry[i],
      p = item.Parent,
      target = !p ? roots : children[p] || (children[p] = []);

    target.push({ value: item, name: item.name });
  }

  // function to recursively build the tree
  var findChildren = function (parent) {
    if (children[parent.value.Id]) {
      parent.children = children[parent.value.Id];
      for (var i = 0, len = parent.children.length; i < len; ++i) {
        findChildren(parent.children[i]);
      }
    }
  };

  // enumerate through to handle the case where there are multiple roots
  for (var i = 0, len = roots.length; i < len; ++i) {
    findChildren(roots[i]);
  }

  return roots;
}

export function getReverseDependencies (root) {


    console.log(root);

    let rootinfo = {};
    for (const dep of crates) {
      if (dep["id"] == root) {
        rootinfo = {
          description: dep["description"],
          keywords: dep["keywords"],
          homepage: dep["homepage"],
          repository: dep["repository"],
          documentation: dep["documentation"],
          downloads: dep["downloads"],
        };
      }
    }
    let heirarchy = [{ Id: root, name: root, info: rootinfo, Parent: null }];

    function createTree(root, level, crates) {
      //console.log(root)
      if (level === 4) {
        return;
      } else {
        for (const crate of crates) {
          if (crate["id"] == root) {
            console.log(crate["id"]);
            //console.log(crate)
            console.log(
              crate["dates"][crate["dates"].length - 1]["dependencies"]
            );
            if (
              crate["dates"][crate["dates"].length - 1]["dependencies"]
                .length === 0
            ) {
              return;
            }
            for (const dep of crate["dates"][crate["dates"].length - 1][
              "dependencies"
            ]) {
              let info = {};
              for (const item of crates) {
                if (item["id"] == dep["crate_id"]) {
                  info = {
                    description: item["description"],
                    keywords: item["keywords"],
                    homepage: item["homepage"],
                    repository: item["repository"],
                    documentation: item["documentation"],
                    downloads: item["downloads"],
                  };
                }
              }

              console.log(dep);
              heirarchy.push({
                Id: dep["crate_id"],
                name: dep["crate_id"],
                Parent: root,
                info: info,
              });

              createTree(dep["crate_id"], level + 1, crates);
            }
          }
        }
      }
    }

    createTree(root, 1, crates);
    console.log(heirarchy);
    let treeHi = buildHierarchy(heirarchy);
    let flatArray = [treeHi, heirarchy];
    return flatArray

};

export function getFlatArray(root) {


    console.log(root);

    let heirarchy = [{ Id: root, Parent: null }];

    function createTree(root, level, crates) {
      //console.log(root)
      if (level === 4) {
        return;
      } else {
        for (const crate of crates) {
          //console.log(crate)
          //console.log(crate['dates'][crate['dates'].length -1]['dependencies'])
          //console.log(crate['dates'][crate['dates'].length -1]['dependencies'])
          for (const dep of crate["dates"][crate["dates"].length - 1][
            "dependencies"
          ]) {
            if (dep["crate_id"] == root) {
              heirarchy.push({
                Id: crate["dates"][crate["dates"].length - 1]["crate"],
                name: crate["dates"][crate["dates"].length - 1]["crate"],
                Parent: root,
                //attributes: crate["dates"][crate["dates"].length - 1]
              });
              //console.log(heirarchy)
              createTree(
                crate["dates"][crate["dates"].length - 1]["crate"],
                level + 1,
                crates
              );
            }
          }
        }
      }
    }

    createTree(root, 1, crates);
    console.log(heirarchy);
    let treeHi = buildHierarchy(heirarchy);
    let flatArray = [treeHi, heirarchy];
   return flatArray
 
};

export function getDownloadFilter(snapdate, slideValue) {


    console.log(snapdate);
    console.log(slideValue);
    let curr_date = Date.parse(snapdate);

    let index = 0;

    let color_codes = {};
    function getColorCodes(crate, curr_date, level, index) {
      if (level === 4) {
    
        return;
      } else {
    
      
       
            for (const version of crate["dates"]) {
              let prev_date = Date.parse(version["created_range"][0]);
              let future_date = Date.parse(version["created_range"][1]);
    
              if (prev_date < curr_date && curr_date < future_date) {
    
                if (colorArray[version["num_dex"]] == undefined)  {
                  color_codes[version["num_dex"]] = colorArray[index]
                } 


                for (const dex of version["dependencies"]) {
                  //console.log(dex)
                  for (const point of crates) {
                      if (point['id'] == dex['crate_id']) {
                        getColorCodes(point, curr_date, level + 1, index)
                      }
                  }
                }
                
    
            
           
              } 
            
          
        }
        
      }
    }

    for (const item of crates) {

      index = (index + 1) % colorArray.length;
      //console.log(index)
      getColorCodes(item, curr_date, 1, index);
    }
    console.log(Object.keys(color_codes).length)

    let nodes = [];
    let edges = [];
    for (const crate of crates) {
      if (Number(crate["downloads"]) > slideValue) {
        //console.log(crate);

        for (const version of crate["dates"]) {
          let prev_date = Date.parse(version["created_range"][0]);
          let future_date = Date.parse(version["created_range"][1]);

          if (prev_date < curr_date && curr_date < future_date) {
            //console.log('In between')
            //console.log(prev_date)
            //console.log(future_date)
            //console.log(version['created_range'])
            //rate_list.push(version)

            nodes.push({
              id: version["num_dex"],
              label: String(version["crate"]),
              x: Math.random(),
              y: Math.random(),
              color: "#666",
              info: {
                description: crate["description"],
                keywords: crate["keywords"],
                homepage: crate["homepage"],
                repository: crate["repository"],
                documentation: crate["documentation"],
                downloads: crate["downloads"],
              },
            });
            if (version["dep_idxs"].length === 0) {
              continue;
            } else {
              for (const dex of version["dep_idxs"]) {
                //console.log(String(Math.max(Number(version['num_dex']), Number(dex))) + ',' + String(Math.min(Number(version['num_dex']), Number(dex))))
                //edge_check.push(String(Math.max(Number(version['num_dex']), Number(dex))) + ',' + String(Math.min(Number(version['num_dex']), Number(dex))))

                edges.push({
                  id: String(version["num_dex"]) + "," + String(dex),
                  sourceId: version["num_dex"],
                  targetId: dex,
                  size: 1,
                  color: "#ccc",
                });
              }
            }
          }
        }
      }
    }

   return { nodes: nodes, edges: edges }

};

export function getKeywordSnapshot(snapdate, value) {

 
    console.log(snapdate);
    console.log(value);
    let curr_date = Date.parse(snapdate);

    let index = 0;

    let color_codes = {};
    function getColorCodes(crate, curr_date, level, index) {
      if (level === 4) {
    
        return;
      } else {
    
      
       
            for (const version of crate["dates"]) {
              let prev_date = Date.parse(version["created_range"][0]);
             let  future_date = Date.parse(version["created_range"][1]);
    
              if (prev_date < curr_date && curr_date < future_date) {
    
                if (colorArray[version["num_dex"]] == undefined)  {
                  color_codes[version["num_dex"]] = colorArray[index]
                } 


                for (const dex of version["dependencies"]) {
                  //console.log(dex)
                  for (const point of crates) {
                      if (point['id'] == dex['crate_id']) {
                        getColorCodes(point, curr_date, level + 1, index)
                      }
                  }
                }
                
    
            
           
              } 
            
          
        }
        
      }
    }

    for (const item of crates) {

      index = (index + 1) % colorArray.length;
      //console.log(index)
      getColorCodes(item, curr_date, 1, index);
    }
    console.log(Object.keys(color_codes).length)

    let nodes = [];
    let edges = [];
    for (const crate of crates) {
      if (crate["keywords"].includes(value)) {
        console.log(crate);

        for (const version of crate["dates"]) {
          let prev_date = Date.parse(version["created_range"][0]);
          let future_date = Date.parse(version["created_range"][1]);

          if (prev_date < curr_date && curr_date < future_date) {
            //console.log('In between')
            //console.log(prev_date)
            //console.log(future_date)
            //console.log(version['created_range'])
            //rate_list.push(version)

            nodes.push({
              id: version["num_dex"],
              label: String(version["crate"]),
              x: Math.random(),
              y: Math.random(),
              color: "#666",
              info: {
                description: crate["description"],
                keywords: crate["keywords"],
                homepage: crate["homepage"],
                repository: crate["repository"],
                documentation: crate["documentation"],
                downloads: crate["downloads"],
              },
            });
            if (version["dep_idxs"].length === 0) {
              continue;
            } else {
              for (const dex of version["dep_idxs"]) {
                //console.log(String(Math.max(Number(version['num_dex']), Number(dex))) + ',' + String(Math.min(Number(version['num_dex']), Number(dex))))
                //edge_check.push(String(Math.max(Number(version['num_dex']), Number(dex))) + ',' + String(Math.min(Number(version['num_dex']), Number(dex))))

                edges.push({
                  id: String(version["num_dex"]) + "," + String(dex),
                  sourceId: version["num_dex"],
                  targetId: dex,
                  size: 1,
                  color: "#ccc",
                });
              }
            }
          }
        }
      }
    }

    return { nodes: nodes, edges: edges }

};

export var getDaysArray = function (start, end) {
  for (
    var arr = [], dt = new Date(start);
    dt <= end;
    dt.setDate(dt.getDate() + 7)
  ) {
    arr.push(new Date(dt));
  }
  return arr;
};

export function getTimeSeries (snapdate) {


    console.log(snapdate);

    var daylist = getDaysArray(new Date(snapdate[0]), new Date(snapdate[1]));
    console.log(daylist);

    let time_series = [];
    for (const curr_date of daylist) {
      let parse_date = Date.parse(curr_date);

      //let edge_check = [];
      let nodes = [];
      let edges = [];
      for (const crate of crates) {
        for (const version of crate["dates"]) {
          let prev_date = Date.parse(version["created_range"][0]);
          let future_date = Date.parse(version["created_range"][1]);

          if (prev_date < parse_date && parse_date < future_date) {
            //console.log(version["crate"]);
            let added = false;
            for (const item of nodes) {
              if (item.id == version["num_dex"]) {
                added = true;
              }
            }
            if (added == true) {
              continue;
            } else {
              nodes.push({
                id: version["num_dex"],
                label: String(version["crate"]),
                x: Math.random(),
                y: Math.random(),
                color: "#666",
              });
            }

            if (version["dep_idxs"].length === 0) {
              continue;
            } else {
              for (const dex of version["dep_idxs"]) {
                edges.push({
                  id:
                    String(version["num_dex"]) +
                    "," +
                    String(version["num_dex"]),
                  sourceId: version["num_dex"],
                  targetId: dex,
                  size: 1,
                  color: "#ccc",
                });
              }
            }
          }
        }
      }

      time_series.push({ nodes: nodes, edges: edges });
    }

    return time_series

};

export function getGraphSnapshot (snapdate) {

    console.log(Date.parse(snapdate));
    
    let curr_date = Date.parse(snapdate);
    let index = 0;

    let color_codes = {};
    function getColorCodes(crate, curr_date, level, index) {
      if (level === 4) {
    
        return;
      } else {
    
      
       
            for (const version of crate["dates"]) {
              let prev_date = Date.parse(version["created_range"][0]);
              let future_date = Date.parse(version["created_range"][1]);
    
              if (prev_date < curr_date && curr_date < future_date) {
    
                if (colorArray[version["num_dex"]] == undefined)  {
                  color_codes[version["num_dex"]] = colorArray[index]
                } 


                for (const dex of version["dependencies"]) {
                  //console.log(dex)
                  for (const point of crates) {
                      if (point['id'] == dex['crate_id']) {
                        getColorCodes(point, curr_date, level + 1, index)
                      }
                  }
                }
                
    
            
           
              } 
            
          
        }
        
      }
    }

    for (const item of crates) {

      index = (index + 1) % colorArray.length;
      //console.log(index)
      getColorCodes(item, curr_date, 1, index);
    }
    console.log(Object.keys(color_codes).length)

    

    let nodes = [];
    let edges = [];

    for (const crate of crates) {
      for (const version of crate["dates"]) {
        let prev_date = Date.parse(version["created_range"][0]);
        let future_date = Date.parse(version["created_range"][1]);

        if (prev_date < curr_date && curr_date < future_date) {
          //console.log(version["crate"]);
          let added = false;
          for (const item of nodes) {
            if (item.id == version["num_dex"]) {
              added = true;
            }
          }
          if (added == true) {
            continue;
          } else {
            let color_choice = color_codes[version['num_dex']]
            nodes.push({
              id: version["num_dex"],
              label: String(version["crate"]),
              x: Math.random(),
              y: Math.random(),
              size: version["dep_idxs"].length,
              color: color_choice,
              info: {
                id: crate['id'],
                description: crate["description"],
                keywords: crate["keywords"],
                homepage: crate["homepage"],
                repository: crate["repository"],
                documentation: crate["documentation"],
                downloads: crate["downloads"],
              },
            });
          }

          if (version["dep_idxs"].length === 0) {
            continue;
          } else {
            for (const dex of version["dep_idxs"]) {
              let color_choice = color_codes[version['num_dex']]

              edges.push({
                id:
                  String(version["num_dex"]) + "," + String(version["num_dex"]),

                sourceId: version["num_dex"],
                targetId: dex,
                size: 1,
                color: color_choice
              });
            }
          }
        }
      }
    }


   return { nodes: nodes, edges: edges } 

};

/* module.exports = {
  getFlatArray,
  getGraphSnapshot,
  getKeywordSnapshot,
  getDownloadFilter,
  getReverseDependencies,
  getTimeSeries,
}; */

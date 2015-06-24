/**
 * Created by twardell on 13/05/2015.
 */

app.controller('AnnotationExtensionRelationsCtrl', function( $scope, targetDomainAndPort) {


  var oX = 0;
  var oY = 0;

  var vis = initVis();
  var oSettings = { extlinks: [ { name : "GOC wiki page",  link : "http://wiki.geneontology.org/index.php/Annotation_Extension_Relation:###ID###" } ] };
  var MF = {
    dataSchema: {
      nodes: [
        { name: "name", type: "string" },
        { name: "usage", type: "string" },
        { name: "domain", type: "string" },
        { name: "range", type: "string" },
        { name: "is_obsolete", type: "string" },
        { name: "subsets", type: "object" }
      ],
      edges: [
        { name: "type", type: "string" }
      ]
    }
  };


  drawOntology();

  function initVis() {
    var options = {
      // where you have the Cytoscape Web SWF
      swfPath: "swf/CytoscapeWeb",
      // where you have the Flash installer SWF
      flashInstallerPath: "swf/playerProductInstall"
    };

    return new org.cytoscapeweb.Visualization("cytoscapeweb", options);
  }

  function clone(obj) {
    var newObj = (obj instanceof Array) ? [] : {};
    for (var i in obj) {
      if (obj[i] && typeof obj[i] == "object") {
        newObj[i] = clone(obj[i]);
      }
      else {
        newObj[i] = obj[i];
      }
    }
    return newObj;
  }

  function setStyle() {
    var cMapper = {
      attrName: "t",
      entries: [ { attrValue: 2, value: "7ac5cd" } ]
    };

    var cbMapper = {
      attrName: "t",
      entries: [ { attrValue: 2, value: "ee7621" } ]
    };

    var ecMapper = {
      attrName: "t",
      entries: [ { attrValue: "part_of", value: "6495ed" } ]
    };

    var hMapper = {
      attrName: "h",
      entries: [
        { attrValue: 3, value: 60 },
        { attrValue: 4, value: 80 },
        { attrValue: 5, value: 100 },
        { attrValue: 6, value: 120 },
        { attrValue: 7, value: 140 },
        { attrValue: 8, value: 160 }
      ]
    };

    vis["borderColor"] = function (data) {
      var ss = data["ss"];
      if (ss) {
        if (ss.match("generic")) {
          return "#ee7621";
        }
      }
      return  "#6e6e6e";
    };

    vis["nodeLabel"] = function (data) {
      var s = data["id"];
      return s.replace(/_/g, "\n");
    };

    var style = {
      global: {
        backgroundColor: "#f0f0f0"
      },
      nodes: {
        tooltipText: "${id}",
        shape: "ROUNDRECT",
        color: {
          defaultValue:"#e3e3e3",
          discreteMapper: cMapper
        },
        opacity: 0.9,
        height: {
          defaultValue: 60,
          discreteMapper: hMapper
        },
        width:80,
        borderColor: { customMapper: { functionName: "borderColor" } },
        label: { customMapper: { functionName: "nodeLabel" } },
        borderWidth: 2
      },
      edges: {
        targetArrowShape: "ARROW",
        color: {
          defaultValue:"#6e6e6e",
          discreteMapper: ecMapper
        },
        width: {
          defaultValue: 1
        }
      }
    };

    vis.visualStyle(style);
    vis.zoomToFit();
  }

  function drawOntology() {
    function callback(data) {
      MF['data'] = data;
      var js2 = clone( MF );

      vis.ready(function() { setStyle(); });

      vis.addListener("click", "nodes", function(event) { nodeMenu(event); });

      var layout = {
        name:    "Tree",
        options: { breadthSpace: 70, subtreeSpace: 90, depthSpace : 100}
      };

      vis.draw({ network: js2, nodeTooltipsEnabled: true, edgeTooltipsEnabled: true, layout: layout });
    }

    //$.getJSON("GValidate", "service=ann_ext&action=getRelations&format=graph", callback);
    //$.getJSON("GValidate", "http://www.ebi.ac.uk/QuickGO/GValidate?service=ann_ext&action=getRelations&format=graph", callback);
    $.getJSON(targetDomainAndPort+"/ws/annotationExtensionRelations", "", callback);

  }

  function clearMenu(menu) {
    document.getElementById(menu).innerHTML = "";
  }

  function printMenu(menu, msg) {
    document.getElementById(menu).innerHTML += '<p style="padding-bottom:5px">' + msg + "</p>"
  }

  function nodeMenu(event) {
    clearMenu("nodenote");
    clearMenu("nodetitle");

    var data = event.target.data;

    printMenu("nodetitle", data.id);

    var eLinks = oSettings.extlinks;
    for (var i = 0; i < eLinks.length; i++) {
      var link = eLinks[i];
      var label = link.name;
      var url = link.link.replace(/###ID###/g, data.id);
      var mItem  = '<b>'+label+': </b> <a href="'+encodeURI(url)+'">'+data.id+'</a>';
      printMenu("nodenote", mItem);
    }

    if (data.domain) {
      printMenu("nodenote", "<b>GO Annotation Domain:</b> " + data.domain);
    }

    if (data.range) {
      printMenu("nodenote", "<b>GO Annotation Range:</b> " + data.range);
    }

    if (data.usage) {
      printMenu("nodenote", "<b>Usage:</b> " + data.usage);
    }

    if (data.subsets && data.subsets.length > 1) {
      printMenu("nodenote", "<b>Subsets:</b>");
      for (i = 0; i < data.subsets.length; i++) {
        // ignore the "all_relations" subset, which isn't a "real" subset
        if (data.subsets[i] != "all_relations") {
          printMenu("nodenote", data.subsets[i]);
        }
      }
    }

    var pm = document.getElementById('dialog');
    pm.style.top = menuY();
    pm.style.left = menuX();
    pm.style.visibility = 'visible';
    pm.style.display = 'normal';

    //transition effect
    var id ="#dialog";
    $(id).fadeIn('fast');
    $(id).css('visibility', 'visible');
  }

  function menuX() {
    return (oX + 10) + 'px';
  }

  function menuY() {
    return (oY - 50) + 'px';
  }

  jQuery(document).ready(function($) {
    $(document).mousemove(function(e){
      oX = e.pageX;
      oY = e.pageY;
    });
  })

});

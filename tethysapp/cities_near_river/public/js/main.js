var app, map, gp;

require(["esri/Color",
              "esri/layers/ArcGISDynamicMapServiceLayer",
              "esri/layers/ArcGISTiledMapServiceLayer",
              "esri/map",
              "esri/graphic",
              "esri/graphicsUtils",
              "esri/tasks/Geoprocessor",
              "esri/tasks/LinearUnit",
              "esri/symbols/SimpleMarkerSymbol",
              "esri/symbols/SimpleLineSymbol",
              "dojo/domReady!"
              ],

        function(Color, ArcGISDynamicMapServiceLayer, ArcGISTiledMapServiceLayer, Map, Graphic, graphicsUtils, Geoprocessor, LinearUnit, SimpleMarkerSymbol, SimpleLineSymbol){

           map = new Map("mapDiv", {
              basemap: "streets",
              center: [-100, 38],
              zoom: 4
            });

            var Layer = new ArcGISDynamicMapServiceLayer("http://geoserver.byu.edu:6080/arcgis/rest/services/dan_ames/us_map/MapServer");
            map.addLayer(Layer);

            gp = new Geoprocessor("http://geoserver.byu.edu:6080/arcgis/rest/services/dan_ames/CitiesNearRivers/GPServer/CitiesNearRivers");
            gp.setOutputSpatialReference({
              wkid: 102100
            });

        function run_service(){

            var vsDistance = new LinearUnit();
            vsDistance.distance = document.getElementById("distance").value;
            vsDistance.units = "esriKilometers";

            var params = {
                "Distance": vsDistance
                            };
            gp.execute(params, displayResult);
          }

        function displayResult(result, messages) {
            var pointSymbol = new SimpleMarkerSymbol();
            pointSymbol.setSize(14);
            pointSymbol.setOutline(new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 0]), 1));
            pointSymbol.setColor(new Color([0, 255, 0, 0.8]));

            var features = result[0].value.features;
            for (var f=0, fl=features.length; f<fl; f++) {
              var feature = features[f];
              feature.setSymbol(pointSymbol);
              map.graphics.add(feature);
            }
            map.setExtent(graphicsUtils.graphicsExtent(map.graphics.graphics), true);
          }

          // adds public functions to variable app

          app = {run_service: run_service};
    });

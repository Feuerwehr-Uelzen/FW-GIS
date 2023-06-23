document.addEventListener("DOMContentLoaded", () => {
    // Set the default values
    let latAndLon = [52.96572, 10.56111];
    let defaultZoom = 10;

    // Initializing the Leaflet-Map
    let leafletMap = L.map('LeafletGIS_Map').setView(latAndLon, defaultZoom);

    // Set the map tile layer
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(leafletMap);

    /**
     * Add all regions (defined in this function) to the map layer
     */
    function addAllRegionsGeoLayers() {
        // List of all regions and their respective map layer color
        let nameOfRegions = [
            {
                displayName: 'SG Suderburg',
                name: 'suderburg',
                color: '#55a3c9'
            },
            {
                displayName: 'Stadt Uelzen',
                name: 'uelzen',
                color: '#e5e5e5'
            },
            {
                displayName: 'SG Bevensen - Ebstorf',
                name: 'bevensen_ebstorf',
                color: '#795a16'
            },
            {
                displayName: 'SG Bodenteich',
                name: 'bodenteich',
                color: '#a132b9'
            },
            {
                displayName: 'EG Bienenbüttel',
                name: 'bienenbüttel',
                color: '#4dd736'
            },
            {
                displayName: 'SG Aue',
                name: 'rosche',
                color: '#c92525'
            },
        ];

        // Iterate through all items and add them to the map
        nameOfRegions.forEach(region => {
            addSingleRegionalGeoJSON(region);
        })
    }

    /**
     * Add a single region (by fetching the GeoJSON) to the map layer
     * @param regionData
     */
    function addSingleRegionalGeoJSON(regionData) {
        fetch(`./assets/dataset/geoJSON/${regionData.name}.geojson`).then((response) => {
            return response.json();
        }).then((data) => {
            /**
             * Define the style of a GeoJSON Layer
             * @param feature
             * @returns {{fillColor, color, fillOpacity: number, weight: number, opacity: number, dashArray: string}}
             */
            function style(feature) {
                return {
                    weight: 1,
                    opacity: 0.4,
                    color: regionData.color,
                    dashArray: '1',
                    fillOpacity: 0.4,
                    fillColor: regionData.color
                };
            }

            /**
             * Define the function of a GeoJSON Layer
             * @param feature
             * @param layer
             */
            function onEachFeature(feature, layer) {
                layer.on({
                    click: () => {
                        alert(regionData.displayName)
                    }
                });
            }

            /* Add a GEO-JsonLayer */
            L.geoJSON(data, {
                style,
                onEachFeature
            }).addTo(leafletMap);
        });
    }

    // Add regions to the map
    addAllRegionsGeoLayers();
});

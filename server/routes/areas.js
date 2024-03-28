const
  express = require("express"),
  
  { default: centroid } = require("@turf/centroid"),

  router = express.Router(),
  
  admNames = require("../data/adm.json"),
  admGeojson = require("../data/gadm41_KHM_3.json");


// @route    GET /api/areas/commune-geolocation
// @desc     Get the gelocation for a commune
// @access   Public
router.get("/commune-geolocation", (req, res) => {
  const
    { adm1, adm2, adm3 } = req.query,
    
    iAdm = admNames.findIndex(el => el.NAME_1 === adm1 && el.NAME_2 === adm2 && el.NAME_3 === adm3),
    admFeature = admGeojson.features[iAdm],
    featureGeojson = {
      type: "FeatureCollection",
      features: [admFeature]
    },
    { geometry: { coordinates: [ lon, lat] } } = centroid(featureGeojson);

  res.json({ lon, lat });
});

module.exports = router;


 /* -----------------------------------------------------------------------------

   Creates a set of Sentinel-2 mosaics by meteorological season
   João Gonçalves
   Porto, March 2018

 ------------------------------------------------------------------------------ */

// Define the region of interest
var ROI = ee.Geometry.Polygon([[-8.445,41.645],[-8.445,42.115],
[-7.725,42.115],[-7.725,41.645]]);


// Make image collections ---------------------------------------------------
// Filter by date/calendar range and cloud coverage

var S2_wint = ee.ImageCollection('COPERNICUS/S2').
  filter(ee.Filter.calendarRange(12,2,'month')).
  filter(ee.Filter.calendarRange(2015,2017,'year')).
  filterMetadata('CLOUDY_PIXEL_PERCENTAGE','less_than', 30).
  filterBounds(ROI);

var S2_sprg = ee.ImageCollection('COPERNICUS/S2').
  filter(ee.Filter.calendarRange(3,5,'month')).
  filter(ee.Filter.calendarRange(2015,2017,'year')).
  filterMetadata('CLOUDY_PIXEL_PERCENTAGE','less_than', 30).
  filterBounds(ROI);
  
var S2_summ = ee.ImageCollection('COPERNICUS/S2').
  filter(ee.Filter.calendarRange(6,8,'month')).
  filter(ee.Filter.calendarRange(2015,2017,'year')).
  filterMetadata('CLOUDY_PIXEL_PERCENTAGE','less_than', 30).
  filterBounds(ROI);
  
var S2_autm = ee.ImageCollection('COPERNICUS/S2').
  filter(ee.Filter.calendarRange(9,11,'month')).
  filter(ee.Filter.calendarRange(2015,2017,'year')).
  filterMetadata('CLOUDY_PIXEL_PERCENTAGE','less_than', 30).
  filterBounds(ROI);

  
// Make image mosaic ---------------------------------------------------------
// Best quality pixel mosaic
/*
var S2_wint_mosaic = S2_wint.qualityMosaic('QA10').int16();
var S2_sprg_mosaic = S2_sprg.qualityMosaic('QA10').int16();
var S2_summ_mosaic = S2_summ.qualityMosaic('QA10').int16();
var S2_autm_mosaic = S2_autm.qualityMosaic('QA10').int16();
*/

// Median mosaic
var S2_wint_mosaic = S2_wint.median().int16();
var S2_sprg_mosaic = S2_sprg.median().int16();
var S2_summ_mosaic = S2_summ.median().int16();
var S2_autm_mosaic = S2_autm.median().int16();


// Print some results -------------------------------------------------------- 

print(S2_wint);
print(S2_sprg);
print(S2_summ);
print(S2_autm);

print(S2_wint_mosaic);
print(S2_sprg_mosaic);
print(S2_summ_mosaic);
print(S2_autm_mosaic);


// Export ---------------------------------------------------------------------

Export.image.toDrive({image: S2_summ_mosaic,
                      description: 'S2_summ_mosaic', 
                      folder: 'GEE',
                      region: ROI,
                      crs: 'EPSG:32629',
                      scale: 10
});

Export.image.toDrive({image: S2_wint_mosaic,
                      description: 'S2_wint_mosaic', 
                      folder: 'GEE',
                      region: ROI,
                      crs: 'EPSG:32629',
                      scale: 10
});

Export.image.toDrive({image: S2_sprg_mosaic,
                      description: 'S2_sprg_mosaic', 
                      folder: 'GEE',
                      region: ROI,
                      crs: 'EPSG:32629',
                      scale: 10
});

Export.image.toDrive({image: S2_autm_mosaic,
                      description: 'S2_autm_mosaic', 
                      folder: 'GEE',
                      region: ROI,
                      crs: 'EPSG:32629',
                      scale: 10
});



// Visualize image data -------------------------------------------------------
/*
//var visParams = {bands: ['B8', 'B4', 'B3'], max: 3048, gamma: 1}; // False Color Infrared
var visParams = {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000}; /// True-color composite

// Map results
Map.centerObject(ROI, 10);
Map.addLayer(S2_wint_mosaic, visParams, 'Sentinel-2 mosaic winter');
Map.addLayer(S2_sprg_mosaic, visParams, 'Sentinel-2 mosaic spring');
Map.addLayer(S2_summ_mosaic, visParams, 'Sentinel-2 mosaic summer');
Map.addLayer(S2_autm_mosaic, visParams, 'Sentinel-2 mosaic autumn');
//Map.addLayer(ROI,{color: '000000', opacity: 0.05},'ROI');
*/

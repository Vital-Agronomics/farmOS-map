// Import OL layer types.
import LayerGroup from 'ol/layer/Group';
import TileLayer from 'ol/layer/Tile';

// Import OL source types.
import OSM from 'ol/source/OSM';

// Import ol-layerswitcher.
import 'ol-layerswitcher/src/ol-layerswitcher.css';
import LayerSwitcher from 'ol-layerswitcher';

// Import ol-geocoder.
import 'ol-geocoder/dist/ol-geocoder.css';
import Geocoder from 'ol-geocoder';

// Import OL controls.
import { defaults as defaultControls, FullScreen, ScaleLine } from 'ol/control';

// Import OL interactions.
import { defaults as defaultInteractions } from 'ol/interaction';

// Import Geolocate control.
import Geolocate from '../control/Geolocate/Geolocate';

// Define an object that contains the default layers, controls, and interactions
// that will be added to all farmOS maps.
const defaults = {

  // Layers.
  layers() {
    return [
      new LayerGroup({
        title: 'Base layers',
        layers: [
          new TileLayer({
            title: 'OpenStreetMap',
            type: 'base',
            source: new OSM(),
          }),
        ],
      }),
    ];
  },

  // Controls.
  controls(options) {

    // Determine the units to use for the ScaleLine control.
    const units = (options.units === 'us') ? 'us' : 'metric';

    // Define default farmOS controls.
    const farmMapDefaults = [
      new LayerSwitcher(),
      new FullScreen(),
      new ScaleLine({ units }),
      new Geolocate(),
      new Geocoder('nominatim', {
        provider: 'osm',
        placeholder: 'Search for address...',
        limit: 5,
        autoComplete: true,
      }),
    ];

    // If controls were set to 'false', don't attach any controls.
    if (options.controls === false) {
      return [];
    }

    // If an array of controls was passed, use this instead of the defaults.
    if (Array.isArray(options.controls)) {
      return options.controls;
    }

    // If an object was passed, assume that it is options that will be passed to
    // defaultControls().
    if (typeof options.controls === 'object') {
      return defaultControls(options.controls).extend(farmMapDefaults);
    }

    // If a callback function is provided, pass it the defaults
    // and return what it evaluates to.
    if (typeof options.controls === 'function') {
      return options.controls(defaultControls().extend(farmMapDefaults).getArray());
    }

    // Otherwise just return the defaults.
    return defaultControls().extend(farmMapDefaults);
  },

  // Interactions.
  interactions(options) {

    // Define default farmOS interactions.
    const farmMapDefaults = [
    ];

    // If interactions were set to 'false', don't attach any interactions.
    if (options.interactions === false) {
      return [];
    }

    // If an array of interactions was passed, use this instead of the defaults.
    if (Array.isArray(options.interactions)) {
      return options.interactions;
    }

    // If an object was passed, assume that it is options that will be passed to
    // defaultInteractions().
    if (typeof options.interactions === 'object') {
      return defaultInteractions(options.interactions).extend(farmMapDefaults);
    }

    // If a callback function is provided, pass it the defaults
    // and return what it evaluates to.
    if (typeof options.interactions === 'function') {
      return options.interactions(defaultInteractions().extend(farmMapDefaults).getArray());
    }

    // Otherwise just return the defaults.
    return defaultInteractions().extend(farmMapDefaults);
  },
};
export default defaults;
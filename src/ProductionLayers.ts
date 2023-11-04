import GeoJSON from 'ol/format/GeoJSON.js';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { finfish } from "./geojson/finfish";
import { shellfish } from "./geojson/shellfish";
import { Style, Circle as CircleStyle, Stroke } from "ol/style";
import { Projection } from 'ol/proj';

const dataProj = new Projection({
    code: "EPSG:4326",
    units: "degrees"
})

const mapProj = new Projection({
    code: "EPSG:3857",
    units: "m"
})

const finfishSource = new VectorSource({
    features: new GeoJSON().readFeatures(finfish, { dataProjection: dataProj, featureProjection: mapProj }),
});

const shellfishSource = new VectorSource({
    features: new GeoJSON().readFeatures(shellfish, { dataProjection: dataProj, featureProjection: mapProj }),
});

const blueCircle = new CircleStyle({
    radius: 3,
    fill: null,
    stroke: new Stroke({ color: '#2563eb', width: 1 }),
});

const redCircle = new CircleStyle({
    radius: 3,
    fill: null,
    stroke: new Stroke({ color: '#dc2626', width: 1 }),
});

export const finfishLayer = new VectorLayer({
    source: finfishSource,
    style: new Style({
        image: blueCircle,
    })
});

export const shellfishLayer = new VectorLayer({
    source: shellfishSource,
    style: new Style({
        image: redCircle,
    })
});
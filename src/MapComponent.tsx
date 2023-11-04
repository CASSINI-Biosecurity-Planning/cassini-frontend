import { createEffect, type Component, onMount, Accessor } from 'solid-js';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { finfishLayer, shellfishLayer } from './ProductionLayers';
import { View } from 'ol';
import { LayerSelection, ProductionLayer } from './types';

export const MapComponent: Component<{ layers: Accessor<LayerSelection> }> = ({ layers }) => {
    let map: Map;
    let mapElement: HTMLDivElement;

    onMount(() => {
        map = new Map({
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
                finfishLayer,
                shellfishLayer
            ],
            view: new View({
                center: [500000, 7500000],
                zoom: 4,
            }),
            target: mapElement,
            controls: []
        });

        return () => map.dispose();
    })

    createEffect(() => {
        finfishLayer.setVisible(layers()[ProductionLayer.Finfish]);
        shellfishLayer.setVisible(layers()[ProductionLayer.Shellfish]);
    })

    return (
        <div ref={mapElement} class="w-full h-full">

        </div>
    );
};


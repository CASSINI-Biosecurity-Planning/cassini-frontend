import { createEffect, type Component, onMount, Accessor, createSignal, Setter } from 'solid-js';
import Map from 'ol/Map';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { finfishLayer, shellfishLayer } from './ProductionLayers';
import { View } from 'ol';
import { LayerSelection, ProductionLayer } from './types';
import { TileWMS } from 'ol/source';

export const MapComponent: Component<{ layers: Accessor<LayerSelection> }> = ({ layers }) => {
    let map: Map;
    let mapElement: HTMLDivElement;
    let startTime = new Date(2023, 9, 25, 18, 59, 52)
    let greeceStartTime = new Date(2023, 9, 14, 10, 25, 0)
    let [timeStep, setTime] = createSignal<number>(0)
    
    const norway_wmsLayer = new TileLayer({
        source: new TileWMS({
            url: 'http://localhost:5051/wms',
            params: {
                'LAYERS': 'West of Norway',
                'TILED': true,
                'time': new Date(startTime).toISOString() 
            },
        })
    })
    const greece_wmsLayer = new TileLayer({
        source: new TileWMS({
            url: 'http://localhost:5051/wms',
            params: {
                'LAYERS': 'Greece-5',
                'TILED': true,
                'time': new Date(greeceStartTime).toISOString() 
            },
        })
    })

        onMount(() => {
            map = new Map({
                layers: [
                    new TileLayer({
                        source: new OSM()
                    }),
                    finfishLayer,
                    shellfishLayer,
                    norway_wmsLayer,
                    greece_wmsLayer,

                ],
                view: new View({
                    center: [500000, 7500000],
                    zoom: 4,
                }),
                target: mapElement,
                controls: [


                ]
            });
            return () => map.dispose();
        })

    createEffect(() => {
        finfishLayer.setVisible(layers()[ProductionLayer.Finfish]);
        shellfishLayer.setVisible(layers()[ProductionLayer.Shellfish]);
        const time_shift = new Date(startTime).setHours(startTime.getHours() + timeStep())
        const greece_time_shift = new Date(greeceStartTime).setHours(greeceStartTime.getHours() + timeStep())

        norway_wmsLayer.setSource(new TileWMS({
            url: 'http://localhost:5051/wms',
            params: {
                'LAYERS': 'West of Norway',
                'TILED': true,
                'time': new Date(time_shift).toISOString()
            },
        }))
        greece_wmsLayer.setSource(new TileWMS({
            url: 'http://localhost:5051/wms',
            params: {
                'LAYERS': 'Greece-5',
                'TILED': true,
                'time': new Date(greece_time_shift).toISOString()
            },
        }))
    })

    // setInterval(()=> setTime(timeStep() + 1), 700)

    return (
        <>
        

        <label class="">
        <input type='range' class="mx-10 px-10 z-50 absolute justify-center w-1/2 h-10 bg-white rounded-lg 
        " min={0} max={120} value={timeStep()} onChange={e => setTime(e.target.valueAsNumber)} />
        </label>

        <div ref={mapElement} class="w-full h-full">

        </div>
        </>


    );
};
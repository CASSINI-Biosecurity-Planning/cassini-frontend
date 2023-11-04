import { createSignal, type Component, Accessor } from 'solid-js';
import { MapComponent } from './MapComponent';
import { LayerSelection, ProductionLayer } from './types';

const initialSelection: LayerSelection = {
  [ProductionLayer.Finfish]: true,
  [ProductionLayer.Shellfish]: false
}

const App: Component = () => {
  const [layers, setLayers] = createSignal<LayerSelection>(initialSelection);

  const toggleLayer = (e: any, layer: ProductionLayer) => {
    setLayers({ ...layers(), [layer]: e.target.checked })
  }

  return (
    <div class="w-screen h-screen flex flex-row">
      <div class="w-[400px] bg-white h-full z-10 shadow-xl">
        <header class="text-slate-50 bg-gradient-to-r from-sky-700 via-teal-700 to-sky-800 px-4 pb-3 pt-2 z-10">
          <h1 class="font-semibold text-xl text-center">Parasite Trackr</h1>
        </header>

        <div class="p-3">
          <h2 class="font-semibold">Production sites:</h2>
          <LayerListElement layer={ProductionLayer.Finfish} layers={layers} toggle={toggleLayer} />
          <LayerListElement layer={ProductionLayer.Shellfish} layers={layers} toggle={toggleLayer} />
        </div>

        <div class="p-3">
          <h2 class="font-semibold">Simulations:</h2>
          ...
        </div>
      </div>

      <div class="w-full h-full">
        <MapComponent layers={layers} />
      </div>
    </div>
  );
};

interface LayerListElementProps {
  layer: ProductionLayer
  layers: Accessor<LayerSelection>
  toggle: (e: any, layer: ProductionLayer) => void
}

const LayerListElement: Component<LayerListElementProps> = ({ layer, layers, toggle }) => {
  return (
    <div>
      <label>
        <input type='checkbox' onChange={e => toggle(e, layer)} checked={layers()[layer]} class="mr-2" />
        {layer}
      </label>
    </div>
  );
}

export default App;

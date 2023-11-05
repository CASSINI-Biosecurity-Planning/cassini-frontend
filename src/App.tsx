import { createSignal, type Component, Accessor } from 'solid-js';
import { MapComponent } from './MapComponent';
import { LayerSelection, ProductionLayer,SimulationSelection,Simulation } from './types';

const initialSelection: LayerSelection = {
  [ProductionLayer.Finfish]: true,
  [ProductionLayer.Shellfish]: false
}



const App: Component = () => {
  const [layers, setLayers] = createSignal<LayerSelection>(initialSelection);

  const [simulations, setSimulations] = createSignal<Simulation>(Simulation.SalmonLice);

  const toggleLayer = (e: any, layer: ProductionLayer) => {
    setLayers({ ...layers(), [layer]: e.target.checked })
  }
  const toggleSimulation = (e: any, simulation: Simulation) => {
    setSimulations(simulation)
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
              <LayerListButton layer={Simulation.SalmonLice} layers={simulations} toggle={toggleSimulation} />
              <LayerListButton layer={Simulation.CodWorm} layers={simulations} toggle={toggleSimulation} />
        </div>
        <RunButton />
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
interface LayerListButtonProps {
  layer: Simulation 
  layers: Accessor<Simulation>
  toggle: (e: any, layer: Simulation) => void
}

const LayerListButton: Component<LayerListButtonProps> = ({ layer, layers, toggle }) => {
  return (
    <div>
        <label>
          <input type='radio' onChange={e => toggle(e, layer)} checked={layers() == layer } class="mr-2" />
          {layer}
        </label>
    </div>
  );
}

const RunButton: Component = () => {
  /*
  create button that runs the simulation, should be placed in the bottom left corner of the screen
  svg with a play button
  */ 
  return (
    <div
      class='
        absolute
        bottom-0
        left-0
        flex
        justify-center
        items-center
        bg-gradient-to-r
        from-green-300
        to-green-600
        text-slate-50
        w-16
        h-16
        rounded-full
        m-4
        shadow-xl
        z-10 
        
      '
    >
      <button>
        <PlayButton/>
        Run
        </button>
    </div>
  );
}

const PlayButton  : Component = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" class="" fill="none" viewBox="0 0 24 24"
    stroke="currentColor">
    <polygon points="5 3 19 12 5 21 5 3" />


</svg>

  )

}

export default App;

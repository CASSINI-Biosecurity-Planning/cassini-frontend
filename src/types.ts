export enum ProductionLayer {
    Finfish = "Finfish",
    Shellfish = "Shellfish"
}

export type LayerSelection = {
    [ProductionLayer.Finfish]: boolean
    [ProductionLayer.Shellfish]: boolean
}
export const enum Simulation {
  SalmonLice = 'Salmon Lice',
  CodWorm = 'Cod Worm',
};

export type SimulationSelection = {
    [Simulation.SalmonLice]: boolean
    [Simulation.CodWorm]: boolean
}
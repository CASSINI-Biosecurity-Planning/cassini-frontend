export enum ProductionLayer {
    Finfish = "Finfish",
    Shellfish = "Shellfish"
}

export type LayerSelection = {
    [ProductionLayer.Finfish]: boolean
    [ProductionLayer.Shellfish]: boolean
}
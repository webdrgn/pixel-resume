export interface IGame {
    stages: IGameStage[]
    candidate: any
    final: any
    offer: any
}

export interface IGameStage {
    id: number | string
}
/// <reference path="../lib/openrct2.d.ts" />

import { generateKey } from "crypto";
import { randomEnum } from "./utils"

enum RandomizerObjectiveType {
    RollerCoasterTypeWithStat,
    RollerCoasterTypeWithLenth,
    ScenarioStandard,
    ScenarioWithDifferentObjective,
    ScenarioWithHarderGuestGeneration,
    ScenarioWithSceneryRemovalOff,
    ScenarioWithLandChangesOff,
    ScenarioWithNoAdvertising,
    BuyAllLandAndConstructionRights,
    NumberOfGuestsOnSingleRide,
    NumberOfGuestsInSingleQueue,
    NumberOfGuestsWithThought,
    EarnAward,
    RemoveAllGuests
}

enum RandomizerObjectiveState {
    Incomplete,
    Complete
}

enum GridCompletionType {
    OneBingo,
    TwoBingos,
    Blackout
}

enum RandomizerGridState {
    Incomplete,
    Complete
}

export class RandomizerObjectiveGrid {
    public readonly completionType: GridCompletionType;

    public state: RandomizerGridState;
    public board: RandomizerObjective[][] = [];

    public constructor(completionType: GridCompletionType) {
        this.state = RandomizerGridState.Incomplete;
        this.completionType = completionType;
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                this.board[i][j] = new RandomizerObjective(i, j);
            }
        }
    }

    updateBoardState(): void {
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                this.board[i][j].updateObjectiveState();
            }
        }

        switch (this.completionType) {
            case GridCompletionType.OneBingo: {
                if (this.countBingos() >= 1) {
                    this.state = RandomizerGridState.Complete;
                }
                break;
            }
            case GridCompletionType.TwoBingos: {
                if (this.countBingos() >= 2) {
                    this.state = RandomizerGridState.Complete;
                }
                break;
            }
            case GridCompletionType.Blackout: {
                for (let i = 0; i < 5; i++) {
                    for (let j = 0; j < 5; j++) {
                        if (this.board[i][j].state != RandomizerObjectiveState.Complete) {
                            return;
                        }
                    }
                }
                this.state = RandomizerGridState.Complete;
                break;
            }
        }
    }

    countBingos(): number {
        let count: number = 0;

        // Count rows and columns
        let diagonal1Finished = true;
        let diagonal2Finished = true;
        for (let i = 0; i < 5; i++) {
            diagonal1Finished &&= (this.board[i][i].state == RandomizerObjectiveState.Complete);
            diagonal2Finished &&= (this.board[4-i][i].state == RandomizerObjectiveState.Complete);

            let rowFinished = true;
            let columnFinished = true;
            for (let j = 0; j < 5; j++) {
                rowFinished &&= (this.board[i][j].state == RandomizerObjectiveState.Complete);
                columnFinished &&= (this.board[j][i].state == RandomizerObjectiveState.Complete);
            }
            if (rowFinished) count++;
            if (columnFinished) count++;
        }
        if (diagonal1Finished) count++;
        if (diagonal2Finished) count++;

        return count;
    }
}

export class RandomizerObjective {
    public readonly goalType: RandomizerObjectiveType;
    public readonly pos_x: number;
    public readonly pos_y: number;

    public state: RandomizerObjectiveState;

    public constructor(x: number, y: number) {
        this.pos_x = x;
        this.pos_y = y;
        this.state = RandomizerObjectiveState.Incomplete;
        this.goalType = randomEnum(RandomizerObjectiveType);
    }

    updateObjectiveState(): void {
        switch (this.goalType) {
            case RandomizerObjectiveType.RollerCoasterTypeWithStat: {
                break;
            }
            case RandomizerObjectiveType.RollerCoasterTypeWithLenth: {
                break;
            }
            case RandomizerObjectiveType.ScenarioStandard: {
                break;
            }
            case RandomizerObjectiveType.ScenarioWithDifferentObjective: {
                break;
            }
            case RandomizerObjectiveType.ScenarioWithHarderGuestGeneration: {
                break;
            }
            case RandomizerObjectiveType.ScenarioWithSceneryRemovalOff: {
                break;
            }
            case RandomizerObjectiveType.ScenarioWithLandChangesOff: {
                break;
            }
            case RandomizerObjectiveType.ScenarioWithNoAdvertising: {
                break;
            }
            case RandomizerObjectiveType.BuyAllLandAndConstructionRights: {
                break;
            }
            case RandomizerObjectiveType.NumberOfGuestsOnSingleRide: {
                break;
            }
            case RandomizerObjectiveType.NumberOfGuestsInSingleQueue: {
                break;
            }
            case RandomizerObjectiveType.NumberOfGuestsWithThought: {
                break;
            }
            case RandomizerObjectiveType.EarnAward: {
                break;
            }
            case RandomizerObjectiveType.RemoveAllGuests: {
                break;
            }
        }
    }
}
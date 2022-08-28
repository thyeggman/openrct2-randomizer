/// <reference path="../lib/openrct2.d.ts" />

import { randomEnum } from "./utils"
import { ObjectiveInfo } from "./text";

export enum RandomizerObjectiveType {
    RollerCoasterTypeWithStat = 0,
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
    RemoveAllGuests,
    KillGuests
}

export enum RandomizerObjectiveState {
    Incomplete,
    Complete
}

export enum GridCompletionType {
    OneBingo,
    TwoBingos,
    Blackout
}

export enum RandomizerGridState {
    Incomplete,
    Complete
}

export class RandomizerObjectiveGrid {
    public readonly completionType: GridCompletionType;

    public state: RandomizerGridState;
    public board: RandomizerObjective[][] = [[],[],[],[],[]]

    public constructor(completionType: GridCompletionType) {
        this.state = RandomizerGridState.Incomplete;
        this.completionType = completionType;
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                this.board[i][j] = new RandomizerObjective(i, j);
            }
        }
        park.postMessage(`${JSON.stringify(this.board)}`)
        context.sharedStorage.set("OpenRCT2Randomizer.board", JSON.stringify(this.board))
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
        context.sharedStorage.set("OpenRCT2Randomizer.board", JSON.stringify(this.board))
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

    static fromJSON(serialized: unknown): RandomizerObjectiveGrid {
        if (serialized !instanceof String) {
            throw new 
        }
        return Object.assign(new RandomizerObjectiveGrid(), o)
    }
}

export class RandomizerObjective {
    public readonly goalType: RandomizerObjectiveType
    public readonly description: string
    public readonly title: string
    public readonly pos_x: number
    public readonly pos_y: number

    public state: RandomizerObjectiveState
    public coasterType?: string
    public stat?: number
    public targetValue?: number
    public thought?: string
    public scenario?: Scenario
    public scenarioObjective?: ScenarioObjectiveType
    public parkFlags?: ParkFlags
    public award?: string

    public constructor(x: number, y: number) {
        this.pos_x = x
        this.pos_y = y
        this.state = RandomizerObjectiveState.Incomplete
        this.goalType = randomEnum(RandomizerObjectiveType)
        this.chooseRandomValues()
        var goalTypeString: string = RandomizerObjectiveType[this.goalType]
        this.title = ObjectiveInfo[goalTypeString].title
        this.description = ObjectiveInfo[goalTypeString].description
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
            case RandomizerObjectiveType.KillGuests: {
                break;
            }
        }
    }

    private chooseRandomValues(): void {
        switch (this.goalType) {
            case RandomizerObjectiveType.RollerCoasterTypeWithStat: {
                this.coasterType = ""
                this.stat = 0
                this.targetValue = 0
                break
            }
            case RandomizerObjectiveType.RollerCoasterTypeWithLenth: {
                this.coasterType = ""
                this.targetValue = 0
                break
            }
            case RandomizerObjectiveType.ScenarioStandard: {
                // this.scenario = something
                this.targetValue = 0
                break
            }
            case RandomizerObjectiveType.ScenarioWithDifferentObjective: {
                // this.scenario = something
                this.scenarioObjective = "none"
                break
            }
            case RandomizerObjectiveType.ScenarioWithHarderGuestGeneration: {
                // this.scenario = something
                this.parkFlags = "difficultGuestGeneration" // TODO add flags, don't overwrite
                break;
            }
            case RandomizerObjectiveType.ScenarioWithSceneryRemovalOff: {
                // this.scenario = something
                this.parkFlags = "forbidTreeRemoval"
                break;
            }
            case RandomizerObjectiveType.ScenarioWithLandChangesOff: {
                // this.scenario = something
                this.parkFlags = "forbidLandscapeChanges"
                break;
            }
            case RandomizerObjectiveType.ScenarioWithNoAdvertising: {
                // this.scenario = something
                this.parkFlags = "forbidMarketingCampaigns"
                break;
            }
            case RandomizerObjectiveType.BuyAllLandAndConstructionRights: {
                // this.scenario = something
                break;
            }
            case RandomizerObjectiveType.NumberOfGuestsOnSingleRide: {
                this.targetValue = 0
                break;
            }
            case RandomizerObjectiveType.NumberOfGuestsInSingleQueue: {
                this.targetValue = 0
                break;
            }
            case RandomizerObjectiveType.NumberOfGuestsWithThought: {
                this.targetValue = 0
                break;
            }
            case RandomizerObjectiveType.EarnAward: {
                this.award = "something" // Award not in API, need to listen to event?
                break;
            }
            case RandomizerObjectiveType.RemoveAllGuests: {
                this.targetValue = 0
                break;
            }
            case RandomizerObjectiveType.KillGuests: {
                this.targetValue = 0
                break;
            }
        }
    }
}
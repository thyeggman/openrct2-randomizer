/// <reference path="../lib/openrct2.d.ts" />

interface IObjectiveInfo {
    title: string,
    description: string
}

export const ObjectiveInfo: { [id: string]: IObjectiveInfo } = {
    "RollerCoasterTypeWithStat": {
        title: "RC Type With Stat",
        description: "Construct a coaster with stat(s) in the given range"
    },
    "RollerCoasterTypeWithLenth": {
        title: "RC Type With Length",
        description: "Construct a coaster with length in the given range"
    },
    "ScenarioStandard": {
        title: "Complete Scenarios",
        description: "Complete any set of scenarios"
    },
    "ScenarioWithDifferentObjective": {
        title: "Alternate Objective",
        description: "Complete the given scenario with a different objective"
    },
    "ScenarioWithHarderGuestGeneration": {
        title: "Harder Guest Gen",
        description: "Complete the given scenario with harder guest generation"
    },
    "ScenarioWithSceneryRemovalOff": {
        title: "No Scenery Removal",
        description: "Complete the given scenario without removing scenery"
    },
    "ScenarioWithLandChangesOff": {
        title: "No Land Changes",
        description: "Complete the given scenario without changing land"
    },
    "ScenarioWithNoAdvertising": {
        title: "No Advertising",
        description: "Complete the given scenario without advertising"
    },
    "BuyAllLandAndConstructionRights": {
        title: "Landlord",
        description: "Purchase all land and construction rights for the given scenario"
    },
    "NumberOfGuestsOnSingleRide": {
        title: "Guests on One Ride",
        description: "Construct a ride and get the given number of guests on it"
    },
    "NumberOfGuestsInSingleQueue": {
        title: "Guests in One Queue",
        description: "Have a queue with the given number of guests in it"
    },
    "NumberOfGuestsWithThought": {
        title: "Guests With Thought",
        description: "Have a number of guests in your park with the given thought"
    },
    "EarnAward": {
        title: "Award Winning",
        description: "Earn the given award for any park"
    },
    "RemoveAllGuests": {
        title: "Remove All Guests",
        description: "Remove all the guests from the given scenario"
    },
    "KillGuests": {
        title: "Kill Guests",
        description: "Kill the given number of guests by crashing rides"
    },
}
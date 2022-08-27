/// <reference path="../lib/openrct2.d.ts" />

import { RandomizerObjectiveGrid, GridCompletionType } from "./objectiveGrid"

const WINDOW_ID = 'randomizer'
const EDGE_PAD = 5
const SETTINGS_WINDOW_WIDTH = 400
const LINE_HEIGHT = 18
const BUTTON_HEIGHT = LINE_HEIGHT - 4
const TITLE_HEIGHT = 15

function openRandomizerSettingsWindow() {
  const window = ui.getWindow(WINDOW_ID);
  if (window) {
    window.bringToFront();
    return;
  }

  var widgets: Widget[] = []
  var nextY = EDGE_PAD + TITLE_HEIGHT

  // Options thoughts
  // Overlay grid?
  // Bingo formats

  const completionTypeDropdown: DropdownWidget = {
    type: 'dropdown',
    x: EDGE_PAD,
    y: nextY,
    width: SETTINGS_WINDOW_WIDTH - (2 * EDGE_PAD),
    height: BUTTON_HEIGHT,
    items: Object.keys(GridCompletionType).filter((v) => isNaN(Number(v))),
    selectedIndex: 0
  }
  nextY += LINE_HEIGHT
  widgets.push(completionTypeDropdown);

  // Button to generate the grid and open it
  const generateButton: ButtonWidget = {
    type: 'button',
    name: 'generateObjectives',
    x: EDGE_PAD,
    y: nextY,
    width: SETTINGS_WINDOW_WIDTH - (2 * EDGE_PAD),
    height: BUTTON_HEIGHT,
    text: "Generate Grid",
    onClick: (): void => {
      var completionType = GridCompletionType.OneBingo
      if (completionTypeDropdown.selectedIndex != undefined) {
        switch (completionTypeDropdown.selectedIndex) {
          case GridCompletionType.OneBingo.valueOf(): {
            completionType = GridCompletionType.OneBingo
            break;
          }
          case GridCompletionType.TwoBingos.valueOf(): {
            completionType = GridCompletionType.TwoBingos
            break;
          }
          case GridCompletionType.OneBingo.valueOf(): {
            completionType = GridCompletionType.Blackout
            break;
          }
        }
      }
      var grid = new RandomizerObjectiveGrid(completionType)
      openObjectiveGridWindow(grid);
    }
  }
  nextY += LINE_HEIGHT
  widgets.push(generateButton);

  const windowDesc: WindowDesc = {
    classification: WINDOW_ID,
    title: "OpenRCT2 Randomizer",
    width: SETTINGS_WINDOW_WIDTH,
    height: widgets.length * LINE_HEIGHT + (2 * EDGE_PAD) + TITLE_HEIGHT,
    widgets: widgets
  }

  ui.openWindow(windowDesc);
}

function openObjectiveGridWindow(grid: RandomizerObjectiveGrid): number {
  return grid.board.length;
}

function main(): void {
  // Add a menu item under the map icon on the top toolbar
  ui.registerMenuItem("Open Randomizer", function () {
    openRandomizerSettingsWindow();
  });
};

export default main;

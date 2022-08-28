/// <reference path="../lib/openrct2.d.ts" />

import { RandomizerObjectiveGrid, GridCompletionType } from "./objectiveGrid"

const EDGE_PAD = 5
const LINE_HEIGHT = 18
const BUTTON_HEIGHT = LINE_HEIGHT - 4
const TITLE_HEIGHT = 15

const SETTINGS_WINDOW_ID = 'randomizer'
const SETTINGS_WINDOW_WIDTH = 400

const GRID_WINDOW_ID = 'bingo_grid'
const GRID_TILE_SIZE = 130
const GRID_WINDOW_WIDTH = 6 * EDGE_PAD + 5 * GRID_TILE_SIZE

function openRandomizerSettingsWindow() {
  const window = ui.getWindow(SETTINGS_WINDOW_ID);
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
    text: "Reset and Regenerate Grid",
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
      ui.getWindow(SETTINGS_WINDOW_ID).close()
      openObjectiveGridWindow(grid);
    }
  }
  nextY += LINE_HEIGHT
  widgets.push(generateButton);

  const windowDesc: WindowDesc = {
    classification: SETTINGS_WINDOW_ID,
    title: "OpenRCT2 Randomizer",
    width: SETTINGS_WINDOW_WIDTH,
    height: widgets.length * LINE_HEIGHT + (2 * EDGE_PAD) + TITLE_HEIGHT,
    widgets: widgets
  }

  ui.openWindow(windowDesc);
}

function openObjectiveGridWindow(grid: RandomizerObjectiveGrid): void {
  const window = ui.getWindow(GRID_WINDOW_ID);
  if (window) {
    window.bringToFront();
    return;
  }

  var widgets: Widget[] = []

  for (let i = 0; i < grid.board.length; i++) {
    for (let j = 0; j < grid.board[i].length; j++) {
      const objectiveBox: GroupBoxWidget = {
        type: 'groupbox',
        x: EDGE_PAD * (j + 1) + GRID_TILE_SIZE * j,
        y: EDGE_PAD * (i + 1) + GRID_TILE_SIZE * i + TITLE_HEIGHT,
        width: GRID_TILE_SIZE,
        height: GRID_TILE_SIZE,
        text: grid.board[i][j].title
      }
      widgets.push(objectiveBox);
    }
  }

  const windowDesc: WindowDesc = {
    classification: GRID_WINDOW_ID,
    title: "Bingo Board",
    width: GRID_WINDOW_WIDTH,
    height: GRID_WINDOW_WIDTH + TITLE_HEIGHT,
    widgets: widgets
  }

  ui.openWindow(windowDesc);
}

function main(): void {
  // Add a menu item under the map icon on the top toolbar
  ui.registerMenuItem("Open Randomizer Settings", function () {
    openRandomizerSettingsWindow();
  });
  ui.registerMenuItem("Open Randomizer Grid", function () {
    var savedGrid = context.sharedStorage.get("OpenRCT2Randomizer.boardState")
    if (savedGrid == undefined) {
      ui.showError("Cannot open randomizer grid", "Grid has not been generated yet")
    }
    else {
      // Deserialize grid
      var grid = RandomizerObjectiveGrid.fromJSON(savedGrid)
      openObjectiveGridWindow(grid)
    }
  });
};

export default main;

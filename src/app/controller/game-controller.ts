import {Controller} from "../../framework/controller";
import {GameModel} from "../model/game-model";
import Bottle from "../../framework/bottle";
import {
  EVENT_CLICK_BOARD,
  EVENT_RENDER_BOARD,
  FRUIT_ID_1,
  FRUIT_ID_2,
  FRUIT_ID_3,
  FRUIT_ID_4,
  FRUIT_ID_5,
  FRUIT_IDS
} from "../util/env";
import Event from "../../framework/event";

export class GameController extends Controller {
  private _gameModel: GameModel;



  constructor() {
    super();

    this._gameModel = Bottle.get('gameModel');

    Event.on(EVENT_CLICK_BOARD, (x, y) => {
      console.log("x: " + x + ",y: " + y);
      this.click(x, y);
    });
  }

  public shuffle() {
    const board = this._gameModel.board;

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        board[i][j] = FRUIT_IDS[Math.floor(Math.random() * FRUIT_IDS.length)];
      }
    }

    console.log(board)
  }

  public click(x, y) {
    const board = this._gameModel.board;

    const id = board[x][y];

    const points = new Map();

    const find = (x, y) => {
      if (x < 0 ||
        x > board.length - 1 ||
        y < 0 ||
        y > board[x].length - 1) {
        return;
      }

      if (board[x][y] != id) {
        return;
      }

      if (points.has([x, y].toString())) {
        return;
      }

      points.set([x, y].toString(), [x, y]);

      find(x - 1, y);
      find(x + 1, y);
      find(x, y - 1);
      find(x, y + 1);
    }

    find(x, y);

    const emptyPoints = Array.from(points.values());

    if (emptyPoints.length < 2) {
      return;
    }

    for (let i = 0; i < emptyPoints.length; i++) {
      const [x, y] = emptyPoints[i];
      board[x][y] = 0;
    }

    // console.log(board);

    for (let i = 0; i < board.length; i++) {
      let idx = board[i].length - 1;
      let zeroIdx = board[i].length - 1;
      for (let j = board[i].length - 1; j >= 0; j--) {
        if (board[i][j] == 0) {
          idx = j;
          zeroIdx = j;
          break;
        }
      }

      while(idx >= 0) {
        if (board[i][idx] == 0) {
          break;
        }

        idx--;
        zeroIdx--;
      }

      if (idx == -1) {
        continue;
      }

      for (let j = idx - 1; j >= 0; j--) {
        if (board[i][j] == 0) {
          continue;
        }

        board[i][zeroIdx] = board[i][j];
        board[i][j] = 0;

        zeroIdx--;
      }
    }

    console.log(board);

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] != 0) {
          break;
        }

        board[i][j] = FRUIT_IDS[Math.floor(Math.random() * FRUIT_IDS.length)];
      }
    }

    Event.emit(EVENT_RENDER_BOARD);
  }
}

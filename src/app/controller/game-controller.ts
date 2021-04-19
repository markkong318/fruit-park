import {Controller} from "../../framework/controller";
import {GameModel} from "../model/game-model";
import Bottle from "../../framework/bottle";
import {
  EVENT_CLICK_BOARD,
  EVENT_GAME_START,
  EVENT_RENDER_BOARD,
  EVENT_RENDER_PENALTY,
  EVENT_RENDER_POW,
  EVENT_RENDER_SCORE,
  EVENT_RENDER_TIMER,
  EVENT_SHUFFLE,
  EVENT_TIME_UP,
  FRUIT_IDS,
  TIME
} from "../util/env";
import Event from "../../framework/event";

export class GameController extends Controller {
  private _gameModel: GameModel;

  constructor() {
    super();

    this._gameModel = Bottle.get('gameModel');

    Event.on(EVENT_SHUFFLE, () => {
      this.shuffle();
      Event.emit(EVENT_RENDER_BOARD);
    });

    Event.on(EVENT_GAME_START, () => {
      this.countdown();
    });

    Event.on(EVENT_CLICK_BOARD, (x, y) => {
      if (!this.tryClick(x, y)) {
        return;
      }

      this.refresh();
      this.updateScore();
      this.updatePow();

      Event.emit(EVENT_RENDER_BOARD);
      Event.emit(EVENT_RENDER_SCORE);
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

  public tryClick(x, y) {
    this._gameModel.oldPoints = [];
    this._gameModel.oldFruitId = 1;

    const board = this._gameModel.board;
    const fruitId = board[x][y];
    const map = new Map();

    const find = (x, y) => {
      if (x < 0 ||
        x > board.length - 1 ||
        y < 0 ||
        y > board[x].length - 1) {
        return;
      }

      if (board[x][y] != fruitId) {
        return;
      }

      if (map.has([x, y].toString())) {
        return;
      }

      map.set([x, y].toString(), [x, y]);

      find(x - 1, y);
      find(x + 1, y);
      find(x, y - 1);
      find(x, y + 1);
    }

    find(x, y);

    const points = Array.from(map.values());

    if (points.length < 2) {
      this.penalize();
      return false;
    }

    for (let i = 0; i < points.length; i++) {
      const [x, y] = points[i];
      board[x][y] = 0;
    }

    this._gameModel.oldPoints = points;
    this._gameModel.oldFruitId = fruitId;

    return true;
  }

  public refresh() {
    this._gameModel.newPoints = [];

    const board = this._gameModel.board;

    for (let i = 0; i < board.length; i++) {
      let nonZeroIdx = board[i].length - 1;
      let zeroIdx = board[i].length - 1;
      for (let j = board[i].length - 1; j >= 0; j--) {
        if (board[i][j] == 0) {
          nonZeroIdx = j;
          zeroIdx = j;
          break;
        }
      }

      while(nonZeroIdx >= 0) {
        if (board[i][nonZeroIdx] == 0) {
          break;
        }

        nonZeroIdx--;
        zeroIdx--;
      }

      if (nonZeroIdx == -1) {
        continue;
      }

      for (let j = nonZeroIdx - 1; j >= 0; j--) {
        if (board[i][j] == 0) {
          continue;
        }

        board[i][zeroIdx] = board[i][j];
        board[i][j] = 0;

        zeroIdx--;
      }
    }

    const newPoints = [];

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] != 0) {
          break;
        }

        board[i][j] = FRUIT_IDS[Math.floor(Math.random() * FRUIT_IDS.length)];
        newPoints.push([i, j]);
      }
    }

    this._gameModel.newPoints = newPoints;
  }

  public updateScore() {
    const scorePlus = this._gameModel.oldPoints.length * 100;

    this._gameModel.score += scorePlus;
    this._gameModel.scorePlus = scorePlus;
  }

  public updatePow() {
    if (this._gameModel.pow === 100) {
      this._gameModel.powPlus = 0;
      return;
    }

    const powPlus = Math.round(this._gameModel.oldPoints.length * 2.4 * 10) / 10;

    if (this._gameModel.pow + powPlus > 100) {
      this._gameModel.pow = 100
      this._gameModel.powPlus = this._gameModel.pow + powPlus - 100;

      Event.emit(EVENT_RENDER_POW);
      return;
    }

    this._gameModel.pow = this._gameModel.pow + powPlus;
    this._gameModel.powPlus = powPlus;

    Event.emit(EVENT_RENDER_POW);
    return;
  }

  public penalize() {
    this._gameModel.isPenalty = true;

    setTimeout(() => {
      this._gameModel.isPenalty = false;

      Event.emit(EVENT_RENDER_PENALTY);
    }, 1000);

    Event.emit(EVENT_RENDER_PENALTY);
  }

  public countdown() {
    this._gameModel.time = TIME;

    const loop = () => {
      if (!this._gameModel.time) {
        Event.emit(EVENT_TIME_UP);
        return;
      }

      this._gameModel.time--;
      Event.emit(EVENT_RENDER_TIMER);

      setTimeout(loop, 1000);
    }

    loop();
  }
}

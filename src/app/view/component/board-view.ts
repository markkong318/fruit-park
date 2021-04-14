import * as PIXI from 'pixi.js';

import {View} from "../../../framework/view";
import {GameModel} from "../../model/game-model";
import {BOARD_COLUMN, BOARD_ROW, EVENT_CLICK_BOARD, EVENT_RENDER_BOARD, FRUIT_ID_1} from "../../util/env";
import Bottle from '../../../framework/bottle';
import Event from "../../../framework/event";

export class BoardView extends View {
  private _gameModel: GameModel;

  private _graphics: PIXI.Graphics;

  private _board: PIXI.Sprite[][];

  constructor() {
    super();

    this._gameModel = Bottle.get('gameModel');

    this._board = new Array(BOARD_COLUMN);
    for (let i = 0; i < BOARD_COLUMN; i++) {
      this._board[i] = new Array(BOARD_ROW);
    }

    Event.on(EVENT_RENDER_BOARD, () => {
      this.renderBoard();
    });
  }

  public init() {
    const texture = Bottle.get(`fruit_texture_${FRUIT_ID_1}`);

    for (let i = 0; i < BOARD_COLUMN; i++) {
      for (let j = 0; j < BOARD_ROW; j++) {
        const sprite = new PIXI.Sprite(texture);

        sprite.x = i * 64;
        sprite.y = j * 64;
        sprite.scale.x = sprite.scale.y = Math.min(64 / sprite.width, 64 / sprite.height);
        sprite.interactive = true;
        sprite.addListener('pointerdown', () => {
          console.log('click ' + i + ', ' + j);

          Event.emit(EVENT_CLICK_BOARD, i, j);
        });

        this._board[i][j] = sprite;

        this.addChild(sprite);
      }
    }
  }

  public renderBoard() {
    const board = this._gameModel.board;

    for (let i = 0; i < BOARD_COLUMN; i++) {
      for (let j = 0; j < BOARD_ROW; j++) {
        this._board[i][j].texture = Bottle.get(`fruit_texture_${board[i][j]}`);
      }
    }
  }
}

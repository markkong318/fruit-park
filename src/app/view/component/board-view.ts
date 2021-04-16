import * as PIXI from 'pixi.js';
import gsap from 'gsap';

import {View} from "../../../framework/view";
import {GameModel} from "../../model/game-model";
import {BOARD_COLUMN, BOARD_ROW, EVENT_CLICK_BOARD, EVENT_RENDER_BOARD, FRUIT_ID_1, SYMBOL_SIZE} from "../../util/env";
import Bottle from '../../../framework/bottle';
import Event from "../../../framework/event";

export class BoardView extends View {
  private _gameModel: GameModel;

  private _boardSprites: PIXI.Sprite[][];
  private _oldSprites: PIXI.Sprite[][];
  private _timeline: gsap.core.Timeline;

  constructor() {
    super();

    this._gameModel = Bottle.get('gameModel');
    this._timeline = gsap.timeline();

    this._boardSprites = new Array(BOARD_COLUMN);
    for (let i = 0; i < BOARD_COLUMN; i++) {
      this._boardSprites[i] = new Array(BOARD_ROW);
    }

    this._oldSprites = new Array(BOARD_COLUMN);
    for (let i = 0; i < BOARD_COLUMN; i++) {
      this._oldSprites[i] = new Array(BOARD_ROW);
    }

    Event.on(EVENT_RENDER_BOARD, () => {
      this.renderBoard();
      this.renderNewPoints();
    });
  }

  public init() {
    const texture = Bottle.get(`fruit_texture_${FRUIT_ID_1}`);

    for (let i = 0; i < BOARD_COLUMN; i++) {
      for (let j = 0; j < BOARD_ROW; j++) {
        const sprite = new PIXI.Sprite(texture);

        sprite.x = i * SYMBOL_SIZE + 32;
        sprite.y = j * SYMBOL_SIZE + 32;
        sprite.scale.x = sprite.scale.y = Math.min(SYMBOL_SIZE / sprite.width, SYMBOL_SIZE / sprite.height);
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        sprite.interactive = true;
        sprite.addListener('pointerdown', () => {
          console.log('click ' + i + ', ' + j);

          Event.emit(EVENT_CLICK_BOARD, i, j);
        });

        this._boardSprites[i][j] = sprite;

        this.addChild(sprite);
      }
    }

    for (let i = 0; i < BOARD_COLUMN; i++) {
      for (let j = 0; j < BOARD_ROW; j++) {
        const sprite = new PIXI.Sprite(texture);

        sprite.x = i * SYMBOL_SIZE + 32;
        sprite.y = j * SYMBOL_SIZE + 32;
        sprite.scale.x = sprite.scale.y = Math.min(SYMBOL_SIZE / sprite.width, SYMBOL_SIZE / sprite.height);
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        sprite.alpha = 0;

        this._oldSprites[i][j] = sprite;

        this.addChild(sprite);
      }
    }
  }

  public renderBoard() {
    const board = this._gameModel.board;

    for (let i = 0; i < BOARD_COLUMN; i++) {
      for (let j = 0; j < BOARD_ROW; j++) {
        this._boardSprites[i][j].texture = Bottle.get(`fruit_texture_${board[i][j]}`);
      }
    }
  }

  public renderNewPoints() {
    this._timeline.clear();

    const newPoints = this._gameModel.newPoints;
    for (let i = 0; i < newPoints.length; i++) {
      const [x, y] = newPoints[i];

      const sprite = this._boardSprites[x][y];
      const scale = sprite.scale.x;

      sprite.scale.x = scale * 0.5;
      sprite.scale.y = scale * 0.5;

      this._timeline
        .to(sprite, {
          duration: 0.2,
          pixi: {
            scaleX: scale,
            scaleY: scale,
          },
        }, 0);
    }

    const oldPoints = this._gameModel.oldPoints;
    for (let i = 0; i < oldPoints.length; i++) {
      const [x, y] = oldPoints[i];

      const sprite = this._oldSprites[i];
      const scale = sprite.scale.x;

      this._timeline
        .to(sprite, {
          duration: 0.2,
          pixi: {
            scaleX: scale,
            scaleY: scale,
          },
        }, 0);
    }
  }

}

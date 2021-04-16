import * as PIXI from 'pixi.js';
import gsap from 'gsap';

import {View} from "../../../framework/view";
import {GameModel} from "../../model/game-model";
import {
  BOARD_COLUMN,
  BOARD_ROW,
  EVENT_CLICK_BOARD,
  EVENT_RENDER_BOARD,
  EVENT_RENDER_TIMER,
  FRUIT_ID_1
} from "../../util/env";
import Bottle from '../../../framework/bottle';
import Event from "../../../framework/event";
import titleStyle from "../style/title-style";

export class InfoView extends View {
  private _gameModel: GameModel;

  private _scoreTitle: PIXI.Text;
  private _scoreValue: PIXI.Text;
  private _timeTitle: PIXI.Text;
  private _timeValue: PIXI.Text;

  constructor() {
    super();

    this._gameModel = Bottle.get('gameModel');

    Event.on(EVENT_RENDER_TIMER, () => {
      this.renderTimer()
    });
  }

  public init() {
    this._scoreTitle = new PIXI.Text('SCORE', titleStyle);
    this._scoreTitle.position = new PIXI.Point(30, 10)
    this.addChild(this._scoreTitle);

    this._scoreValue = new PIXI.Text('00000000', titleStyle);
    this._scoreValue.position = new PIXI.Point(30, 30)
    this.addChild(this._scoreValue);

    this._timeTitle = new PIXI.Text('TIME', titleStyle);
    this._timeTitle.position = new PIXI.Point(370, 10)
    this.addChild(this._timeTitle);

    this._timeValue = new PIXI.Text('60', titleStyle);
    this._timeValue.position = new PIXI.Point(388, 30)
    this.addChild(this._timeValue);

  }

  public renderScore() {

  }

  public renderTimer() {
    this._timeValue.text = `${this._gameModel.time}`;
  }
}

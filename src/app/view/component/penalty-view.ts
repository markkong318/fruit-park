import * as PIXI from 'pixi.js';

import {View} from "../../../framework/view";
import event from "../../../framework/event";
import {GameModel} from "../../model/game-model";
import {EVENT_RENDER_PENALTY} from "../../util/env";
import Bottle from '../../../framework/bottle';


export class PenaltyView extends View {
  private _gameModel: GameModel;
  private _graphics: PIXI.Graphics;

  constructor() {
    super();

    this._gameModel = Bottle.get('gameModel');

    event.addListener(EVENT_RENDER_PENALTY, () => {
      this.render();
    });
  }

  public init() {
    this._graphics = new PIXI.Graphics();
    this._graphics.beginFill(0x000000, 0.5);
    this._graphics.drawRect(- this.size.width / 2, - window.innerHeight / 2, this.size.width * 2, window.innerHeight * 2);
    this._graphics.interactive = true;
    this.addChild(this._graphics);

    this.visible = false;
  }

  public render() {
    this.visible = this._gameModel.isPenalty;
  }
}

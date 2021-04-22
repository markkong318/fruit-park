import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import {Linear} from 'gsap';

import {View} from "../../../framework/view";
import Event from "../../../framework/event";
import {GameModel} from "../../model/game-model";
import {EVENT_GAME_READY, EVENT_GAME_START, EVENT_RENDER_PENALTY} from "../../util/env";
import Bottle from '../../../framework/bottle';
import titleStyle from "../style/title-style";

export class ReadyView extends View {
  private _gameModel: GameModel;
  private _graphics: PIXI.Graphics;
  private _message: PIXI.Text;

  constructor() {
    super();

    this._gameModel = Bottle.get('gameModel');

    Event.on(EVENT_GAME_READY, () => {
      this.play();
    });
  }

  public init() {
    this._graphics = new PIXI.Graphics();
    this._graphics.beginFill(0x000000, 0.01);
    this._graphics.drawRect(- this.size.width / 2, - this.size.height / 2, this.size.width * 2, this.size.height * 2);

    this._graphics.beginFill(0x000000, 1);
    this._graphics.drawRect((this.size.width - 300) / 2, (this.size.height - 150) / 2, 300, 150);

    this._graphics.interactive = true;
    this.addChild(this._graphics);

    this._message = new PIXI.Text('', titleStyle);
    this.addChild(this._message);
  }

  public play() {
    const t = gsap.timeline();
    t.vars.data = {
      message: this._message,
    };

    t.to({}, {
      duration: 1,
    }).to({
      val: 4,
    }, {
      duration: 3,
      val: 1,
      ease:Linear.easeNone,
      onUpdate: function(view: View, text: PIXI.Text) {
        const { val } = this.targets()[0];

        text.text = `${Math.floor(val)}`;
        text.position.x = (view.size.width - text.width) / 2;
        text.position.y = (view.size.height - text.height) / 2;
      },
      onUpdateParams: [this, this._message],
      onComplete: function(view: View, text: PIXI.Text) {
        text.text = `GO`;
        text.position.x = (view.size.width - text.width) / 2;
        text.position.y = (view.size.height - text.height) / 2;
      },
      onCompleteParams: [this, this._message],
    }).to({}, {
      duration: 1,
      onComplete: function(view: View) {
        view.visible = false;

        Event.emit(EVENT_GAME_START);
      },
      onCompleteParams: [this],
    })
  }
}

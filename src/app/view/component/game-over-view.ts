import * as PIXI from 'pixi.js';

import {View} from "../../../framework/view";
import {GameModel} from "../../model/game-model";
import titleStyle from "../style/title-style";
import Bottle from "../../../framework/bottle";
import {EVENT_GAME_OVER, FRUIT_BONUSES, FRUIT_IDS, SYMBOL_SIZE} from "../../util/env";
import Event from "../../../framework/event";
import gsap from "gsap";

export class GameOverView extends View {
  private _gameModel: GameModel;

  private _graphics: PIXI.Graphics;
  private _gameOverText: PIXI.Text;

  private _fruitTextures: PIXI.Texture[];
  private _fruitSprites: PIXI.Sprite[] = [];
  private _fruitTexts: PIXI.Text[] = [];

  private _totalTitleText: PIXI.Text;
  private _totalValueText: PIXI.Text;

  private _timeline: gsap.core.Timeline;


  constructor() {
    super();

    this._gameModel = Bottle.get('gameModel');

    Event.on(EVENT_GAME_OVER, () => {
      this.renderGameOver();
    });
  }

  public init() {
    this._graphics = new PIXI.Graphics();
    this._graphics.beginFill(0x000000, 0.01);
    this._graphics.drawRect(- this.size.width / 2, - this.size.height / 2, this.size.width * 2, this.size.height * 2);

    const dialogWidth = this.size.width * 2;
    const dialogHeight = 650;
    this._graphics.beginFill(0x000000, 1);
    this._graphics.drawRect((this.size.width - dialogWidth) / 2, (this.size.height - dialogHeight) / 2, dialogWidth, dialogHeight);

    this._graphics.interactive = true;
    this.addChild(this._graphics);

    for (let i = 0; i < FRUIT_IDS.length; i++) {
      this._fruitSprites[i] = new PIXI.Sprite(Bottle.get(`fruit_texture_${FRUIT_IDS[i]}`));
      this._fruitSprites[i].position = new PIXI.Point(120, 200 + 80 * i);
      this._fruitSprites[i].anchor.x = 0.5;
      this._fruitSprites[i].anchor.y = 0.5;
      this._fruitSprites[i].scale.x = this._fruitSprites[i].scale.y = Math.min(SYMBOL_SIZE / this._fruitSprites[i].width, SYMBOL_SIZE / this._fruitSprites[i].height);
      this.addChild(this._fruitSprites[i]);

      this._fruitTexts[i] = new PIXI.Text('0 x 0', titleStyle);
      this._fruitTexts[i].anchor.x = 0.5;
      this._fruitTexts[i].anchor.y = 0.5;
      this._fruitTexts[i].position = new PIXI.Point(280, 200 + 80 * i);
      this.addChild(this._fruitTexts[i]);
    }

    this._totalTitleText = new PIXI.Text('TOTAL', titleStyle);
    this._totalTitleText.anchor.x = 0.5;
    this._totalTitleText.anchor.y = 0.5;
    this._totalTitleText.position = new PIXI.Point(this.size.width / 2, 600);
    this.addChild(this._totalTitleText);

    this._totalValueText = new PIXI.Text('0', titleStyle);
    this._totalValueText.anchor.x = 0.5;
    this._totalValueText.anchor.y = 0.5;
    this._totalValueText.position = new PIXI.Point(this.size.width / 2, 640);
    this.addChild(this._totalValueText);


    this._timeline = gsap.timeline({paused:true})

    this.visible = false;
  }

  public renderGameOver() {
    const fruitCounts = this._gameModel.fruitCounts;

    for (let i = 0; i < FRUIT_IDS.length; i++) {
      this._fruitSprites[i].visible = false;

      this._fruitTexts[i].text = `${fruitCounts[i]} x ${FRUIT_BONUSES[i]}`;
      this._fruitTexts[i].visible = false;

      this._timeline.to({},{
        duration: 1,
        onComplete: function (sprite: PIXI.Sprite, text: PIXI.Text) {
          sprite.visible = true;
          text.visible = true;
        },
        onCompleteParams: [this._fruitSprites[i], this._fruitTexts[i]],
      })
    }

    this._totalValueText.text = `${this._gameModel.score}`;

    this._timeline
      .to({}, {
        duration: 1
      })
      .to({},{
        onUpdate: function(that: GameOverView) {
          for (let i = 0; i < FRUIT_IDS.length; i++) {
            that._fruitTexts[i].text = `${Math.floor(fruitCounts[i] * (1 - this.ratio))} x ${FRUIT_BONUSES[i]}`;
          }

          that._totalValueText.text = `${that._gameModel.score + Math.floor((that._gameModel.totalScore - that._gameModel.score) * this.ratio)}`
        },
        onUpdateParams: [this],
      })

    this._timeline.play();

    this.visible = true;
  }
}

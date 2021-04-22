import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import {parse, stringify} from 'flatted';

import {View} from "../../../framework/view";
import {GameModel} from "../../model/game-model";
import {
  EVENT_POW_PLAY_DONE,
  EVENT_RENDER_POW,
  EVENT_RENDER_POW_PLAY,
  EVENT_RENDER_SCORE,
  EVENT_RENDER_TIMER, TIME,
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
  private _pow: PIXI.Text;

  private _scoreTimeline: gsap.core.Timeline;
  private _powTimeline: gsap.core.Timeline;
  private _powGraphics: PIXI.Graphics;

  constructor() {
    super();

    this._gameModel = Bottle.get('gameModel');

    Event.on(EVENT_RENDER_TIMER, () => {
      this.renderTimer()
    });

    Event.on(EVENT_RENDER_SCORE, () => {
      this.renderScore();
    });

    Event.on(EVENT_RENDER_POW, () => {
      this.renderPow();
    });

    Event.on(EVENT_RENDER_POW_PLAY, () => {
      this.renderPowPlay();
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

    this._timeValue = new PIXI.Text(`${TIME}`, titleStyle);
    this._timeValue.position = new PIXI.Point(388, 30)
    this.addChild(this._timeValue);

    this._powGraphics = new PIXI.Graphics();
    this._powGraphics.beginFill(0x555555);
    this._powGraphics.drawRect(20, 140, this.size.width - 20 * 2, 40);
    this._powGraphics.endFill();
    this.addChild(this._powGraphics);

    this._pow = new PIXI.Text('0.0%', titleStyle);
    this._pow.position = new PIXI.Point((this.size.width - this._pow.width) / 2, 150);
    this.addChild(this._pow);

    this._scoreTimeline = gsap.timeline();
    this._powTimeline = gsap.timeline();

  }

  public renderScore() {
    const score = this._gameModel.score;
    const scorePlus = this._gameModel.scorePlus;

    this._scoreTimeline
      .clear()
      .to({
          val: score - scorePlus,
        },
        {
          val: score,
          duration: 0.5,
          onUpdate: function(text: PIXI.Text) {
            const { val } = this.targets()[0];

            text.text = `${Math.floor(val)}`.padStart(8, '0');
          },
          onUpdateParams:[this._scoreValue],
        });
  }

  public renderTimer() {
    this._timeValue.text = `${this._gameModel.time}`;
  }

  public renderPow() {
    const pow = this._gameModel.pow;
    const powPlus = this._gameModel.powPlus;

    this._powTimeline
      .to({
          val: pow - powPlus,
        },
        {
          val: pow,
          duration: 0.5,
          onUpdate: function(text: PIXI.Text, graphics: PIXI.Graphics, viewWidth: number ) {
            const { val } = this.targets()[0];

            text.text = `${(Math.floor(val * 10) / 10).toFixed(1)}%`;
            text.position = new PIXI.Point((viewWidth - text.width) / 2, 150);

            graphics.clear();

            graphics.beginFill(0x555555);
            graphics.drawRect(20, 140, viewWidth - 20 * 2, 40);
            graphics.endFill();

            graphics.beginFill(0xaaaaaa);
            graphics.drawRect(20, 140, (viewWidth - 20 * 2) * val / 100, 40);
            graphics.endFill();
          },
          onUpdateParams:[this._pow, this._powGraphics, this.size.width],
        });
  }

  public renderPowPlay() {
    if (!this._gameModel.isPlayPow) {
      return;
    }

    this._powTimeline
      .to({
          val: 100,
        },
        {
          val: 0,
          duration: 10,
          onUpdate: function(text: PIXI.Text, graphics: PIXI.Graphics, viewWidth: number ) {
            const { val } = this.targets()[0];

            text.text = `${(Math.floor(val * 10) / 10).toFixed(1)}%`;
            text.position = new PIXI.Point((viewWidth - text.width) / 2, 150);

            graphics.clear();

            graphics.beginFill(0x555555);
            graphics.drawRect(20, 140, viewWidth - 20 * 2, 40);
            graphics.endFill();

            graphics.beginFill(0xfa5c5c);
            graphics.drawRect(20, 140, (viewWidth - 20 * 2) * val / 100, 40);
            graphics.endFill();
          },
          onUpdateParams:[this._pow, this._powGraphics, this.size.width],
          onComplete: function() {
            Event.emit(EVENT_POW_PLAY_DONE);
          },
        });
  }
}

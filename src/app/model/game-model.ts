import {Model} from "../../framework/model";
import {INIT_BET} from "../util/env";

export class GameModel extends Model {
  private _playing: boolean = false;

  private _board: number[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];



  private _score: number = 0;
  private _scoreGain: number = 0;


  constructor() {
    super();

  }

  public set playing(playing: boolean) {
    this._playing = playing;
  }

  public get playing() {
    return this._playing;
  }

  public set board(board: number[][]) {
    this._board = board;
  }

  public get board() {
    return this._board;
  }

  public set score(score: number) {
    this._score = score;
  }

  public get score() {
    return this._score;
  }

  public set scoreGain(scoreGain: number) {
    this._scoreGain = scoreGain;
  }

  public get scoreGain() {
    return this._scoreGain;
  }
}

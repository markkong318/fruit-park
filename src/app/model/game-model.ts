import {Model} from "../../framework/model";

export class GameModel extends Model {
  private _playing: boolean = false;
  private _isPenalty: boolean = false;

  private _board: number[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];

  private _newPoints: number[][] = [];
  private _oldPoints: number[][] = [];


  private _score: number = 0;
  private _scorePlus: number = 0;

  private _time: number = 0;

  constructor() {
    super();

  }

  public set playing(playing: boolean) {
    this._playing = playing;
  }

  public get playing() {
    return this._playing;
  }

  public set isPenalty(isPenalty: boolean) {
    this._isPenalty = isPenalty;
  }

  public get isPenalty() {
    return this._isPenalty;
  }

  public set board(board: number[][]) {
    this._board = board;
  }

  public get board() {
    return this._board;
  }

  public set newPoints(newPoints: number[][]) {
    this._newPoints = newPoints;
  }

  public get newPoints() {
    return this._newPoints;
  }

  public set oldPoints(oldPoints: number[][]) {
    this._oldPoints = oldPoints;
  }

  public get oldPoints() {
    return this._oldPoints;
  }

  public set score(score: number) {
    this._score = score;
  }

  public get score() {
    return this._score;
  }

  public set scorePlus(scorePlus: number) {
    this._scorePlus = scorePlus;
  }

  public get scorePlus() {
    return this._scorePlus;
  }

  public set time(time: number) {
    this._time = time;
  }

  public get time() {
    return this._time;
  }
}

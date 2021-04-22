import {Model} from "../../framework/model";
import {FRUIT_IDS} from "../util/env";

export class GameModel extends Model {
  private _isPlaying: boolean = false;
  private _isPenalty: boolean = false;
  private _isPlayPow: boolean = false;

  private _board: number[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];

  private _fruitCounts: number[] = [];

  private _newPoints: number[][] = [];
  private _oldPoints: number[][] = [];
  private _oldFruitId: number = 1;

  private _score: number = 0;
  private _scorePlus: number = 0;

  private _totalScore: number = 0;

  private _pow: number = 0;
  private _powPlus: number = 0;
  private _powFruitId: number = 1;

  private _time: number = 0;

  constructor() {
    super();

    for (let i = 0; i < FRUIT_IDS.length; i++) {
      this._fruitCounts[i] = 0;
    }
  }

  public set isPlaying(playing: boolean) {
    this._isPlaying = playing;
  }

  public get isPlaying() {
    return this._isPlaying;
  }

  public set isPenalty(isPenalty: boolean) {
    this._isPenalty = isPenalty;
  }

  public get isPenalty() {
    return this._isPenalty;
  }

  public set isPlayPow(isPlayPow: boolean) {
    this._isPlayPow = isPlayPow;
  }

  public get isPlayPow() {
    return this._isPlayPow;
  }

  public set board(board: number[][]) {
    this._board = board;
  }

  public get board() {
    return this._board;
  }

  public set fruitCounts(fruitCounts: number[]) {
    this._fruitCounts = fruitCounts;
  }

  public get fruitCounts() {
    return this._fruitCounts;
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

  public set oldFruitId(oldFruitId: number) {
    this._oldFruitId = oldFruitId;
  }

  public get oldFruitId() {
    return this._oldFruitId;
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

  public set totalScore(totalScore: number) {
    this._totalScore = totalScore;
  }

  public get totalScore() {
    return this._totalScore;
  }

  public set pow(pow: number) {
    this._pow = pow;
  }

  public get pow() {
    return this._pow;
  }

  public set powPlus(powPlus: number) {
    this._powPlus = powPlus;
  }

  public get powPlus() {
    return this._powPlus;
  }

  public set powFruitId(powFruitId: number) {
    this._powFruitId = powFruitId;
  }

  public get powFruitId() {
    return this._powFruitId;
  }

  public set time(time: number) {
    this._time = time;
  }

  public get time() {
    return this._time;
  }
}

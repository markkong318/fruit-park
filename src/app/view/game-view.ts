import {View} from "../../framework/view";
import {SYMBOL_SIZE} from "../util/env";
import {GameModel} from "../model/game-model";
import {GameOverView} from "./component/game-over-view";
import {BoardView} from "./component/board-view";
import {Size} from "../../framework/size";
import {PenaltyView} from "./component/penalty-view";
import {InfoView} from "./component/info-view";
import {ReadyView} from "./component/ready-view";

export class GameView extends View {
  private _gameModel: GameModel;

  private _gameOverView: GameOverView;

  constructor() {
    super();
  }

  public init() {

    var bg = new PIXI.Sprite(PIXI.Texture.WHITE);
    bg.width = this.size.width;
    bg.height = this.size.height;
    bg.tint = 0x000000;
    this.addChild(bg);

    const boardView = new BoardView();
    boardView.position = new PIXI.Point((this.size.width - SYMBOL_SIZE * 7) / 2, 200);
    boardView.size = new Size(SYMBOL_SIZE * 7, SYMBOL_SIZE * 8);
    boardView.init();
    boardView.renderBoard();
    this.addChild(boardView);

    const infoView = new InfoView();
    infoView.position = new PIXI.Point(0, 0);
    infoView.size = new Size(this.size.width, this.size.height);
    infoView.init();
    this.addChild(infoView);

    const penaltyView = new PenaltyView();
    penaltyView.position = new PIXI.Point(0, 0);
    penaltyView.size = new Size(this.size.width, this.size.height);
    penaltyView.init();
    this.addChild(penaltyView);

    const readyView = new ReadyView();
    readyView.position = new PIXI.Point(0, 0);
    readyView.size = new Size(this.size.width, this.size.height);
    readyView.init();
    this.addChild(readyView);

    const gameOverView = new GameOverView();
    gameOverView.position = new PIXI.Point(0, 0);
    gameOverView.size = new Size(this.size.width, this.size.height);
    gameOverView.init();
    this.addChild(gameOverView);
  }
}

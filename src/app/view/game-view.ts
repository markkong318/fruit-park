import {View} from "../../framework/view";
import {SYMBOL_SIZE, REEL_WIDTH} from "../util/env";
import {GameModel} from "../model/game-model";
import {GameOverView} from "./component/game-over-view";
import {BoardView} from "./component/board-view";
import {Size} from "../../framework/size";

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
    bg.tint = 0xffffff;
    this.addChild(bg);

    const boardView = new BoardView();
    boardView.position = new PIXI.Point(0, 0);
    boardView.size = new Size(64 * 7, 64 * 8);
    boardView.init();
    boardView.renderBoard();
    this.addChild(boardView);


    console.log("game view");
  }
}

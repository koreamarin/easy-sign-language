import SonagiWord from "./SonagiWord";
import { SonagiLevel, StaggerFrame } from "./SonagiConfig";

type Cell = SonagiWord | null;


export interface Coordinate {
    row: number;
    col: number;
}

class SonagiEngine {
	private context: CanvasRenderingContext2D;
	private boardWidth: number;
	private boardHeight: number;
	private _gameBoard: Cell[][];
	private numOfRows: number;
	private numOfCols: number;

	private staggerFrame: number;
	private currentFrameCount: number;

	private wordList: string[];
	private SonagiWords: SonagiWord[];
	private fallingWords: SonagiWord[];
	private wordsCnt: number;


	private isGameOver: boolean;
	private setIsGameOver : React.Dispatch<React.SetStateAction<boolean>>;
	private life : number;
	private setLife : React.Dispatch<React.SetStateAction<number>>;
	private deleteList : SonagiWord[];
	private score : number;
	private setScore : React.Dispatch<React.SetStateAction<number>>;
	private setIsClear : React.Dispatch<React.SetStateAction<boolean>>;


	constructor(
		context: CanvasRenderingContext2D,
		boardWidth: number,
		boardHeight: number,
		wordList: string[],
		isGameOver : boolean,
		setIsGameOver : React.Dispatch<React.SetStateAction<boolean>>,
		life : number,
		setLife : React.Dispatch<React.SetStateAction<number>>,
		score : number,
		setScore : React.Dispatch<React.SetStateAction<number>>,
		setIsClear : React.Dispatch<React.SetStateAction<boolean>>,
	){
		this.context = context;
		this._gameBoard = [];
		this.boardWidth = boardWidth;
		this.boardHeight = boardHeight;
		this.numOfRows = 10;
		this.numOfCols = 10;
		this.staggerFrame = StaggerFrame - (20*SonagiLevel);
		this.currentFrameCount = 0;
		

		this.wordList = wordList;
		this.SonagiWords = [];
		this.fallingWords = [];
		this.wordsCnt = 0;
		this.isGameOver = isGameOver;
		this.setIsGameOver = setIsGameOver;
		this.life = life;
		this.setLife = setLife;
		this.deleteList = [];
		this.score = score;
		this.setScore = setScore;
		this.setIsClear = setIsClear;
	}

	private get gameBoard(): Cell[][] {
		if (this._gameBoard.length === 0) {
			const nRows = this.boardWidth;
			const nCols = this.boardHeight;

			for (let i = 0; i < nRows; i++) {
				this._gameBoard.push(Array.from(Array(nCols)).fill(null));
			}
		}

		return this._gameBoard;
	}
	
	private set gameBoard(newGameBoard: Cell[][]) {
		this._gameBoard = newGameBoard;
	}

	//최초 실행시 단어를 랜덤으로 배치 및 라이프 설정
	initializeGame() {
		console.log("initializeGame exe");
		this.wordList.sort(() => Math.random() - 0.5)
		this.wordsCnt = 0;
		for (let i = 0; i < this.wordList.length; i++) {
			let randCol = Math.floor(Math.random()*(this.numOfCols -1)); //(0 ~ 세로줄개수-2) 중 랜덤
			
			this.SonagiWords.push(new SonagiWord(this.wordList[i], {row: -1, col: randCol}))
		}

	}

	checkWord(inputWord: string) {
		this.fallingWords.forEach((word) => {
			if (word.word === inputWord){
				this.deleteList.push(word);
				this.setScore(this.score + 1);
				this.score += 1;
			}
		})
	}

	private checkIsGameOver() {
		// 맞춘 개수 === 전체 단어 개수 >> 클리어
		if (this.score === this.SonagiWords.length) {
			this.setIsGameOver(true);
			this.isGameOver = true;
			this.setIsClear(true);
			console.log("게임 클리어");
		}
		if (this.life <= 0) {
			this.setIsGameOver(true);
			this.isGameOver = true;
			this.setIsClear(false);
		}
	}


	//격자 board 생성 / 렌더링
	private generateGrid() {
		const cellWidth = this.boardWidth / this.numOfCols;
		const cellHeight = this.boardHeight / this.numOfRows;

		this.gameBoard.forEach((row, rowIndex) => {
			row.forEach((cell, colIndex) => {
				if (cell === null){
					this.context.fillStyle = "white";
				}
				else{
					if(cell instanceof SonagiWord){
						this.context.beginPath();
						this.context.strokeStyle = "#F8FFA9";
						this.context.fillStyle = "#F8FFA9";
						
						this.context.lineJoin = "round";
						this.context.lineWidth = 35;

						this.context.strokeRect(
							colIndex * cellWidth + 20,
							rowIndex * cellHeight + 20,
							cellWidth - 30,
							cellHeight - 30,
						)
						this.context.closePath();



						this.context.beginPath();
						this.context.fillStyle = "black";
						this.context.font ="30px 고딕 bold";

						this.context.textAlign= "center";
						this.context.fillText(cell.word, 
							(colIndex*cellWidth)+ cellWidth/2 + 3, 
							(rowIndex)*cellHeight + cellHeight/2 + 15 + 3);
						this.context.fill();
						this.context.closePath();
						
						
					}
					
					
				}

			});
		});
	}

	private setWordOnBoard() {
		const newBoard = this.gameBoard.map((row) => row.fill(null));
		for (let i = 0 ; i < this.fallingWords.length ; i++){
			if(this.fallingWords[i].coord.row < 0){
				continue;
			}
			newBoard[this.fallingWords[i].coord.row]
								[this.fallingWords[i].coord.col] = this.fallingWords[i];
		}
		this.gameBoard = newBoard;

	}

	private renderBoard() {
		//먼저 단어 좌표를 보드에 세팅하고,
		this.setWordOnBoard();
		//색을 칠한다.
		this.generateGrid();
	}

	animate() {
		// 기본적으로 staggerFrame 마다 단어가 떨어지니까 staggerFrame마다 출력을해야됨.
		if(this.currentFrameCount < this.staggerFrame) {
			this.currentFrameCount++;

			// 그러나, 단어가 사라지는 것은 즉시 처리해야 하기 때문에,
			// 정답을 맞췄거나 단어가 바닥을 쳐서 사라지는 것을 판단하는 건 매 프레임마다 진행한다.
			if(this.deleteList.length > 0) {
				this.fallingWords = this.fallingWords.filter((e) => !this.deleteList.includes(e))

				//단어를 지운 상태로 게임화면을 랜더링
				this.context.clearRect(
					0,
					0,
					this.boardWidth,
					this.boardHeight
				);
				this.renderBoard();
				this.deleteList = [];
			}
		} else{
			this.currentFrameCount = 0;

			//life가 0이 되면 즉시 게임 종료
			// if (this.life <= 0) {
			// 	this.setIsGameOver(true);
			// 	return;
			// }
			this.checkIsGameOver();

			//기존에 render된 직사각형 새로 지우고,
			this.context.clearRect(
				0,
				0,
				this.boardWidth,
				this.boardHeight
			);

			//각 단어를 떨군다.
			this.fallingWords.forEach((word) => {
				word.fallWord();
				// 만약 맨 아래에 닿은 단어가 있다면 라이프 1개 깎고,
				// 없애야할 단어를 의미하는 deleteList에 추가.
				if (word.coord.row === this.numOfRows-1){
					this.deleteList.push(word);
					this.setLife(this.life - 1);
					this.life -= 1;
				}
			});
			
			
			// 
			if(this.wordsCnt < this.SonagiWords.length) {
				this.fallingWords.push(this.SonagiWords[this.wordsCnt++]);
			}           
			
			//다시 그린다.
			this.renderBoard();

			if((this.wordsCnt === this.SonagiWords.length) && (this.fallingWords.length === 0)) {
				this.setIsGameOver(true);
				if(this.life === 0)
					this.setIsClear(false);
				else
					this.setIsClear(true);
				
				console.log("exe");
				console.log(this.wordsCnt);
				return;
			}
		}
		
		if(!this.isGameOver){
			requestAnimationFrame(() => this.animate());
		}
	}
}

export default SonagiEngine;
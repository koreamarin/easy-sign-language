import { Coordinate } from "./SonagiEngine";

class SonagiWord {
  private _word: string;
  private _coord: Coordinate;

  constructor(
    word: string,
    coord: Coordinate,
  ) {
    this._word = word;
    this._coord = coord;
  }

	public set word(theWord: string){
		this._word = theWord;
	}
	public get word(){
		return this._word;
	}

	public set coord(theCoord: Coordinate){
		this._coord = theCoord;
	}
	public get coord() {
		return this._coord;
	}

	fallWord() {
		this.coord.row += 1;
	}

}

export default SonagiWord;
import { STEP, WALL } from "../../utils/constants";
import { Vector2, WaysType } from "../../utils/types";

export abstract class Node {
  abstract x: number;
  abstract y: number;
  abstract map: number[][];
  abstract availableWays: WaysType;
  abstract prevNode: Node | null;
  abstract getAvailableWays: () => WaysType;
  abstract get countOfAvailable(): number;
}

export class MapNode implements Node {
  x: number;
  y: number;
  map: number[][];
  availableWays: WaysType;
  prevNode: Node | null;

  constructor({ x, y, map }: { map: number[][], parent?: Node | null } & Vector2){
    this.x = x;
    this.y = y;
    this.map = map;
    this.map[y][x] = WALL;
    this.availableWays = this.getAvailableWays();
    this.prevNode = null;
  }

  getAvailableWays () {
    const result: WaysType = {
      top: null,
      bottom: null,
      left: null,
      right: null,
    }

    if(this.y - STEP >= 0 && this.map[this.y - STEP][this.x] !== WALL) { // top
      result.top = {y: this.y - STEP, x: this.x};
    }

    if(this.y + STEP <= this.map.length - 1 && this.map[this.y + STEP][this.x] !== WALL) { //bottom
      result.bottom = {y: this.y + STEP, x: this.x};
    }

    if(this.x - STEP >= 0 && this.map[this.y][this.x - STEP] !== WALL) { // left
      result.left = {y: this.y, x: this.x - STEP};
    }

    if(this.x + STEP <= this.map[this.y].length - 1 && this.map[this.y][this.x + STEP] !== WALL) { //right
      result.right = {y: this.y, x: this.x + STEP};
    }

    return Object.entries(result)
      .filter(([_, data]) => data !== null)
      .reduce((acc, [key,data]) => {
        acc[key] = data;
        return acc;
      }, {});
  }

  get countOfAvailable(){
    this.availableWays = this.getAvailableWays();
    return Object.values(this.availableWays).length;
  }
}
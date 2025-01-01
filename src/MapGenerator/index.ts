import { WALL } from "../../utils/constants";
import { Vector2 } from "../../utils/types";
import { MapNode, Node } from "./Node";

type MapParamsType = {
  width: number;
  height: number;
}

abstract class Generator {
  abstract height: MapParamsType['height'];
  abstract width: MapParamsType['width'];
  abstract map: number[][];
}


export class MapGenerator implements Generator {
  height: number;
  width: number;
  map: number[][];

  constructor({ width, height }: MapParamsType){
    this.height = height;
    this.width = width;
    this.map = this.generateMap();
    this.createMap({
      x: 1,
      y: 1,
      parent: null,
    })
  }

  generateMap = () => {
    const result: number[][] = [];
    for(let i = 0; i < this.height; i++){
      const row: number[] = [];
      for(let j = 0; j < this.width; j++){
        if(((i === 0 || i === this.height - 1) || (j === 0 || j === this.width - 1)) || (!(i % 2) && !(j % 2))){
          row.push(1);
        } else {
          row.push(0);
        }
      }
      result.push(row);
    }
    return result;
  }

  createMap({ x, y, parent = null }: { parent: Node | null } & Vector2) {
    let node = new MapNode({
      x,
      y,
      map: this.map,
    })
  
    if(parent) {
      node.prevNode = parent;
    }
  
    if(node.countOfAvailable <= 0){
      while(node.countOfAvailable <= 0 && node.prevNode !== null){
        node = node.prevNode || parent;
        node.availableWays = node.getAvailableWays();
      }
    }
  
    if(node.countOfAvailable > 0){
      const choosedWayDirection = Math.floor(Math.random() * (node.countOfAvailable - 1 + 1) + 1);
      const [choosedWayName, choosedWayCoord] = Object.entries(node.availableWays)[choosedWayDirection - 1] as [string, Vector2];
      const choosedWay = {
        name: choosedWayName,
        x: choosedWayCoord.x,
        y: choosedWayCoord.y,
      }
    
      switch (choosedWay.name) {
        case 'top':
          this.map[choosedWay.y + 1][choosedWay.x] = WALL;
          break;
        case 'bottom':
          this.map[choosedWay.y - 1][choosedWay.x] = WALL;
          break;
        case 'left':
          this.map[choosedWay.y][choosedWay.x + 1] = WALL;
          break;
        case 'right':
          this.map[choosedWay.y][choosedWay.x - 1] = WALL;
          break;
        default:
          break;
      }
      this.createMap({
        x: choosedWay.x,
        y: choosedWay.y,
        parent: node,
      })
    }
  }

  processMap = () => {
    return this.map.map(row=>{
      return row.map(el=> el === 2 ? 0 : 1)
    })
  }

  get gameMap(){
    return this.processMap();
  }
}
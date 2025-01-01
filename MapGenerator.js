// const STEP = 2;
// const WALL = 2;

// class Node {
//   constructor({x, y, map, parent}){
//     this.x = x;
//     this.y = y;
//     this.map = map;
//     this.map[y][x] = WALL;
//     this.availableWays = this.getAvailableWays();
//     this.prevNode = null;
//   }

//   getAvailableWays(){
//     const result = {
//       top: null,
//       bottom: null,
//       left: null,
//       right: null,
//     }

//     if(this.y - STEP >= 0 && this.map[this.y - STEP][this.x] !== WALL) { //top
//       result.top = {y: this.y - STEP, x: this.x};
//     }

//     if(this.y + STEP <= this.map.length - 1 && this.map[this.y + STEP][this.x] !== WALL){ //bottom
//       result.bottom = {y: this.y + STEP, x: this.x};
//     }

//     if(this.x - STEP >= 0 && this.map[this.y][this.x - STEP] !== WALL){ // left
//       result.left = {y: this.y, x: this.x - STEP};
//     }

//     if(this.x + STEP <= this.map[this.y].length - 1 && this.map[this.y][this.x + STEP] !== WALL){ //right
//       result.right = {y: this.y, x: this.x + STEP};
//     }
//     return Object.entries(result)
//     .filter(([key, data])=>data !== null)
//     .reduce((acc,[key,data])=>{
//       acc[key] = data;
//       return acc;
//     },{});
//   }

//   get countOfAvailable(){
//     this.availableWays = this.getAvailableWays();
//     return Object.values(this.availableWays).length;
//   }
// }

// export class MapGenerator{
//   constructor({ width, height }){
//     this.height = height;
//     this.width = width;
//     this.map = this.generateMap();
//     this.createMap({
//       x: 1,
//       y: 1,
//       parent: null,
//     })
//   }

//   generateMap = ()=>{
//     const result = [];
//     for(let i = 0; i < this.height; i++){
//       const row = [];
//       for(let j = 0; j < this.width; j++){
//         if(((i === 0 || i === this.height - 1) || (j === 0 || j === this.width - 1)) || (!(i % 2) && !(j % 2))){
//           row.push(1);
//         } else {
//           row.push(0);
//         }
//       }
//       result.push(row);
//     }
//     return result;
//   }

//   createMap({x, y, parent = null}){
//     let node = new Node({
//       x,
//       y,
//       map: this.map,
//     })
  
//     if(parent){
//       node.prevNode = parent;
//     }
  
//     if(node.countOfAvailable <= 0){
//       while(node.countOfAvailable <= 0 && node.prevNode !== null){
//         node = node.prevNode || parent;
//         node.availableWays = node.getAvailableWays();
//       }
//     }
  
//     if(node.countOfAvailable > 0){
//       const choosedWayDirection = Math.floor(Math.random() * (node.countOfAvailable - 1 + 1) + 1);
//       const [choosedWayName, choosedWayCoord] = Object.entries(node.availableWays)[choosedWayDirection - 1];
//       const choosedWay = {
//         name: choosedWayName,
//         x: choosedWayCoord.x,
//         y: choosedWayCoord.y,
//       }
    
//       switch (choosedWay.name) {
//         case 'top':
//           this.map[choosedWay.y + 1][choosedWay.x] = WALL;
//           break;
//         case 'bottom':
//           this.map[choosedWay.y - 1][choosedWay.x] = WALL;
//           break;
//         case 'left':
//           this.map[choosedWay.y][choosedWay.x + 1] = WALL;
//           break;
//         case 'right':
//           this.map[choosedWay.y][choosedWay.x - 1] = WALL;
//           break;
//         default:
//           break;
//       }
//       this.createMap({
//         x: choosedWay.x,
//         y: choosedWay.y,
//         parent: node,
//       })
//     }
//   }

//   processMap = () => {
//     return this.map.map(row=>{
//       return row.map(el=> el === 2 ? 0 : 1)
//     })
//   }

//   get gameMap(){
//     return this.processMap();
//   }
// }
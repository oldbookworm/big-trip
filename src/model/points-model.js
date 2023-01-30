import { generatePoints } from "../mock/mock-points";

export default class PointsModel {
    #points = generatePoints();
  
    get points() {
     return this.#points;
    }
  }
import { generatePoints } from "../mock/mock-points";

export default class PointsModel {
    points = generatePoints();
  
    getPoints = () => this.points;
  }
import Observable from "../framework/observable";
import { generatePoints } from "../mock/mock-points";

export default class PointsModel extends Observable  {
    #points = generatePoints();
  
    get points() {
     return this.#points;
    }


    // метод для обновления
    updatePoint = (updateType, update) => {
      const index = this.#points.findIndex((point) => point.id === update.id);
  
      if (index === -1) {
         throw new Error('Can\'t update unexisting point');
       }
  
      this.#points = [
        ...this.#points.slice(0, index),
        update,
        ...this.#points.slice(index + 1),
      ];
  
      this._notify(updateType, update);
    };


    // метод для добавления
    addPoint = (updateType, update) => {
      this.#points = [
        update,
        ...this.#points,
      ];
  
      this._notify(updateType, update);
    };


    // метод для удаления
    deletePoint = (updateType, update) => {
      const index = this.#points.findIndex((point) => point.id === update.id);
 
     if (index === -1) {
       throw new Error('Can\'t delete unexisting point');
     }
 
     this.#points = [
       ...this.#points.slice(0, index),
       ...this.#points.slice(index + 1),
     ];
 
     this._notify(updateType);
   };
   
  }
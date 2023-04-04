import Observable from "../framework/observable";
import { UpdateType } from "../util/main-util";
// import { generatePoints } from "../mock/mock-points";

export default class PointsModel extends Observable  {
    #pointsApiService = null;
    #points = [];
    #offersByType = [];
    #destinations = [];

    constructor(pointsApiService) {
      super();
      this.#pointsApiService = pointsApiService;
    }
  
    get points() {
     return this.#points;
    }

    get offersByType() {
      return this.#offersByType;
    }

    get destinations() {
      return this.#destinations;
    }


    init = async () => {
      try {
        const points = await this.#pointsApiService.points;
        this.#points = points.map(this.#adaptToClient);
      } catch(err) {
        this.#points = [];
      }

      try {
        this.#offersByType = await this.#pointsApiService.offers;
      } catch(err) {
        this.#offersByType = [];
      }

      try {
        this.#destinations = await this.#pointsApiService.destinations;
      } catch(err) {
        this.#destinations = [];
      }

      this._notify(UpdateType.INIT);
    };


    // метод для обновления
    updatePoint = async (updateType, update) => {
      const index = this.#points.findIndex((point) => point.id === update.id);
  
      if (index === -1) {
         throw new Error('Can\'t update unexisting point');
       }
  
       try {
          const response = await this.#pointsApiService.updatePoint(update);
          const updatedPoint = this.#adaptToClient(response);

          this.#points = [
            ...this.#points.slice(0, index),
            updatedPoint,
            ...this.#points.slice(index + 1),
          ];

          this._notify(updateType, updatedPoint);
        }catch(err) {
          throw new Error('Can\'t update point');
        }
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

   #adaptToClient = (point) => {
    const adaptedPoint = {...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'],
      dateTo: point['date_to'],
      isFavorite: point['is_favorite'],                    
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  };
   
  }
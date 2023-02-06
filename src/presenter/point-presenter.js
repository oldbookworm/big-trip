import EventItemView from '../view/trip-events-view/event-item-view.js';
import FormEditView from '../view/form-view/form-edit-view.js';
import {render, replace, remove} from '../framework/render.js';


export default class PointPresenter {
    #point = null;
    #pointsContainer = null;
    #pointComponent = null;
    #formEditComponent = null;
    
    constructor(pointsContainer) {
      this.#pointsContainer = pointsContainer;
    }
    
    init = (point) => {
      this.#point = point;
      
      this.#pointComponent = new EventItemView(point);
        this.#formEditComponent = new FormEditView(point);
      
      this.#pointComponent.setEditClickHandler(() => {
            this.#replacePointToForm();
            document.addEventListener('keydown', this.#removeOnEsc);
        });
    
       this.#formEditComponent.setFormSubmitHandler(() => {
            evt.preventDefault();
            this.#replaceFormToPoint();
            document.removeEventListener('keydown', this.#removeOnEsc);
       });
  
      this.#formEditComponent.setFormCloseBtnClickHandler(() => {
         this.#replaceFormToPoint();
         document.removeEventListener('keydown', this.#removeOnEsc);
      });
  
     render(this.#pointComponent, this.#pointsContainer);
    }
    
    #replacePointToForm = () => {
          replace(this.#formEditComponent, this.#pointComponent);
      };
    
    #replaceFormToPoint = () => {
          replace(this.#pointComponent, this.#formEditComponent);
      };
  
    #removeOnEsc = (evt) => {
          if (evt.key === 'Escape' || evt.key === 'Esc') {
            evt.preventDefault();
            this.#replaceFormToPoint();
            document.removeEventListener('keydown', this.#removeOnEsc);
          }
      };
    
  }
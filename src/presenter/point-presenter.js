import EventItemView from '../view/trip-events-view/event-item-view.js';
import FormEditView from '../view/form-view/form-edit-view.js';
import {render, replace, remove} from '../framework/render.js';


export default class PointPresenter {
    #point = null;
    #pointsContainer = null;
    #pointComponent = null;
    #formEditComponent = null;
    #changeData = null;
    
    constructor(pointsContainer, changeData) {
      this.#pointsContainer = pointsContainer;
      this.#changeData = changeData;
    }
    
    init = (point) => {
      this.#point = point;

      const prevPointComponent = this.#pointComponent;
      const prevFormEditComponent = this.#formEditComponent;
      
      this.#pointComponent = new EventItemView(point);
      this.#formEditComponent = new FormEditView(point);

      this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
      
      this.#pointComponent.setEditClickHandler(() => {
            this.#replacePointToForm();
            document.addEventListener('keydown', this.#removeOnEsc);
        });
    
       this.#formEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
  
      this.#formEditComponent.setFormCloseBtnClickHandler(() => {
         this.#replaceFormToPoint();
         document.removeEventListener('keydown', this.#removeOnEsc);
      });
  
      if (prevPointComponent === null || prevFormEditComponent === null) {
        render(this.#pointComponent, this.#pointsContainer);
        return;
      }

      if (this.#pointsContainer.contains(prevPointComponent.element)) {
        replace(this.#pointComponent, prevPointComponent);
      }
      
      if (this.#pointsContainer.contains(prevFormEditComponent.element)) {
        replace(this.#formEditComponent, prevFormEditComponent);
      }

      remove(prevPointComponent);
      remove(prevFormEditComponent);

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

    #handleFavoriteClick = () => {
        this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite});
    };
    
    #handleFormSubmit = (point) => {
      evt.preventDefault();
      this.#changeData(point);
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#removeOnEsc);     
   };

    destroy = () => {
      remove(this.#pointComponent);
      remove(this.#formEditComponent);
    };
    
    
  }
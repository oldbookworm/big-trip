import EventItemView from '../view/trip-events-view/event-item-view.js';
import FormEditView from '../view/form-view/form-edit-view.js';
import {render, replace, remove} from '../framework/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};


export default class PointPresenter {
    #point = null;
    #pointsContainer = null;
    #pointComponent = null;
    #formEditComponent = null;
    #changeData = null;
    #changeMode = null;

    #mode = Mode.DEFAULT;
    
    constructor(pointsContainer, changeData, changeMode) {
      this.#pointsContainer = pointsContainer;
      this.#changeData = changeData;
      this.#changeMode = changeMode;
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

      if (this.#mode === Mode.DEFAULT) {
        replace(this.#pointComponent, prevPointComponent);
      }
      
      if (this.#mode === Mode.EDITING) {
        replace(this.#formEditComponent, prevFormEditComponent);
      }

      remove(prevPointComponent);
      remove(prevFormEditComponent);

    }
    
    #replacePointToForm = () => {
          replace(this.#formEditComponent, this.#pointComponent);
          this.#changeMode();
          this.#mode = Mode.EDITING;
      };
    
    #replaceFormToPoint = () => {
          replace(this.#pointComponent, this.#formEditComponent);
          this.#mode = Mode.DEFAULT;
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

    resetView = () => {
      if (this.#mode !== Mode.DEFAULT) {
        this.#replaceFormToPoint();
      }
    };
     
  }
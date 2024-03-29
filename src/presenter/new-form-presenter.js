import FormAddNewView from '../view/form-view/form-addnew-view.js';
import {render,  RenderPosition, replace, remove} from '../framework/render.js';
import { UserAction, UpdateType } from '../util/main-util.js';

export default class NewFormPresenter {
    #newFormContainer = null;
    #newFormComponent = null;
    #changeData = null;
    #destroyCallback = null;

    #offersByType = null;
    #destinations = null;
    
    constructor(newFormContainer, changeData, offersByType, destinations) {
      this.#newFormContainer = newFormContainer;
      this.#changeData = changeData;
      this.#offersByType = offersByType;
      this.#destinations = destinations;
    }
    
    init = (callback) => {
      this.#destroyCallback = callback;

      if (this.#newFormComponent !== null) {
        return;
      }

     this.#newFormComponent = new FormAddNewView(this.#offersByType, this.#destinations);
     this.#newFormComponent.setSubmitNewPointHandler(this.#handleAddNewPoint);
     this.#newFormComponent.setCancelBtnClickHandler(this.#handleDeleteClick);
     this.#newFormComponent.setRollupBtnClickHandler(this.#handleDeleteClick);
      
     render(this.#newFormComponent,  this.#newFormContainer, RenderPosition.AFTERBEGIN);
      
     document.addEventListener('keydown', this.#escKeyDownHandler);
    }
    
    destroy = () => {
      if(this.#newFormComponent === null) {
        return;
      }
      
      this.#destroyCallback?.();
  
      remove(this.#newFormComponent);
      
      this.#newFormComponent = null;
      
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    };
      
  
    #handleAddNewPoint = (point) => {
      this.#changeData(
        UserAction.ADD_POINT,
        UpdateType.MINOR,
        {...point},
      );
    };
  
  
    #handleDeleteClick = () => {
      this.destroy();
    };
  
  
    #escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        this.destroy();
      }
    };

    setSaving = () => {
      this.#newFormComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    };

    setAborting = () => {
      const resetFormState = () => {
        this.#newFormComponent.updateElement({
          isDisabled: false,
          isSaving: false,
          isDeleting: false,
        });
      };
  
      this.#newFormComponent.shake(resetFormState);
    };

} 
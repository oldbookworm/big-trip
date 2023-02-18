import FormAddNewView from '../view/form-view/form-addnew-view.js';
import {render,  RenderPosition, replace, remove} from '../framework/render.js';

export default class NewFormPresenter {
    #newFormContainer = null;
    #newFormComponent = null;
    #closeNewFormHandler = null;
    #closeOnEscHandler = null;
    
    constructor(newFormContainer, closeNewFormHandler, closeOnEscHandler) {
      this.#newFormContainer = newFormContainer;
      this.#closeNewFormHandler = closeNewFormHandler;
      this.#closeOnEscHandler = closeOnEscHandler;
    }
    
    init = () => {

    const prevNewFormComponent = this.#newFormComponent; 
    this.#newFormComponent = new FormAddNewView(); 
     
     this.#newFormComponent.setRollupBtnClickHandler(() => {
        this.#closeNewFormHandler();
        document.removeEventListener('keydown', this.#closeOnEscHandler);
      });
  
     this.#newFormComponent.setCancelBtnClickHandler(() => {
        this.#closeNewFormHandler();
        document.removeEventListener('keydown', this.#closeOnEscHandler);
     });
      
    document.addEventListener('keydown', this.#closeOnEscHandler);

    
    if(prevNewFormComponent === null) {
      this.#renderNewForm();
      return;
    }

    replace(this.#newFormComponent, prevNewFormComponent);

    remove(prevNewFormComponent);
    
  }
    

  #renderNewForm = () => {
      render(this.#newFormComponent,  this.#newFormContainer, RenderPosition.AFTERBEGIN);        
  }

  destroy = () => {
      remove(this.#newFormComponent);
  };
    
  } 
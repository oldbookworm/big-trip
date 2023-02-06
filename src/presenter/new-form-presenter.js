import FormAddNewView from '../view/form-view/form-addnew-view.js';
import {render,  RenderPosition, remove} from '../framework/render.js';

export default class NewFormPresenter {
    #newFormContainer = null;
    #newFormComponent = null;
    
    constructor(newFormContainer) {
      this.#newFormContainer = newFormContainer;
    }
    
    init = () => {
      this.#newFormComponent = new FormAddNewView();
      this.#renderNewForm();
      
     this.#newFormComponent.setRollupBtnClickHandler(() => {
        this.#closeNewForm();
        document.removeEventListener('keydown', this.#closeNewFormOnEsc);
      });
  
     this.#newFormComponent.setCancelBtnClickHandler(() => {
        this.#closeNewForm();
        document.removeEventListener('keydown', this.#closeNewFormOnEsc);
     });
      
      document.addEventListener('keydown', this.#closeNewFormOnEsc);
    }
    
    #renderNewForm = () => {
      render(this.#newFormComponent,  this.#newFormContainer, RenderPosition.AFTERBEGIN);
    }
    
    #closeNewForm = () => {
      remove(this.#newFormComponent);
      document.removeEventListener('keydown', this.#closeNewFormOnEsc);
    }
    
    #closeNewFormOnEsc = (evt) => {
        if (evt.key === 'Escape' || evt.key === 'Esc') {
            evt.preventDefault();
            remove(this.#newFormComponent);
            document.removeEventListener('keydown', this.#closeNewFormOnEsc);
        }
    }  
  } 
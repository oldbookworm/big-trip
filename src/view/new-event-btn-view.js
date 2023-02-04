import AbstractView from '../framework/view/abstract-view.js';

const createNewEventBtnTemplate = () => (
    `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`
);


export default class NewEventBtnView extends AbstractView {
  
    get template() {
      return createNewEventBtnTemplate();
    }

    setNewBtnClickHandler = (callback) => {
        this._callback.newBtnClick = callback;
        this.element.addEventListener('click', this.#newBtnClickHandler);
    };
      
    #newBtnClickHandler = (evt) => {
        evt.preventDefault();
        this._callback.newBtnClick();
    };
  
}


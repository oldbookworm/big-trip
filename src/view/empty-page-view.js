import AbstractView from '../framework/view/abstract-view.js';

const createEmptyPageTemplate = () => (
  `<p class="trip-events__msg">Click New Event to create your first point</p>`
  );

export default class EmptyPageView extends AbstractView {
  
  get template() {
    return createEmptyPageTemplate();
  }

}
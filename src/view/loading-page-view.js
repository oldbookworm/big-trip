import AbstractView from '../framework/view/abstract-view.js';

const createLoadingPageTemplate = () => (
  `<p class="trip-events__msg">Loading...</p>`
  );

export default class LoadingPageView extends AbstractView {
  
  get template() {
    return createLoadingPageTemplate();
  }

}
import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../util/filter-util.js';

const NoPointsTextType = {
  [FilterType.EVERYTHING]: 'Click «ADD NEW» in menu to create your first event',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
};


const createEmptyPageTemplate = (filterType) => {
  const noPointsText = NoPointsTextType[filterType];

  return (
    `<p class="trip-events__msg">${noPointsText}</p>`
  )
};

export default class EmptyPageView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }
  
  get template() {
    return createEmptyPageTemplate(this.#filterType);
  }

}
import TripInfoView from './view/trip-info-view.js';
import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import {render, RenderPosition} from './render.js';

const siteHeaderElement = document.querySelector('.page-header');
const headerInfoContainer = siteHeaderElement.querySelector('.trip-main');
const filterContainer = headerInfoContainer.querySelector('.trip-controls__filters');

const siteMainElement = document.querySelector('.page-main');
const eventsContainer = siteMainElement.querySelector('.trip-events');



render(new TripInfoView(), headerInfoContainer, RenderPosition.AFTERBEGIN);
render(new FilterView(), filterContainer);

render(new SortView(), eventsContainer);
import TripInfoView from './view/trip-info-view.js';
import FilterView from './view/filter-view.js';
import MainPresenter from './presenter/main-presenter.js';

import {render, RenderPosition} from './render.js';

const siteHeaderElement = document.querySelector('.page-header');
const headerInfoContainer = siteHeaderElement.querySelector('.trip-main');
const filterContainer = siteHeaderElement.querySelector('.trip-controls__filters');

const siteMainElement = document.querySelector('.page-main');
const eventsContainer = siteMainElement.querySelector('.trip-events');

const mainPresenter = new MainPresenter();

render(new TripInfoView(), headerInfoContainer, RenderPosition.AFTERBEGIN);
render(new FilterView(), filterContainer);

mainPresenter.init(eventsContainer);




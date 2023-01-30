import FilterView from './view/filter-view.js';
import PointsModel from './model/points-model.js';
import MainPresenter from './presenter/main-presenter.js';


import {render} from './render.js';

const siteHeaderElement = document.querySelector('.page-header');
const headerInfoContainer = siteHeaderElement.querySelector('.trip-main');
const filterContainer = siteHeaderElement.querySelector('.trip-controls__filters');

const siteMainElement = document.querySelector('.page-main');
const eventsContainer = siteMainElement.querySelector('.trip-events');

const pointsModel = new PointsModel();
const mainPresenter = new MainPresenter(eventsContainer, headerInfoContainer, pointsModel);

render(new FilterView(), filterContainer);

mainPresenter.init();




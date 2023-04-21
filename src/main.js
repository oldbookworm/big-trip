import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import MainPresenter from './presenter/main-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewEventBtnView from './view/new-event-btn-view.js';
import PointsApiService from './services/point-api-service.js';

import {render} from './framework/render.js';

const AUTHORIZATION = 'Basic f45lfnso7d2';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip/';

const siteHeaderElement = document.querySelector('.page-header');
const headerInfoContainer = siteHeaderElement.querySelector('.trip-main');
const filterContainer = siteHeaderElement.querySelector('.trip-controls__filters');

const siteMainElement = document.querySelector('.page-main');
const eventsContainer = siteMainElement.querySelector('.trip-events');

const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();
const mainPresenter = new MainPresenter(eventsContainer, headerInfoContainer, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(filterContainer, filterModel,  pointsModel);
const newEventBtnComponent = new NewEventBtnView();

const OFFER_BY_TYPE = pointsModel.offersByType;


const handleNewPointFormClose = () => {
    newEventBtnComponent.element.disabled = false;
};
  
const handleNewPointButtonClick = () => {
    mainPresenter.createPoint(handleNewPointFormClose);
    newEventBtnComponent.element.disabled = true;
};
  


filterPresenter.init();
mainPresenter.init();

pointsModel.init()
  .finally(() => {
    render(newEventBtnComponent, headerInfoContainer);
    newEventBtnComponent.setNewBtnClickHandler(handleNewPointButtonClick);
  });

export {OFFER_BY_TYPE};



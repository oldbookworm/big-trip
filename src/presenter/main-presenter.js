import TripInfoView from '../view/trip-info-view.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/trip-events-view/events-list-view.js'
import EmptyPageView from '../view/empty-page-view.js';
import NewEventBtnView from '../view/new-event-btn-view.js';
import PointPresenter from './point-presenter.js';
import NewFormPresenter from './new-form-presenter.js';
import { updateItem } from '../util/main-util.js';
import { SORT_TYPE, sortByTime, sortByPrice } from '../util/sort-util.js';
import {render,  RenderPosition} from '../framework/render.js';


export default class MainPresenter {
	#container = null;
	#headerInfoContainer = null;
  	#pointsModel = null;
	#points = [];

	#eventsListComponent = new EventsListView();
	#sortComponent = new SortView();
	#emptyPageComponent = new EmptyPageView();
	#tripInfoComponent = new TripInfoView();
	#newEventBtnComponent = new NewEventBtnView();

	#pointPresenter = new Map();
	#currentSortType = SORT_TYPE.DEFAULT;
	#sourcedPoints = [];
	
	constructor(container, headerInfoContainer, pointsModel) {
		this.#container = container;
		this.#headerInfoContainer = headerInfoContainer;
		this.#pointsModel = pointsModel;
	}

	init = () => {	
		this.#points = [...this.#pointsModel.points];
		this.#sourcedPoints = [...this.#pointsModel.points];
		this.#renderPointBoard();
	}
	
	#renderPointBoard = () => {
		this.#renderNewEventBtn();
    	this.#renderEventsList();

		if(this.#points.length === 0) {
			this.#renderEmptyPage();
		} else {
			this.#renderTripInfo();
			this.#renderSort();
			this.#renderPoints();
		}		
		
		this.#newEventBtnComponent.setNewBtnClickHandler(() => {
			const newFormPresenter = new NewFormPresenter(this.#eventsListComponent.element);
			newFormPresenter.init();
		});
   };

   #pointChangeHandler = (updatedPoint) => {
    	this.#points = updateItem(this.#points, updatedPoint);
    	this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  	};

	#handleModeChange = () => {
		this.#pointPresenter.forEach((presenter) => presenter.resetView());
	};

	#handleSortTypeChange = (sortType) => {
		if (this.#currentSortType === sortType) {
			return;
		}
		this.#sortPoints(sortType);
		this.#clearPointList();
		this.#renderPoints();
	};

   #renderNewEventBtn = () => {
    	render(this.#newEventBtnComponent, this.#headerInfoContainer);
  	}

	#renderEventsList = () => {
		render(this.#eventsListComponent, this.#container);
	}
	  
	#renderEmptyPage = () => {
		render(this.#emptyPageComponent, this.#container);
	}
	  
	#renderTripInfo = () => {
		render(this.#tripInfoComponent, this.#headerInfoContainer,  RenderPosition.AFTERBEGIN);
	}
	
	#renderSort = () => {
		render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
		this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
	}
	  
	#renderPoints = () => {
		for (let i = 0; i < this.#points.length; i++) {
			this.#renderPoint(this.#points[i]);
		}	
	}

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#eventsListComponent.element, this.#pointChangeHandler, this.#handleModeChange);
   	pointPresenter.init(point);
	this.#pointPresenter.set(point.id, pointPresenter);
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SORT_TYPE.TIME:
        this.#points.sort(sortByTime);
        break;
      case SORT_TYPE.PRICE:
        this.#points.sort(sortByPrice);
        break;
      default:
        this.#points = [...this.#sourcedPoints];
    }

    this.#currentSortType = sortType;
  };


}
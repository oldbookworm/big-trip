import TripInfoView from '../view/trip-info-view.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/trip-events-view/events-list-view.js'
import EmptyPageView from '../view/empty-page-view.js';
import LoadingView from '../view/loading-view.js';
import PointPresenter from './point-presenter.js';
import NewFormPresenter from './new-form-presenter.js';
import { SORT_TYPE, sortByTime, sortByPrice } from '../util/sort-util.js';
import {render, remove,  RenderPosition} from '../framework/render.js';
import { UpdateType, UserAction } from '../util/main-util.js';
import { filter, FilterType } from '../util/filter-util.js';


export default class MainPresenter {
	#container = null;
	#headerInfoContainer = null;
  	#pointsModel = null;
	#filterModel = null;
	
	#eventsListComponent = new EventsListView();
	#sortComponent = null;
	#emptyPageComponent = null;
	#tripInfoComponent = new TripInfoView();
	#loadingComponent = new LoadingView();
	#pointPresenter = new Map();
	#currentSortType = SORT_TYPE.DEFAULT;
	#filterType = FilterType.EVERYTHING;
	#isLoading = true;
	#newFormPresenter = null;


	
	constructor(container, headerInfoContainer, pointsModel, filterModel) {
		this.#container = container;
		this.#headerInfoContainer = headerInfoContainer;
		this.#pointsModel = pointsModel;
		this.#filterModel = filterModel;

		this.#newFormPresenter = new NewFormPresenter(this.#eventsListComponent.element,  this.#handleViewAction, this.allOffers, this.destinations);

		this.#pointsModel.addObserver(this.#handleModelEvent);
		this.#filterModel.addObserver(this.#handleModelEvent);
	}

	get points() {
		this.#filterType = this.#filterModel.filter;
    	const points = this.#pointsModel.points;
    	const filteredPoints = filter[this.#filterType](points);

		switch (this.#currentSortType) {
		 case SORT_TYPE.TIME:
			return filteredPoints.sort(sortByTime);
		 case SORT_TYPE.PRICE:
			return filteredPoints.sort(sortByPrice);        
		}

		return filteredPoints;
	}


	get allOffers() {
		const allOffers = this.#pointsModel.offersByType;
		return allOffers;
	}

	get destinations() {
		const destinations = this.#pointsModel.destinations;
		return destinations;
	}

	init = () => {	
		this.#renderPointBoard(this.points);
	}

	createTask = (callback) => {
		this.#currentSortType = SORT_TYPE.DEFAULT;
		this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
		this.#newFormPresenter.init(callback);
	};
	
	// рендерит основу страницы
	#renderPointBoard = () => {
    	this.#renderEventsList();

		if (this.#isLoading) {
			this.#renderLoading();
			return;
		}

		if(this.points.length === 0) {
			this.#renderEmptyPage();
		} else {
			this.#renderTripInfo();
			this.#renderSort();
			this.#renderPoints(this.points);
		}		
   };

   

	// смена мода для сортировки
	#handleModeChange = () => {
		this.#newFormPresenter.destroy();
		this.#pointPresenter.forEach((presenter) => presenter.resetView());
	};

	#handleViewAction = (actionType, updateType, update) => {
		switch (actionType) {
			case UserAction.UPDATE_POINT:
			  this.#pointsModel.updatePoint(updateType, update);
			  break;
			case UserAction.ADD_POINT:
			  this.#pointsModel.addPoint(updateType, update);
			  break;
			case UserAction.DELETE_TASK:
			  this.#pointsModel.deletePoint(updateType, update);
			  break;
		}
	};
	
	#handleModelEvent = (updateType, data) => {
		switch (updateType) {
			case UpdateType.PATCH:
			  this.#pointPresenter.get(data.id).init(data);
			  break;
			case UpdateType.MINOR:
				this.#clearPointList();
				this.#renderPoints(this.points);
			  break;
			case UpdateType.MAJOR:
				this.#clearPointBoard();
				this.#renderPointBoard(this.points);
			  break;
			case UpdateType.INIT:
				this.#isLoading = false;
				remove(this.#loadingComponent);
				this.#renderPointBoard(this.points);;
			  break;  
		  }
	};

	// сортировка
	#handleSortTypeChange = (sortType) => {
		if (this.#currentSortType === sortType) {
			return;
		}
		this.#currentSortType = sortType;
		this.#clearPointList();
		this.#renderPoints(this.points);
	};


	// рендер простых элементов
   
	#renderLoading = () => {
		render(this.#loadingComponent, this.#eventsListComponent.element, RenderPosition.AFTERBEGIN);
	  };

	#renderEventsList = () => {
		render(this.#eventsListComponent, this.#container);
	}
	  
	#renderEmptyPage = () => {
		this.#emptyPageComponent = new EmptyPageView(this.#filterType);
		render(this.#emptyPageComponent, this.#container);
	}
	  
	#renderTripInfo = () => {
		render(this.#tripInfoComponent, this.#headerInfoContainer,  RenderPosition.AFTERBEGIN);
	}
	
	#renderSort = () => {
		this.#sortComponent = new SortView();
		render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
		this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
	}
	  
	#renderPoints = (points) => {
		points.forEach((point) => this.#renderPoint(point));
	}

	// создание презентера пойнта
	#renderPoint = (point) => {
    	const pointPresenter = new PointPresenter(this.#eventsListComponent.element, this.#handleViewAction, this.#handleModeChange, this.allOffers, this.destinations);
   		pointPresenter.init(point);
		this.#pointPresenter.set(point.id, pointPresenter);
  	};

	// удалить все презентеры пойнтов
  	#clearPointList = () => {
   	 	this.#pointPresenter.forEach((presenter) => presenter.destroy());
    	this.#pointPresenter.clear();
  	};

	// метод для обновления доски

	#clearPointBoard = () => {
		this.#clearPointList();
		remove(this.#sortComponent);
		remove(this.#loadingComponent);
		if (this.#emptyPageComponent) {
			remove(this.#emptyPageComponent);
		}
	};

}
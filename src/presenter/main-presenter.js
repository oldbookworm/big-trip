import TripInfoView from '../view/trip-info-view.js';
import SortView from '../view/sort-view.js';
import EventsListView from '../view/trip-events-view/events-list-view.js'
import EmptyPageView from '../view/empty-page-view.js';
import NewEventBtnView from '../view/new-event-btn-view.js';
import PointPresenter from './point-presenter.js';
import NewFormPresenter from './new-form-presenter.js';
import { SORT_TYPE, sortByTime, sortByPrice } from '../util/sort-util.js';
import {render,  RenderPosition} from '../framework/render.js';
import { UpdateType, UserAction } from '../util/main-util.js';


export default class MainPresenter {
	#container = null;
	#headerInfoContainer = null;
  	#pointsModel = null;
	
	#eventsListComponent = new EventsListView();
	#sortComponent = new SortView();
	#emptyPageComponent = new EmptyPageView();
	#tripInfoComponent = new TripInfoView();
	#newEventBtnComponent = new NewEventBtnView();
	#pointPresenter = new Map();
	#currentSortType = SORT_TYPE.DEFAULT;
	#newFormPresenter = null;

	
	constructor(container, headerInfoContainer, pointsModel) {
		this.#container = container;
		this.#headerInfoContainer = headerInfoContainer;
		this.#pointsModel = pointsModel;

		this.#pointsModel.addObserver(this.#handleModelEvent);
	}

	get points() {
		switch (this.#currentSortType) {
		 case SORT_TYPE.TIME:
			return [...this.#pointsModel.points].sort(sortByTime);
		 case SORT_TYPE.PRICE:
			return [...this.#pointsModel.points].sort(sortByPrice);        
		}

		return this.#pointsModel.points;
	}

	init = () => {	
		this.#renderPointBoard(this.points);
	}
	
	// рендерит основу страницы
	#renderPointBoard = () => {
		this.#renderNewEventBtn();
    	this.#renderEventsList();

		if(this.points.length === 0) {
			this.#renderEmptyPage();
		} else {
			this.#renderTripInfo();
			this.#renderSort();
			this.#renderPoints(this.points);
		}		
		
		this.#newEventBtnComponent.setNewBtnClickHandler(this.#addNewForm);
   };

	// смена мода для сортировки
	#handleModeChange = () => {
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
				this.#renderPoints(points);
			  break;
			case UpdateType.MAJOR:
				this.#clearPointList();
				this.#renderPoints(points);
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

	// открытие формы add new
	#addNewForm = () => {
		if(!this.#newFormPresenter) {
			this.#newFormPresenter = new NewFormPresenter(this.#eventsListComponent.element, this.#removeNewForm, this.#removeOnEsc);
		}
		this.#newFormPresenter.init();
	  }
	
	// закрытие формы add new
	#removeNewForm = () => {
		this.#newFormPresenter.destroy();
		this.#newFormPresenter = null;
	}
	
	#removeOnEsc = (evt) => {
		if (evt.key === 'Escape' || evt.key === 'Esc') {
			evt.preventDefault();
			this.#removeNewForm();
			document.removeEventListener('keydown', this.#removeOnEsc);
		}
	}


	// рендер простых элементов
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
	  
	#renderPoints = (points) => {
		points.forEach((point) => this.#renderPoint(point));
	}

	// создание презентера пойнта
	#renderPoint = (point) => {
    	const pointPresenter = new PointPresenter(this.#eventsListComponent.element, this.#handleViewAction, this.#handleModeChange);
   		pointPresenter.init(point);
		this.#pointPresenter.set(point.id, pointPresenter);
  	};

	// удалить все презентеры пойнтов
  	#clearPointList = () => {
   	 	this.#pointPresenter.forEach((presenter) => presenter.destroy());
    	this.#pointPresenter.clear();
  	};

}
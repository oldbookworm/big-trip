import TripInfoView from '../view/trip-info-view.js';
import SortView from '../view/sort-view.js';
import FormEditView from '../view/form-view/form-edit-view.js';
import FormAddNewView from '../view/form-view/form-addnew-view.js';
import EventsListView from '../view/trip-events-view/events-list-view.js'
import EventItemView from '../view/trip-events-view/event-item-view.js';
import EmptyPageView from '../view/empty-page-view.js';
import {render, RenderPosition} from '../render.js';

export default class MainPresenter {
	#container = null;
	#headerInfoContainer = null;
  	#pointsModel = null;
	#points = [];

	#eventsListComponent = new EventsListView();
	#sortComponent = new SortView();
	#emptyPageComponent = new EmptyPageView();
	#tripInfoComponent = new TripInfoView();
	
	constructor(container, headerInfoContainer, pointsModel) {
		this.#container = container;
		this.#headerInfoContainer = headerInfoContainer;
		this.#pointsModel = pointsModel;
	}

	init = () => {	
		this.#points = [...this.#pointsModel.points];
		this.#renderPointBoard();

	}
	
	#renderPointBoard = () => {
    	render(this.#eventsListComponent, this.#container);

    	// итемы
		if(this.#points.length === 0) {
			render(this.#emptyPageComponent, this.#container);
		} else {
			render(this.#tripInfoComponent, this.#headerInfoContainer,  RenderPosition.AFTERBEGIN);
			render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
			for (let i = 0; i < this.#points.length; i++) {
				this.#renderPoint(this.#points[i]);
			}	
		}   		
  };

  #renderPoint = (point) => {
    const pointComponent = new EventItemView(point);
	const formEditComponent = new FormEditView(point);

	const replacePointToForm = () => {
		this.#eventsListComponent.element.replaceChild(formEditComponent.element, pointComponent.element);
	};
  
	const replaceFormToPoint = () => {
		this.#eventsListComponent.element.replaceChild(pointComponent.element, formEditComponent.element);
	};

	const onEscKeyDown = (evt) => {
		if (evt.key === 'Escape' || evt.key === 'Esc') {
		  evt.preventDefault();
		  replaceFormToPoint();
		  document.removeEventListener('keydown', onEscKeyDown);
		}
	};
  
	pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
		replacePointToForm();
		document.addEventListener('keydown', onEscKeyDown);
	});
  
	formEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
		evt.preventDefault();
		replaceFormToPoint();
		document.removeEventListener('keydown', onEscKeyDown);
	});

	formEditComponent.element.querySelector('form .event__rollup-btn').addEventListener('click', () => {
		replaceFormToPoint();
	   document.removeEventListener('keydown', onEscKeyDown);
	});

    render(pointComponent, this.#eventsListComponent.element);
  };

}
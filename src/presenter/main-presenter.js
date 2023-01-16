import SortView from '../view/sort-view.js';
import FormPopupView from '../view/form-view/form-view.js';
import EventsListView from '../view/trip-events-view/events-list-view.js'
import EventItemView from '../view/trip-events-view/event-item-view.js';
import {render} from '../render.js';

export default class MainPresenter {

	//  контейнер для тасков и попапа
	eventsListComponent = new EventsListView();
	//  попап форма
	formPopupComponent = new FormPopupView();
	

	init = (container) => {
    	this.container = container;

    	// сортировка
    	render(new SortView(), this.container);
    	// контейнер для итемов
    	render(this.eventsListComponent, this.container);
    	// попап
    	render(this.formPopupComponent, this.eventsListComponent.getElement());

    	// итемы
    	for (let i = 0; i < 3; i++) {
      		render(new EventItemView(), this.eventsListComponent.getElement());
    	}
  };

}
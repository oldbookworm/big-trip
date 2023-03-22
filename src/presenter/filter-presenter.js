import {render, remove, replace} from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import { FilterType, filter } from '../util/filter-util.js';
import { UpdateType } from '../util/main-util.js';


export default class FilterPresenter {
    #filterContainer = null;
    #filterModel = null;
    #pointsModel = null;
    #filterComponent = null;

    constructor(filterContainer, filterModel, pointsModel) {
        this.#filterContainer = filterContainer;
        this.#filterModel = filterModel;
        this.#pointsModel = pointsModel;
    
        this.#pointsModel.addObserver(this.#handleModelEvent);
        this.#filterModel.addObserver(this.#handleModelEvent);
    }

    get filters() {
        const points = this.#pointsModel.points;
    
        return [
          {
            type: FilterType.EVERYTHING,
            name: 'Everything',
          },
          {
            type: FilterType.FUTURE,
            name: 'Future',
          },
          {
            type: FilterType.PAST,
            name: 'Past',
          },    
        ];
    }

    init = () => {
        const filters = this.filters;
        const prevFilterComponent = this.#filterComponent;
    
        this.#filterComponent = new FilterView(filters, this.#filterModel.filter);
        this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);
    
        if (prevFilterComponent === null) {
          render(this.#filterComponent, this.#filterContainer);
          return;
        }
    
        replace(this.#filterComponent, prevFilterComponent);
        remove(prevFilterComponent);
    };


    #handleModelEvent = () => {
        this.init();
    };

    #handleFilterTypeChange = (filterType) => {
        if (this.#filterModel.filter === filterType) {
          return;
        }
    
        this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
    };

}
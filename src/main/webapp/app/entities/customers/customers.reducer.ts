import axios from 'axios';
import {
  parseHeaderForLinks,
  loadMoreDataWhenScrolled,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
  ICrudDeleteAction
} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICustomers, defaultValue } from 'app/shared/model/customers.model';

export const ACTION_TYPES = {
  FETCH_CUSTOMERS_LIST: 'customers/FETCH_CUSTOMERS_LIST',
  FETCH_CUSTOMERS: 'customers/FETCH_CUSTOMERS',
  CREATE_CUSTOMERS: 'customers/CREATE_CUSTOMERS',
  UPDATE_CUSTOMERS: 'customers/UPDATE_CUSTOMERS',
  DELETE_CUSTOMERS: 'customers/DELETE_CUSTOMERS',
  RESET: 'customers/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICustomers>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type CustomersState = Readonly<typeof initialState>;

// Reducer

export default (state: CustomersState = initialState, action): CustomersState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CUSTOMERS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CUSTOMERS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CUSTOMERS):
    case REQUEST(ACTION_TYPES.UPDATE_CUSTOMERS):
    case REQUEST(ACTION_TYPES.DELETE_CUSTOMERS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CUSTOMERS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CUSTOMERS):
    case FAILURE(ACTION_TYPES.CREATE_CUSTOMERS):
    case FAILURE(ACTION_TYPES.UPDATE_CUSTOMERS):
    case FAILURE(ACTION_TYPES.DELETE_CUSTOMERS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CUSTOMERS_LIST): {
      const links = parseHeaderForLinks(action.payload.headers.link);

      return {
        ...state,
        loading: false,
        links,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_CUSTOMERS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CUSTOMERS):
    case SUCCESS(ACTION_TYPES.UPDATE_CUSTOMERS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CUSTOMERS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/customers';

// Actions

export const getEntities: ICrudGetAllAction<ICustomers> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_CUSTOMERS_LIST,
    payload: axios.get<ICustomers>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ICustomers> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CUSTOMERS,
    payload: axios.get<ICustomers>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICustomers> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CUSTOMERS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<ICustomers> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CUSTOMERS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICustomers> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CUSTOMERS,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

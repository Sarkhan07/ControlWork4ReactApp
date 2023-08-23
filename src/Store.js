import { createStore } from 'redux';
import dataReducer from './Reducer';

const Store = createStore(dataReducer);

export default Store;

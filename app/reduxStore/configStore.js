import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers'
import thunk from 'redux-thunk'


export default function configureStore() {
    let store = createStore(reducers, applyMiddleware(thunk))
    return store
}
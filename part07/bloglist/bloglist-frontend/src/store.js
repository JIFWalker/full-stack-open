import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import userListReducer from './reducers/userListReducer'


const reducer = combineReducers({
    blogs: blogReducer,
    user: userReducer,
    notification: notificationReducer,
    userList: userListReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

console.log(store.getState())

export default store
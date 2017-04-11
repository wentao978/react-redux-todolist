import { combineReducers } from 'redux'
import { ADD_TODO, COMPLETE_TODO, SET_VISIBILITY_FILTER, VisibilityFilters } from '../actions'
const { SHOW_ALL } = VisibilityFilters

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
	  if(action.text){
		 return [
			...state,
			{
			  text: action.text,
			  completed: false
			}
		  ] 
	  }else{
		return state;	  
	  }
      
    case COMPLETE_TODO:
	  if(state[action.index].completed){
		 return [
			...state.slice(0, action.index),
			Object.assign({}, state[action.index], {
			  completed: false
			}),
			...state.slice(action.index + 1)
		  ]
	  }else{
		 return [
			...state.slice(0, action.index),
			Object.assign({}, state[action.index], {
			  completed: true
			}),
			...state.slice(action.index + 1)
		  ] 
	  }	
      
    default:
      return state
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  todos
})

export default todoApp
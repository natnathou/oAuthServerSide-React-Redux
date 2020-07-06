import {combineReducers} from 'redux'
import formValueReducer from './formValueReducer'
import formPropsReducer from './formPropsReducer'
import errorReducer from "./errorReducer"
import responseErrorMessageReducer from "./responseErrorMessageReducer"
import attemptingResponseReducer from "./attemptingResponseReducer"


export default combineReducers({
    formValue           : formValueReducer,
    formProps           : formPropsReducer,
    displayError        : errorReducer,
    responseErrorMessage: responseErrorMessageReducer,
    attemptingResponse  : attemptingResponseReducer
})
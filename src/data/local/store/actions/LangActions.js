import Types from "../constants"

 export const langReducer = (theme) => async (dispatch) =>  {
    dispatch({ type: Types.ACTIVE_LANGUAGE, payload: theme })
 }
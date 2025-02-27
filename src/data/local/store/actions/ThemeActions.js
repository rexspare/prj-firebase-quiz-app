import Types from "../constants"

 export const themeReducer = (theme) => async (dispatch) =>  {
    dispatch({ type: Types.ACTIVE_THEME, payload: theme })
 }
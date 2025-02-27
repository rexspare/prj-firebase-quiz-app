import Types from '../constants';
import defaulttheme from '@assets/theme/light.json';

const initialThemeState = {
  theme: defaulttheme,
};

const themeReducer = (state = initialThemeState, action) => {
  switch (action.type) {
    case Types.ACTIVE_THEME:
      return {theme: action.payload};
  }
  return state;
};

export default themeReducer;

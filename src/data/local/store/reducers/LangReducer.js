import Types from '../constants';
import defaultlang from '@assets/languages/english.json';

const initialLangState = {
  lang: defaultlang,
};

const langReducer = (state = initialLangState, action) => {
  switch (action.type) {
    case Types.ACTIVE_LANGUAGE:
      return {lang: action.payload};
  }
  return state;
};

export default langReducer;

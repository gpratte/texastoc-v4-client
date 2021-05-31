
import {GOT_QUARTERLY_SEASONS} from './seasonQuartersActions'

// Take the quarterly seasons as the parameter
function quarterlySeasonsReducer(quarterlySeasons, action) {
  switch (action.type) {
    case GOT_QUARTERLY_SEASONS:
      return Object.assign({}, quarterlySeasons, {data: action.quarterlySeasons});
    default:
      return quarterlySeasons;
  }
}

export default quarterlySeasonsReducer

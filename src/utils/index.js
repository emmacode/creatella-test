const MONTH = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December"
};

/**
 * This is hard coded into redux since it could be desired that a random advert could be selected
 * for the advert in a large application and redux is basically a place where this can be managed
 * instead of hard coding this.
 */
const advert = {
  title: "Products Grid",
  isAdvert: true,
  description:
    "Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.",
  sponsorsText: "But first, a word from our sponsors:"
};

/**
 * This funtion takes a date string and returns the date from now
 * The time is returned in the form of (3 days ago)
 * except if the time difference of the current date from the passed date is older than 7 days
 * then the full date is displayed
 *
 * @return {string}
 * @param {string} date
 */
export const getDate = date => {
  let currentDate = new Date(),
    difference = currentDate.getTime() - new Date(date).getTime(),
    time = difference / 86400000;

  if (time > 7) {
    return `${MONTH[new Date(date).getMonth()]} ${new Date(
      date
    ).getDate()} ${new Date(date).getFullYear()} at ${new Date(
      date
    ).getHours()}:${new Date(date).getMinutes()}:${new Date(
      date
    ).getSeconds()}`;
  } else {
    return `${Math.floor(time)} days ago`;
  }
};

/**
 * This function takes an object of query string parameters and returns a string
 * of composed ejectable GET parameters for the fetch query
 * For example, {_page: 0, _sort: "id"} is returned as ?_page=0&_sort=id
 *
 * @return {string}
 * @param {object} params
 */
export const getQueryParams = params => {
  let queryParams = "",
    keysOfParams = Object.keys(params || {});

  keysOfParams.forEach((key, i) => {
    let appender = i === keysOfParams.length - 1 ? "" : "&";
    queryParams += `${key}=${params[key]}${appender}`;
  });

  let _queryParams = queryParams.length === 0 ? "" : `?${queryParams}`;
  return _queryParams;
};

/**
 * This function accepts the state, action and boolean value stating whether the
 * query is an initial fetch query like when a sort is just selected or the page is just loaded
 * and the it inserts an advert after every 20th item
 *
 * This function also increases the advertising target index every time a new advert is added
 * This tells us the next index position where an advert would be added
 *
 * @return {data : Array, advertTargetIndex: number}
 * @param {object} state
 * @param {object} action
 * @param {bool} isInitialFetch
 */
export const insertAdvert = (state, action, isInitialFetch) => {
  let data = isInitialFetch
      ? action.payload
      : [...state.data, ...action.payload],
    advertTargetIndex = isInitialFetch ? 20 : state.advertTargetIndex;

  if (data.length >= state.advertTargetIndex) {
    data = [
      ...data.slice(
        0,
        state.advertTargetIndex + (state.advertTargetIndex / 20 - 1)
      ),
      { ...advert, generatedImageRef: Math.floor(Math.random() * 1000) },
      ...data.slice(
        state.advertTargetIndex + (state.advertTargetIndex / 20 - 1)
      )
    ];
    advertTargetIndex = state.advertTargetIndex + 20;
  }

  return { data, advertTargetIndex };
};

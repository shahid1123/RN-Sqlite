export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_AGE = 'SET_USER_AGE';
export const GET_CITIES = 'GET_CITIES';

const API_URL = 'https://mocki.io/v1/0f4c4abc-62aa-4de4-8dc4-f206cccd96ce';

export const get_cities = () => {
  try {
    return async dispatch => {
      const Response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await Response.json();
      if (json) {
        dispatch({
          type: 'GET_CITIES',
          payload: json,
        });
      } else {
        console.log('unble to fetch data');
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const setName = name => dispatch => {
  dispatch({
    type: SET_USER_NAME,
    payload: name,
  });
};
export const setAge = age => dispatch => {
  dispatch({
    type: SET_USER_AGE,
    payload: age,
  });
};

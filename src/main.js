import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import Profile from './profile';

const initialState = {
    firstName: 'Billy',
    lastName: 'The Kid',
    email: 'billy.the.kid@hotmail.net',
    createdAt: Date.now(),
    picture: '',
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_PICTURE':
            return { ...state, picture: action.picture };
    }

    return state;
};

const store = createStore(reducer, initialState);

ReactDOM.render(
    <Provider store={store}>
        <Profile />
    </Provider>,
  document.getElementById('main'),
);

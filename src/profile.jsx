import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import get from 'lodash/get';

const makeCancelable = (promise) => {
    let hasCanceled_ = false;

    const wrappedPromise = new Promise((resolve, reject) => {
        promise.then(val => hasCanceled_ ? reject({ isCanceled: true }) : resolve(val),); // eslint-disable-line prefer-promise-reject-errors
        promise.catch(error => hasCanceled_ ? reject({ isCanceled: true }) : reject(error),); // eslint-disable-line prefer-promise-reject-errors
    });

    return {
        promise: wrappedPromise,
        abort() {
            hasCanceled_ = true;
        },
    };
};

export class Profile extends Component {
    constructor(props) {
        super(props);

        this.cancelablePromises = {};

        this.state = {
            firstName: props.firstName,
            lastName: props.lastName,
            email: props.email,
            picture: props.picture,
        };
    }

    isLoading() {
        return this.state.picture === '';
    }

    componentDidMount() {
        this.UNSAFE_componentWillReceiveProps(this.props);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.cancelablePromises.picture) {
            this.cancelablePromises.picture.id.abort();
            delete this.cancelablePromises.picture;
        }

        const api = makeCancelable(fetch('/api/profile/me'));
        this.cancelablePromises.picture = api;

        api.promise
      .then((result) => {
          delete this.cancelablePromises.picture;

          this.props.dispatch({
              type: 'SET_PICTURE',
              picture: get(result, 'picture'),
          });
      })
      .catch((err) => {
          console.error(err);
      });
    }

    componentWillUnmount() {
        for (const i in this.cancelablePromises) {
            this.cancelablePromises[i].abort();
            delete this.cancelablePromises[i];
        }
    }

    render() {
        return (
            <div className="profile">
                <strong>
                    Welcome
                    {' '}
                    {this.state.firstName}
                    {' '}
                    {this.state.lastName}
                    !
                </strong>
                <div>
                    Profile created:
                    {' '}
                    {moment(this.props.createdAt).format('MM/DD/YYYY')}
                </div>
            </div>
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
      nextState.firstName != this.state.firstName
      || nextState.lastName != this.state.lastName
      || nextState.email != this.state.email
      || nextState.picture != this.state.picture
      || nextProps.firstName != this.props.firstName
      || nextProps.lastName != this.props.lastName
      || nextProps.email != this.props.email
      || nextProps.picture != this.props.picture
      || nextProps.createdAt != this.props.createdAt
        );
    }
}

Profile.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    createdAt: PropTypes.object.isRequired,
};

Profile.defaultProps = {
    email: '',
};

export default connect(state => ({
    firstName: get(state, 'firstName'),
    lastName: get(state, 'lastName'),
    email: get(state, 'email'),
}))(Profile);

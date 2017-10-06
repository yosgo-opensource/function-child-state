import { Component } from 'react';
import PropTypes from 'prop-types';

class StateProvider extends Component {
  constructor(props) {
    super(props);
    this.state = props.combineInitialState;
  }
  update = (key, newState) => {
    this.setState(state =>
      Object.assign({}, state, {
        [key]: newState
      })
    );
  };
  dispatch = action => {
    this.props
      .combineActions({
        state: this.state,
        dispatch: this.dispatch,
        update: this.update
      })
      [action.type](action.payload);
  };
  render() {
    return this.props.children(this.state, this.dispatch);
  }
}

StoreContainer.propTypes = {
  combineInitialState: PropTypes.object.isRequired,
  combineActions: PropTypes.func.isRequired
};

export default StateProvider;

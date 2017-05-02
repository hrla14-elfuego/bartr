import React from 'react';
import NavBar from './NavBar';
import './styles/styles.css'
import { connect } from 'react-redux';
import { getProfile } from '../actions/actionCreator';
import store from '../store';
import actionCreator from '../actions/actionCreator';
import { bindActionCreators } from 'redux';


class Home extends React.Component {
  constructor(props) {
    super(props);


  }
  componentDidMount() {
    getProfile();
  }
  render () {
    console.log('this is props: ', this.props);
    return (
      <div className='home'>
        <h1>
          This is Home!
        </h1>

      </div>
    )
  }
}

// export default Home;

function mapStateToProps(state) {
  return {
    ProfileReducer: state.ProfileReducer
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreator, dispatch);
}

export default connect(mapStateToProps, mapStateToProps)(Home);
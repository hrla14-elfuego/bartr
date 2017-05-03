import React from 'react';
import NavBar from './NavBar';
import './styles/styles.css'
import { connect } from 'react-redux';
import { getProfile } from '../actions/actionCreator';
import store from '../store';
import * as actionCreator from '../actions/actionCreator';
import { bindActionCreators } from 'redux';


class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      
    }
  }
  componentDidMount() {
    this.props.getProfile();
  }

  render () {
    console.log('this is props: ', this.props);
    return (
      <div>
        <h1>
          This is Home!
        </h1>
      </div>
    )
  }
}

// export default Home;

const mapStateToProps = (state) => {
  console.log(state);
  return {
    ProfileReducer : state.ProfileReducer
  }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(actionCreator, dispatch);
// }

export default connect(mapStateToProps, { getProfile })(Home);
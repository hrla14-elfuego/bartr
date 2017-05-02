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
        ProfileReducer: this.props.ProfileReducer
    }
    this.getUsers = this.getUsers.bind(this);
  }

  getUsers(res) {
    for(let i = 0; i < res.length; i++){
      this.setState({ProfileReducer: [...this.state.ProfileReducer,res[i]]})
    }
  }

  componentDidMount() {
    console.log("this is props on line 22 of home",this.props)
    this.props.getProfile(this.getUsers);
  }

  render () {
      console.log("this is props.profilereducer on line 28", this.props.ProfileReducer)
            console.log("this is props on line 29", this.props)
    console.log('this is state on line 21 of home: ', this.state.ProfileReducer);


    return (
      <div className='home'>
        <h1>
Hi
        </h1>

      </div>
    )
  }
}

// export default Home;

// function mapStateToProps(state) {
//   return {
//     store
//   }
// }


const mapStateToProps = state => ({
  //  console.log("this is state line 47", state.ProfileReducer)
    ProfileReducer : state.ProfileReducer
})

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(actionCreator, dispatch);
// }

export default connect(mapStateToProps, {getProfile})(Home);

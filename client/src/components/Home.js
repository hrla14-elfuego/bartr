import React from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import { each } from 'lodash';
import './styles/styles.css'
import { Parallax, Background } from 'react-parallax';
import { Dropdown, Input, Button, Header, Image, Grid, Modal } from 'semantic-ui-react';
import {Carousel} from "react-bootstrap";
import Autocomplete from 'react-google-autocomplete';
import { geocodeByAddress } from 'react-places-autocomplete';
import { Link } from 'react-router';
import { Icon } from 'semantic-ui-react';
import AddressSearchWithData  from '../containers/AddressSearchContainer'


class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      address: ''
    }
    
    this.handleAddress = this.handleAddress.bind(this);
  }
  
  componentDidMount() {
    if (localStorage.profile) {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.id_token}`
        }
      }
      axios.get(API_ENDPOINT + '/api/users', config)
        .then((res) => {
          let inDb = false;
          each(res.data, (user) => {
            if (user.auth0_id === this.props.profile.user_id) {
              inDb = true;
            }
          })
          if (!inDb) {
            console.log('NOT IN DB');
            this.postNewUser();
          }
        })
    }
  }

  getAuth0UserInfo() {
    const header = {
      Authorization: `Bearer ${localStorage.id_token}`
    }
    axios.get('https://bartr.auth0.com/userinfo', header)
      .then((res) => {

      })
  }

  postNewUser() {
    const config = {
        headers: {
          Authorization: `Bearer ${localStorage.id_token}`
        }
      }
    const profile = this.props.profile;
    axios.post(API_ENDPOINT + '/api/users', {
      name: profile.name,
      auth0_id: profile.user_id
    }, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  handleAddress(event) {
    localStorage.address = event.target.value;
    event.preventDefault();
    this.setState({
      address: event.target.value
    }) 
  }

  render () {
    console.log('this.props.profile: ', this.props.profile);
    return (

    <div>
            <AddressSearchWithData />
      <Link to='/map'><Button className='homesearchbutton'>Search</Button></Link>

      <section>
        <div className="parallax-one">
          <h2>BARTR </h2>
        </div>
      </section>

      <section>
        <div className="block">
          <p><span className="first-character ny">B</span>artr is the best app in the world.  If you think otherwise you are just trash.  I repeat just trash.  Let me give you a quick rundown on what Bartr is all about.  You trade services and what not with other people for services.  if you dont understand that then you are just a lost cause.  Remeber use our app because its the best not because i told you.  But use this app just this is blah blah blah text here i need this to look nice fuck</p>
          <p className="line-break margin-top-10"></p>
          <p className="margin-top-10">Congratulations! You’ree not perfect! It’s ridiculous to want to be perfect anyway. But then, everybody’s ridiculous sometimes, except perfect people. You know what perfect is? Perfect is not eating or drinking or talking or moving a muscle or making even the teensiest mistake. Perfect is never doing anything wrong – which means never doing anything at all. Perfect is boring! So you’re not perfect! Wonderful! Have fun! Eat things that give you bad breath! Trip over your own shoelaces! Laugh! Let somebody else laugh at you! Perfect people never do any of those things. All they do is sit around and sip weak tea and think about how perfect they are. But they’re really not one-hundred-percent perfect anyway. You should see them when they get the hiccups! Phooey! Who needs ’em? You can drink pickle juice and imitate gorillas and do silly dances and sing stupid songs and wear funny hats and be as imperfect as you please and still be a good person. Good people are hard to find nowadays. And they’re a lot more fun than perfect people any day of the week.</p>
        </div>
      </section>

      <section>
        <div className="parallax-two">
        </div>
      </section>

      <Carousel >
          <Carousel.Item >
            <img width={200} height={75} alt="900x500" src="http://bostonchamber.com/media/team/Justin-Kang_279.jpg"/>
            <Carousel.Caption>
              <h3>Justin Kang</h3>
              <p className="thick">Project Owner</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img width={200} height={75} alt="900x500" src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTemWdq1kmDSPAOfOmTzYS9L4Nd9v7HGcR2w8beDC2qWGBVBWsL"/>
            <Carousel.Caption>
              <h3>Shak </h3>
              <p className="thick">Scrum Master Overlord</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img width={200} height={75} alt="900x500" src="http://bostonchamber.com/media/team/Justin-Kang_279.jpg"/>
            <Carousel.Caption>
              <h3>Joe Kim</h3>
              <p className="thick">FrontEnd Monkey</p>
            </Carousel.Caption>
          </Carousel.Item>
            <Carousel.Item>
            <img width={200} height={75} alt="900x500" src="http://bostonchamber.com/media/team/Justin-Kang_279.jpg"/>
            <Carousel.Caption>
              <h3>Jason Kim</h3>
              <p className="thick">FrontEnd Monkey</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
    </div>
    )
  }
}


export default Home;

// city network bg
  //https://media.osram.info/im/img/osram-dam-1182425//c,x,71,y,407,w,5257,h,2993/f,p/s,x,1230,y,0/725965_Network_business_conection_system_on_cityscape_background
// red sky, camel silhouette
  // http://s1.thingpic.com/images/1e/usAoQMdY4zvsZisn1WoUedDs.jpeg
// big handshake
  // https://tradewithbxi.files.wordpress.com/2014/10/banner-jointventure.jpg
// black/red map
  // https://upload.wikimedia.org/wikipedia/commons/3/39/Shipping_routes_red_black.png
      {/*<div className='parallax-div'>
        <Parallax
          className='parallax'
          bgImage='http://s1.thingpic.com/images/1e/usAoQMdY4zvsZisn1WoUedDs.jpeg'
          strength={400}>
        </Parallax>
      </div>*/}
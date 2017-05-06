import React from 'react';
import _ from 'lodash';
import { Grid, Card, Icon, Image, Button } from 'semantic-ui-react';
import axios from 'axios';
import swal from 'sweetalert';

const ServiceProviderList = (props) => {

  const requestService = (event, user) => {
      event.preventDefault();
      const config = {
        headers: {'Authorization': 'Bearer ' + localStorage.id_token}
      };
      axios.post(API_ENDPOINT + '/api/engagements', {
        receiver_id: user.id
      }, config)
          .then(data => {
            console.log('Engagement Created! ', data);
            swal({
              title: 'Requested Service!',
              text: user.name + " for " + user.service.type + " service",
              type: 'success'
            })
            props.fetchRemainingServiceUsers(data.data);
          })
          .catch(err => {
            console.log('Error: ', err);
          })
    }

  const columns = _.map(props.users, user => {
    if(user.email !== JSON.parse(localStorage.profile).name){
      return(
        <Grid.Column>
          <Card>
            <Image src='http://images4.wikia.nocookie.net/marveldatabase/images/9/9b/Ultimate_spiderman.jpg' />
            <Card.Content>
              <Card.Header>
                {user.name}
              </Card.Header>
              <Card.Description>
                {user.service.type}
                <br />
                  {user.address}
                <br />
              </Card.Description>
            </Card.Content>
            <Button value={user} onClick={(event, user) => {requestService(event, user.value)}}>
              Request Service
            </Button>
            <Button >
              Go to Profile
            </Button>
          </Card>
        </Grid.Column>
      )
    }
  })

  return(
    <Grid columns={3} divided>{columns}</Grid>
  )
}

export default ServiceProviderList;
// requestService(event, id.value)
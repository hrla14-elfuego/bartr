import React from 'react';
import _ from 'lodash';
import { Grid, Card, Icon, Image } from 'semantic-ui-react';

const ServiceProviderList = (props) => {
const columns = _.map(props.users, user => (
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
        </Card.Description>
      </Card.Content>
    </Card>
  </Grid.Column>
))
  return(
    <Grid columns={3} divided>{columns}</Grid>
  )
}

export default ServiceProviderList;
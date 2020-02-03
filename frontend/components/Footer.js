import { Container, Header, Grid, List, Segment } from 'semantic-ui-react'
import Cat from './Cat'
import styled from 'styled-components'

const StyledFooter = styled.div`

`
const Footer = () =>
  <StyledFooter>
    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='About' />
              <List link inverted>
                <List.Item as='a'>Sitemap</List.Item>
                <List.Item as='a'>Contact Us</List.Item>
                <List.Item as='a'>FAQ</List.Item>
                <List.Item as='a' href='https://github.com/GitSimmons'>GitHub</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Tech Stack' />
              <List link inverted>
                <List.Item as='a' href='https://reactjs.org/'>React</List.Item>
                <List.Item as='a' href='https://graphql.org/'>GraphQL</List.Item>
                <List.Item as='a' href='https://www.prisma.io/'>Prisma</List.Item>
                <List.Item as='a' href='https://nextjs.org/'>NextJS</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h3' inverted>
                <Cat />
                Aunt Sadie's Antiques
              </Header>
              <p>Mandatory color inverted footer at the bottom of the page for visual balance. </p>
              <p>©2019 <a href='https://github.com/GitSimmons'>Ben Simmons</a>, available under the MIT license or whatever npm defaulted to. </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </StyledFooter>
export default Footer

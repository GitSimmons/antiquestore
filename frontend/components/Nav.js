import React, { Component } from 'react'
import Router from 'next/router'
import { Image, Menu } from 'semantic-ui-react'
import styled from 'styled-components'
// Menu example from semantic ui docs

const topMenuItems = [
  {key: 'Cart', name: 'Cart'},
  {key: 'Account', name: 'Account' },
  {key: 'Sign Out', name: 'Sign Out'}
]

const items = [
  { key: 'Collections', name: 'Collections', a: '/' },
  { key: 'Estate Sales', name: 'Estate Sales', a: '/sales' },
  { key: 'Upcoming Events', name: 'Upcoming Events', a: '/events' },
  { key: 'Our History', name: 'Our History', a: '/about' },
  { key: 'Consign With Us', name: 'Consign With Us', a: '/consign' },
]

const StyledMenu = styled.div`
  .ui.inverted.menu {
    background-color: rgb(0,0,0, 0.8);
  };
  padding-bottom: 2rem; 
`
const StyledNav = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin-right: 35px;
`

export default class MenuExampleBasic extends Component {
  state = {
    activeItem: ""
  }

  handleItemClick = (e, { name, a }) => Router.push(a)

  render() {
    const { activeItem } = this.state
    return (
      <StyledMenu>
      <Menu inverted borderless>
        <Menu.Item header>
          <Image src="/static/logo.png"/>
        </Menu.Item>
        <StyledNav>
        <div> <Menu borderless text secondary floated="right" inverted items={topMenuItems} size="small" /> </div>
        <div> <Menu borderless defaultActiveIndex="0" floated="right" inverted items={items} size="large" onItemClick={this.handleItemClick} /> </div>
        </StyledNav>
      </Menu>
      </StyledMenu>
    )
  }
}

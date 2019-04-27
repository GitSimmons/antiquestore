import React, { useState } from 'react'
import Router from 'next/router'
import { Button, Container, Header, Icon, Image, Menu, Responsive, Segment, Sticky, Transition, Visibility } from 'semantic-ui-react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import SignOut from './SignOut'
import User from './User'
import { TOGGLE_CART_MUTATION } from './Cart'
import Search from './Search'
import Cat from './Cat'

// const getWidth = () => {
//   const isSSR = typeof window === 'undefined'

//   return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
// }

const DesktopContainer = ({ children }) => {
  const handleItemClick = (e, { a }) => { a && Router.push(a) }
  return (
    <Responsive>
      <Container fixed='top' />
      <Menu borderless fixed='top' >
        <Menu.Item>
          <Icon name='bars' size='large' />
        </Menu.Item>
        <Menu.Item fitted='horizontally' >
          <Cat onClick={() => Router.push('/')} />
        </Menu.Item>
        <Menu.Item fitted='horizontally'>

          <Header size='small' onClick={() => Router.push('/')}>
          Aunt Sadie's Antiques
          </Header>
        </Menu.Item>
        <Menu.Menu
          position='right'
        >
          <Menu.Item>
            <Search />
          </Menu.Item>
          <User>
            {data => {
              return (
                <>
                  <Menu.Item disabled={!data.currentUser} a='/sell' onClick={handleItemClick} >Sell</Menu.Item>
                  <Mutation mutation={TOGGLE_CART_MUTATION}>
                    { toggleCartMutation =>
                      <Menu.Item disabled={!data.currentUser} a='/Cart' icon='cart' onClick={toggleCartMutation} ></Menu.Item>
                    }
                  </Mutation>

                  <Menu.Item disabled={!data.currentUser} a='/Account' onClick={handleItemClick} icon='user'></Menu.Item>
                  {!data.currentUser
                    ? <Menu.Item a='/login' onClick={handleItemClick}> Log In </Menu.Item>
                    : <SignOut>
                      {signOut =>
                        <Menu.Item onClick={signOut}> Log Out </Menu.Item>
                      }
                    </SignOut>}
                </>
              )
            }
            }
          </User>
        </Menu.Menu>
      </Menu>
    </Responsive>
  )
}

export default DesktopContainer

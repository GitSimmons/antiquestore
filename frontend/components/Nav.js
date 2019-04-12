import React, { useState } from 'react'
import Router from 'next/router'
import { Button, Container, Image, Menu, Responsive, Segment, Sticky, Transition, Visibility } from 'semantic-ui-react'
import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import SignOut from './SignOut'
import User from './User'
import { TOGGLE_CART_MUTATION } from './Cart'

// Menu example largely based on semantic ui docs

// Heads up! (note from docs)
// Use React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

const ResponsiveContainer = ({ children }) => (
  <>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </>
)

const StyledNav = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin-right: 35px;
`

const StyledDesktopContainer = styled.div`
        .ui.inverted.segment {
        background: url('/static/bg.jpg');
        background-size: cover !important;
        background-position: center;
        }
        .ui.inverted.menu {
    background-color: rgb(0,0,0, 0.8);
  };
  padding-bottom: 5rem;
`
const DesktopContainer = ({ children }) => {
  const handleItemClick = (e, { a }) => { a && Router.push(a) }
  return (
    <StyledDesktopContainer>
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Container fixed='top' />
        <Menu inverted borderless fixed='top'>
          <Menu.Item header>
            <Image src='/static/logo.png' onClick={() => Router.push('/')} />
          </Menu.Item>
          <StyledNav>
            <Menu
              borderless
              text
              secondary
              floated='right'
              inverted
              size='small'
            >
              <Menu.Item a='/sell' onClick={handleItemClick} >Sell</Menu.Item>
              <Mutation mutation={TOGGLE_CART_MUTATION}>
                { toggleCartMutation =>
                  <Menu.Item a='/Cart' onClick={toggleCartMutation} >Cart</Menu.Item>
                }
              </Mutation>
              <Menu.Item a='/Account' onClick={handleItemClick} >Account</Menu.Item>
              <User>
                {data => {
                  return (!data.currentUser
                    ? <Menu.Item a='/login' onClick={handleItemClick}> Log In </Menu.Item>
                    : <SignOut>
                      {signOut =>
                        <Menu.Item onClick={signOut}> Log Out </Menu.Item>
                      }
                    </SignOut>
                  )
                }
                }
              </User>
            </Menu>
          </StyledNav>
        </Menu>

      </Responsive>
    </StyledDesktopContainer>
  )
}

const MobileContainer = ({ children }) => {
  const handleItemClick = (e, { a }) => { a && Router.push(a) }
  return (
    <StyledDesktopContainer>
      <Responsive getWidth={getWidth} maxWidth={Responsive.onlyMobile.maxWidth}>
        <Container fixed='top' />
        <Menu inverted borderless fixed='top'>
          <Menu.Item header>
            <Image src='/static/logo.png' onClick={() => Router.push('/')} />
          </Menu.Item>
          <StyledNav>
            <Menu
              borderless
              text
              secondary
              floated='right'
              inverted
              size='small'
            >
              <Menu.Item a='/sell' onClick={handleItemClick} >Sell</Menu.Item>
              <Menu.Item a='/Cart' onClick={handleItemClick} >Cart</Menu.Item>
              <Menu.Item a='/Account' onClick={handleItemClick} >Account</Menu.Item>
              <User>
                {data => {
                  return (!data.currentUser
                    ? <Menu.Item a='/login' onClick={handleItemClick}> Log In </Menu.Item>
                    : <SignOut>
                      {signOut =>
                        <Menu.Item onClick={signOut}> Log Out </Menu.Item>
                      }
                    </SignOut>
                  )
                }
                }
              </User>
            </Menu>
          </StyledNav>
        </Menu>

      </Responsive>
    </StyledDesktopContainer>
  )
}

// const topMenuItems = [
//   { key: 'Sell', name: 'Sell', a: '/sell' },
//   { key: 'Cart', name: 'Cart' },
//   { key: 'Account', name: 'Account' },
//   { key: 'Log in', name: 'Log In', a: '/login' }
// ]

// const items = [
//   { key: 'Collection', name: 'Collection', a: '/' },
//   { key: 'Estate Sales', name: 'Estate Sales', a: '/sales' },
//   { key: 'About Us', name: 'About Us', a: '/about' }
// ]

export default ResponsiveContainer

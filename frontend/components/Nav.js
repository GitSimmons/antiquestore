import React, { useState } from "react";
import Router from "next/router";
import { Menu, Modal, Icon } from "semantic-ui-react";
import { Mutation } from "react-apollo";
import SignOut from "./SignOut";
import User from "./User";
import { TOGGLE_CART_MUTATION } from "./Cart";
import Search from "./Search";
import Cat from "./Cat";
import styled from "styled-components";
import Login from "./Login";


const Nav = ({ children }) => {
  const handleItemClick = (e, { a }) => {
    a && Router.push(a);
  };
  return (
      <Menu borderless fixed="top">
        <Menu.Item>
          <Cat onClick={() => Router.push("/")} />
        </Menu.Item>
        <Menu.Item>
          <Search />
        </Menu.Item>
        <Menu.Menu position="right">
          <User>
            {({ data: { currentUser } }) => {
              return (
                <>
                  <Menu.Item
                    disabled={!currentUser}
                    a="/sell"
                    icon="usd"
                    onClick={handleItemClick}
                  ></Menu.Item>
                  <Mutation mutation={TOGGLE_CART_MUTATION}>
                    {toggleCartMutation => (
                      <Menu.Item
                        disabled={!currentUser}
                        a="/Cart"
                        icon="cart"
                        onClick={toggleCartMutation}
                      ></Menu.Item>
                    )}
                  </Mutation>
                  <Menu.Item
                    disabled={!currentUser}
                    a="/Account"
                    onClick={handleItemClick}
                    icon="user"
                  ></Menu.Item>
                  {!currentUser ? (
                    <Modal
                      trigger={<Menu.Item as="a"> Log In </Menu.Item>}
                      dimmer="blurring"
                      size="small"
                    >
                      <Login />
                    </Modal>
                  ) : (
                    <SignOut>
                      {signOut => (
                        <Menu.Item onClick={signOut}> Log Out </Menu.Item>
                      )}
                    </SignOut>
                  )}
                </>
              );
            }}
          </User>
        </Menu.Menu>
      </Menu>
  );
};

export default Nav;

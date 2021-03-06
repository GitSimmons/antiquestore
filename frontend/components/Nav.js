import React, { useState } from "react";
import Router from "next/router";
import { Menu, Modal, Icon } from "semantic-ui-react";
import { Mutation } from "react-apollo";
import SignOut from "./SignOut";
import { useUser } from "./User";
import { TOGGLE_CART_MUTATION } from "./Cart";
import Search from "./Search";
import Cat from "./Cat";
import styled from "styled-components";
import Login from "./Login";
import { hasPermission } from "../lib/utils";

const Nav = ({ children }) => {
  const handleItemClick = (e, { a }) => {
    a && Router.push(a);
  };
  const handleSearch = (result) => {
    Router.push(`/item?id=${result.id}`);
  };
  const currentUser = useUser();
  return (
    <Menu borderless fixed="top">
      <Menu.Item>
        <button
          onClick={() => Router.push("/")}
          aria-label="home"
          style={{ border: "none", background: "none" }}
        >
          <Cat />
        </button>
      </Menu.Item>
      <Menu.Item>
        <Search callbackFn={handleSearch} />
      </Menu.Item>
      <Menu.Menu position="right">
        {currentUser &&
          hasPermission(currentUser.permissions, "ITEMCREATE") && (
            <Menu.Item
              a="/sell"
              icon="usd"
              onClick={handleItemClick}
              aria-label="sell"
            />
          )}
        <Mutation mutation={TOGGLE_CART_MUTATION}>
          {(toggleCartMutation) => (
            <Menu.Item
              disabled={!currentUser}
              a="/Cart"
              icon="cart"
              onClick={toggleCartMutation}
              aria-label="my cart"
            ></Menu.Item>
          )}
        </Mutation>
        <Menu.Item
          disabled={!currentUser}
          a="/Account"
          onClick={handleItemClick}
          icon="user"
          aria-label="my account"
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
            {(signOut) => <Menu.Item onClick={signOut}> Log Out </Menu.Item>}
          </SignOut>
        )}
      </Menu.Menu>
    </Menu>
  );
};

export default Nav;

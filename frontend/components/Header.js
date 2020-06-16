import NProgress from "nprogress";
import Router from "next/router";
import {useUser} from "./User";
import Cart from "./Cart";
import Nav from "./Nav";

Router.onRouteChangeStart = () => {
  NProgress.configure({ showSpinner: false });
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const Header = () => {
  const currentUser = useUser()
      return (
        <>
	  {currentUser && <Cart />}
          <Nav />
        </>
      );
    }

export default Header;

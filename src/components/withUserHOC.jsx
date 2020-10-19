import React from "react";
import { UserContext } from "../Context/UserProvider";

// For debugging purposes.
const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || `Component`;
};

const withUserHOC = (Component) => {
  const WrappedComponent = (props) => {
    return (
      <UserContext.Consumer>
        {(user) => <Component user={user} {...props} />}
      </UserContext.Consumer>
    );
  };

  WrappedComponent.displayName = `WithUser(${getDisplayName(
    WrappedComponent
  )})`;
  return WrappedComponent;
};

export default withUserHOC;

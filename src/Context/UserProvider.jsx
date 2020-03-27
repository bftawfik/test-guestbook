import React from "react";
const { Provider, Consumer } = React.createContext();

const withUser = Component => {
  return (props) => <Consumer>{user => <Component user={user} {...props}/>}</Consumer>;
};
const UserProvider = ({ value, children }) => {
  return <Provider value={value}>{children}</Provider>;
};
export default UserProvider;
export { UserProvider, withUser };

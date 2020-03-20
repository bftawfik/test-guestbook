import React from "react";
import { Link } from "react-router-dom";
import { withUser } from "../../../Context/UserProvider";

import { PATHES } from "../../../Constants/routes";

const Navigation = ({ user }) => {
  const { loggedIn, toggleUser } = user;
  return (
    <nav>
      <ul>
        {loggedIn ? (
          <li>
            <button onClick={() => toggleUser(user)}>Logout</button>
          </li>
        ) : (
          <React.Fragment>
            <li>
              <Link to={PATHES.LOGIN}>Login</Link>
            </li>
            <li>
              <Link to={PATHES.REGISTER}>Register</Link>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

export default withUser(Navigation);

import React from "react";
import { Link } from "react-router-dom";
import { PATHES } from "../../../Constants/routes";

export default ({ className }) => (
  <Link className={className && className} to={PATHES.HOME}>
    Guestbook
  </Link>
);

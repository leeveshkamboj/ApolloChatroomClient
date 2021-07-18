import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";
import Globalchat from "./globalchat";

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h3>
        Welcome{" "}
        {user ? (
          <>{user.username} !</>
        ) : (
          <>
            Guest! Please <Link to={"/login"}>Login</Link> or{" "}
            <Link to={"/register"}>Register</Link>.
          </>
        )}
      </h3>
      {user && (
        <>
          <br />
          <br />
          <Globalchat />
        </>
      )}
    </div>
  );
}

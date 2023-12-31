import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MetaData from "../Layout/Metadata";
import { getUser } from "../../utils/helpers";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "../../utils/helpers";
import { fontFamily, textAlign } from "@mui/system";
import Button from "@mui/material/Button";
import Loader from "../Layout/Loader";
const Profile = () => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const getProfile = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    };
    try {
      const { data } = await axios.get(
        `https://myrmidons-api.onrender.com/api/v1/me`,
        config
      );
      setUser(data.user);
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.log(error);
      toast.error("Invalid user or password", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const profileButtonStyle = {
    padding: "10px 20px",
    margin: "5px",
    textDecoration: "none",
    color: "black",
    borderRadius: "5px",
    backgroundColor: "yellow",
    border: "none",
  };

  return (
    <>
    {loading ? (
        <Loader />
      ) : (
    <Fragment>
       
      <MetaData title={"Your Profile"} />
      <br />
      <br />
      <br />
      <br />
      <div
        className="container"
        style={{ justifyContent: "center", textAlign: "center" }}
      >
        <div
          class="cardlang"
          style={{
            marginLeft: "200px",
            backgroundColor: "gray",
            border: "solid 6px black",
          }}
        >
          <div class="firstinfo">
            <img src={user.avatar && user.avatar.url} alt={user.name} />
            <div class="profileinfo">
              <h1 style={{ fontWeight: "bold" }}>{user.name}</h1>
              <h3 style={{ color: "#00bcd4", fontWeight: "bold" }}>
                {user.email}
              </h3>
            </div>
          </div>
          <Button
            color="secondary"
            to="/me/update"
            style={{ color: "yellow" }}
component={Link}
          >
            Update Profile
          </Button>
          <br></br>
          <Button
            color="secondary"
            to="/password/update"
component={Link}

            style={{ color: "yellow" }}
          >
            Change Password
          </Button>
          <br></br>

          <Button
            color="secondary"
            to="/orders/me"
component={Link}

            style={{ color: "yellow" }}
          >
            My Orders
          </Button>
        </div>
      </div>
      
    </Fragment>
    )}
    </>
  );
};

export default Profile;

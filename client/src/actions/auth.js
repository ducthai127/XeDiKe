import axios from "axios";
import _ from "lodash";
import getFingerprint from "../helpers/getFingerprint";
import jwtDecode from "jwt-decode";
import setHeaders from "../helpers/setHeaders";

export const getErrors = err => {
  return {
    type: "GET_ERRORS",
    payload: err
  };
};

export const register = (data, history) => {
  return dispatch => {
    axios
      .post("/api/users/register", data)
      .then(res => {
        console.log("res: ", res);
        dispatch(getErrors({}));
        history.push("/");
      })
      .catch(err => {
        if (err) {
          dispatch(getErrors(_.get(err, "response.data")));
        }
      });
  };
};

export const login = (data, history) => {
  const { email, password } = data;
  return dispatch => {
    getFingerprint(fingerprint => {
      axios
        .post("/api/users/login", { email, password, fingerprint })
        .then(res => {
          const token = res.data.token;
          localStorage.setItem("token", token);
          const decoded = jwtDecode(token);
          // redux store
          dispatch(setCurrentUser(decoded));

          // set header cho những request
          // VD: API test-private
          setHeaders(token, fingerprint);

          dispatch(getErrors({}));

          history.push("/");
        })
        .catch(err => {
          if(err) {
            dispatch(getErrors(_.get(err, "response.data")))
          }
        });
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    dispatch(setCurrentUser({}))
    setHeaders()
  }
}

export const setCurrentUser = data => {
  return {
    type: "SET_CURRENT_USER",
    payload: data
  };
};

export const getMyProfile = (id, callback) => {
  return (dispatch) => {
    axios.get(`/api/users/${id}`)
    .then(res => {
      dispatch(setCurrentUser(res.data))
      callback(res.data)
    })
    .catch(err => {
      if(err) {
        dispatch(getErrors(_.get(err, "response.data")))
      }
    })
  }
}
import axios from "axios";

function setHeaders(token, fingerprint) {
    if (token && fingerprint) {
        axios.defaults.headers.common["Authorization"] = token;
        axios.defaults.headers.common["fingerprint"] = fingerprint;
    } else {
        delete axios.defaults.headers.common["Authorization"];
        delete axios.defaults.headers.common["fingerprint"];
    }
}

export default setHeaders;

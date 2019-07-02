import Fingerprint2 from "fingerprintjs2";

function getFingerprint(callback) {
    Fingerprint2.getV18({}, fingerprint => {
        callback(fingerprint)
    })
}

export default getFingerprint;

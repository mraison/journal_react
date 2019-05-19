// src/components/contacts.js

import React from 'react'
// Ok so this is stupid and I shouldn't do it...

const RequestGET = (url) => {
    let res = []
    fetch(url)
        .then(res => {
          res = res.json()
        })
        .catch(error => {
          res = []
          throw Error(error)
        })
    return res
};

export default RequestGET
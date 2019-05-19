// src/components/contacts.js

import React from 'react'


class request {

  GET = (url) => {
    fetch(url)
          .then(res => res.json())
          .then((d) => {
            return d
          })
          .catch(console.log)
    };
  }
}

export default Contacts
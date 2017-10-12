import React from 'react'
import auth from '../utils/auth'
import createReactClass from 'create-react-class'

const Logout = createReactClass({
  componentDidMount() {
    auth.logout()
  },

  render() {
    return <p>You are now logged out</p>
  }
})

module.exports = Logout

import React from 'react'
import auth from '../utils/auth'
import createReactClass from 'create-react-class'

const Dashboard = createReactClass({
  render() {
    const token = auth.getToken()

    return (
      <div>
        <h1>Dashboard</h1>
        <p>You made it!</p>
        <p>{token}</p>
        {this.props.children}
      </div>
    )
  }
})

module.exports = Dashboard

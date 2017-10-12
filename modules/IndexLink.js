import React from 'react'
import Link from './Link'
import createReactClass from 'create-react-class'

/**
 * An <IndexLink> is used to link to an <IndexRoute>.
 */
const IndexLink = createReactClass({

  render() {
    return <Link {...this.props} onlyActiveOnIndex={true} />
  }

})

export default IndexLink

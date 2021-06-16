import invariant from 'invariant'
import React from 'react'
import ReactIs from 'react-is'

import deprecateObjectProperties from './deprecateObjectProperties'
import getRouteParams from './getRouteParams'
import { isReactChildren } from './RouteUtils'
import warning from './routerWarning'
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types'

const { array, func, object } = PropTypes

/**
 * A <RouterContext> renders the component tree for a given router state
 * and sets the history object and the current location in context.
 */
const RouterContext = createReactClass({

  propTypes: {
    history: object,
    router: object.isRequired,
    location: object.isRequired,
    routes: array.isRequired,
    params: object.isRequired,
    components: array.isRequired,
    createElement: func.isRequired
  },

  getDefaultProps() {
    return {
      createElement: React.createElement
    }
  },

  childContextTypes: {
    history: object,
    location: object.isRequired,
    router: object.isRequired
  },

  getChildContext() {
    let { router, history, location } = this.props
    if (!router) {
      warning(false, '`<RouterContext>` expects a `router` rather than a `history`')

      router = {
        ...history,
        setRouteLeaveHook: history.listenBeforeLeavingRoute
      }
      delete router.listenBeforeLeavingRoute
    }

    if (__DEV__) {
      location = deprecateObjectProperties(location, '`context.location` is deprecated, please use a route component\'s `props.location` instead. http://tiny.cc/router-accessinglocation')
    }

    return { history, location, router }
  },

  createElement(component, props) {
    return component == null ? null : this.props.createElement(component, props)
  },

  render() {
    const { history, location, routes, params, components } = this.props
    let element = null

    if (components) {
      element = components.reduceRight((element, components, index) => {
        if (components == null)
          return element // Don't create new children; use the grandchildren.

        const route = routes[index]
        const routeParams = getRouteParams(route, params)
        const props = {
          history,
          location,
          params,
          route,
          routeParams,
          routes
        }

        if (isReactChildren(element)) {
          // eslint-disable-next-line react/prop-types
          props.children = element
        } else if (element) {
          for (const prop in element)
            if (Object.prototype.hasOwnProperty.call(element, prop))
              props[prop] = element[prop]
        }

        const isValidElementType = ReactIs.isValidElementType(components)
        if (!isValidElementType && typeof components === 'object') {
          const elements = {}

          for (const key in components) {
            if (Object.prototype.hasOwnProperty.call(components, key)) {
              // Pass through the key as a prop to createElement to allow
              // custom createElement functions to know which named component
              // they're rendering, for e.g. matching up to fetched data.
              elements[key] = this.createElement(components[key], {
                key, ...props
              })
            }
          }

          return elements
        }

        return this.createElement(components, props)
      }, element)
    }

    invariant(
      element === null || element === false || React.isValidElement(element),
      'The root route must render a single element'
    )
    
    return element
  }

})

export default RouterContext

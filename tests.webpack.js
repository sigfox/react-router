/* eslint-env mocha */

// import expect from 'expect'
//
// import { _resetWarned } from './modules/routerWarning'
//
// beforeEach(() => {
//   /* eslint-disable no-console */
//   expect.spyOn(console, 'error').andCall(msg => {
//     let expected = false
//
//     console.error.expected.forEach(about => {
//       if (msg.indexOf(about) !== -1) {
//         console.error.warned[about] = true
//         expected = true
//       }
//     })
//
//     if (expected)
//       return
//
//     console.error.threw = true
//     throw new Error(msg)
//   })
//
//   console.error.expected = []
//   console.error.warned = Object.create(null)
//   console.error.threw = false
//   /* eslint-enable no-console */
// })
//
// afterEach(() => {
//   /* eslint-disable no-console */
//
//   if (!console.error.threw) {
//     console.error.expected.forEach(about => {
//       expect(console.error.warned[about]).toExist(`Missing expected warning: ${about}`)
//     })
//   }
//   console.error.restore()
//   /* eslint-enable no-console */
//
//   _resetWarned()
// })

const context = require.context('./modules', true, /-test\.js$/)
context.keys().forEach(context)

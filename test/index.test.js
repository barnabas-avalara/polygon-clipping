/* eslint-env jest */

const path = require('path')
const load = require('load-json-file')
const fillQueue = require('../src/fill-queue')

// GeoJSON Data
const data = load.sync(
  path.join(__dirname, 'fixtures', 'two_triangles.geojson')
)
const s = [data.features[0].geometry.coordinates]
const c = [data.features[1].geometry.coordinates]
const q = fillQueue(s, c)

describe('fill event queue', () => {
  test('point 0', () => {
    const currentPoint = q.pop()
    expect(currentPoint.point).toEqual([20, -23.5]) /* s[0][0] */
    expect(currentPoint.isLeft).toBeTruthy()
    expect(currentPoint.otherEvent.point).toEqual([226.5, -113.5]) /* s[0][2] */
    expect(currentPoint.otherEvent.isLeft).toBeFalsy()
  })

  test('point 1', () => {
    const currentPoint = q.pop()
    expect(currentPoint.point).toEqual([20, -23.5]) /* s[0][0] */
    expect(currentPoint.isLeft).toBeTruthy()
    expect(currentPoint.otherEvent.point).toEqual([170, 74]) /* s[0][1] */
    expect(currentPoint.otherEvent.isLeft).toBeFalsy()
  })

  test('point 2', () => {
    const currentPoint = q.pop()
    expect(currentPoint.point).toEqual([54.5, -170.5]) /* c[0][0] */
    expect(currentPoint.isLeft).toBeTruthy()
    expect(currentPoint.otherEvent.point).toEqual([239.5, -198]) /* c[0][2] */
    expect(currentPoint.otherEvent.isLeft).toBeFalsy()
  })

  test('point 3', () => {
    const currentPoint = q.pop()
    expect(currentPoint.point).toEqual([54.5, -170.5]) /* c[0][0] */
    expect(currentPoint.isLeft).toBeTruthy()
    expect(currentPoint.otherEvent.point).toEqual([140.5, 33.5]) /* c[0][1] */
    expect(currentPoint.otherEvent.isLeft).toBeFalsy()
  })

  test('point 4', () => {
    const currentPoint = q.pop()
    expect(currentPoint.point).toEqual([140.5, 33.5]) /* c[0][0] */
    expect(currentPoint.isLeft).toBeFalsy()
    expect(currentPoint.otherEvent.point).toEqual([54.5, -170.5]) /* c[0][1] */
    expect(currentPoint.otherEvent.isLeft).toBeTruthy()
  })

  test('point 5', () => {
    const currentPoint = q.pop()
    expect(currentPoint.point).toEqual([140.5, 33.5]) /* c[0][0] */
    expect(currentPoint.isLeft).toBeTruthy()
    expect(currentPoint.otherEvent.point).toEqual([239.5, -198]) /* c[0][1] */
    expect(currentPoint.otherEvent.isLeft).toBeFalsy()
  })

  test('point 6', () => {
    const currentPoint = q.pop()
    expect(currentPoint.point).toEqual([170, 74]) /* s[0][1] */
    expect(currentPoint.isLeft).toBeFalsy()
    expect(currentPoint.otherEvent.point).toEqual([20, -23.5]) /* s[0][0] */
    expect(currentPoint.otherEvent.isLeft).toBeTruthy()
  })

  test('point 7', () => {
    const currentPoint = q.pop()
    expect(currentPoint.point).toEqual([170, 74]) /* s[0][1] */
    expect(currentPoint.isLeft).toBeTruthy()
    expect(currentPoint.otherEvent.point).toEqual([226.5, -113.5]) /* s[0][3] */
    expect(currentPoint.otherEvent.isLeft).toBeFalsy()
  })

  test('point 8', () => {
    const currentPoint = q.pop()
    expect(currentPoint.point).toEqual([226.5, -113.5]) /* s[0][1] */
    expect(currentPoint.isLeft).toBeFalsy()
    expect(currentPoint.otherEvent.point).toEqual([20, -23.5]) /* s[0][0] */
    expect(currentPoint.otherEvent.isLeft).toBeTruthy()
  })

  test('point 9', () => {
    const currentPoint = q.pop()
    expect(currentPoint.point).toEqual([226.5, -113.5]) /* s[0][1] */
    expect(currentPoint.isLeft).toBeFalsy()
    expect(currentPoint.otherEvent.point).toEqual([170, 74]) /* s[0][0] */
    expect(currentPoint.otherEvent.isLeft).toBeTruthy()
  })

  test('point 10', () => {
    const currentPoint = q.pop()
    expect(currentPoint.point).toEqual([239.5, -198]) /* c[0][2] */
    expect(currentPoint.isLeft).toBeFalsy()
    expect(currentPoint.otherEvent.point).toEqual([54.5, -170.5]) /* c[0][0] */
    expect(currentPoint.otherEvent.isLeft).toBeTruthy()
  })

  test('point 11', () => {
    const currentPoint = q.pop()
    expect(currentPoint.point).toEqual([239.5, -198]) /* c[0][2] */
    expect(currentPoint.isLeft).toBeFalsy()
    expect(currentPoint.otherEvent.point).toEqual([140.5, 33.5]) /* s[0][1] */
    expect(currentPoint.otherEvent.isLeft).toBeTruthy()
  })
})

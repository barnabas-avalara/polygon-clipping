const cleanInput = require('./clean-input.js')
const connectEdges = require('./connect-edges')
const fillQueue = require('./fill-queue')
const operations = require('./operation')
const subdivideSegments = require('./subdivide-segments')

const booleanOp = (subject, clipping, operation) => {
  cleanInput(subject)
  cleanInput(clipping)

  // console.time('fill queue');
  const eventQueue = fillQueue(subject, clipping, operation)
  // console.timeEnd('fill queue');

  // console.time('subdivide edges');
  const sortedEvents = subdivideSegments(
    eventQueue,
    subject,
    clipping,
    operation
  )
  // console.timeEnd('subdivide edges');

  // console.time('connect vertices');
  const result = connectEdges(sortedEvents, operation)
  // console.timeEnd('connect vertices');

  return result
}

const union = (subject, clipping) =>
  booleanOp(subject, clipping, operations.UNION)

const difference = (subject, clipping) =>
  booleanOp(subject, clipping, operations.DIFFERENCE)

const xor = (subject, clipping) => booleanOp(subject, clipping, operations.XOR)

const intersection = (subject, clipping) =>
  booleanOp(subject, clipping, operations.INTERSECTION)

module.exports = { union, difference, xor, intersection }

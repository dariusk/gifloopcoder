/**
 * Include all default shapes
 * @type {{draw}|*}
 */
var circle          = require('./shapes/circle')();
var heart           = require('./shapes/heart')();
var arrow           = require('./shapes/arrow')();
var arcSegment      = require('./shapes/arcSegment')();
var bezierCurve     = require('./shapes/beziercurve')();
var bezierSegment   = require('./shapes/beziersegment')();
var cube            = require('./shapes/cube')();
var curve           = require('./shapes/curve')();
var curveSegment    = require('./shapes/curvesegment')();
var gear            = require('./shapes/gear')();
var line            = require('./shapes/line')();
var oval            = require('./shapes/oval')();
var path            = require('./shapes/path')();
var poly            = require('./shapes/poly')();
var raySegment      = require('./shapes/raysegment')();
var rect            = require('./shapes/rect')();
var segment         = require('./shapes/segment')();
var spiral          = require('./shapes/spiral')();
var star            = require('./shapes/star')();
var text            = require('./shapes/text')();

module.exports = {
  circle : circle,
  arrow : arrow,
  arcSegment: arcSegment,
  bezierCurve : bezierCurve,
  bezierSegment : bezierSegment,
  cube : cube,
  curve : curve,
  curveSegment : curveSegment,
  gear : gear,
  line : line,
  oval : oval,
  path: path,
  poly : poly,
  raySegment : raySegment,
  rect : rect,
  segment : segment,
  spiral : spiral,
  star : star,
  text : text,
  heart : heart
};

var Shape = require('./shape');
var Canvas = require('canvas')
, Image = Canvas.Image
, canvasGlobal = new Canvas(200, 200)
, context = canvasGlobal.getContext('2d');
var fs = require('fs');

module.exports = function(){
  var shape = new Shape();

  var canvas = null,
    context = null,
    width = 0,
    height = 0,
    list = [],
    styles = null;

  function init(w, h, stylesValue, interpolation) {
    canvas = canvasGlobal;
    width = canvas.width = w;
    height = canvas.height = h;
    context = canvas.getContext("2d");
    styles = stylesValue;
    shape.styles = styles;
    shape.interpolation = interpolation;
  }

  function size(w, h) {
    width = canvas.width = w;
    height = canvas.height = h;
  }

  function addShape(newShape, props) {
    var item = shape.create(newShape, props);
    list.push(item);
    render(0);
  }

  function clear() {
    list.length = 0;
  }

  function render(t, encoder) {
    if(styles.backgroundColor === "transparent") {
      context.clearRect(0, 0, width, height);
    }
    else {
      context.fillStyle = styles.backgroundColor;
      context.fillRect(0, 0, width, height);
    }
    for(var i = 0; i < list.length; i++) {
      list[i].render(context, t);
    }
    console.log('rendered!', Math.round(t*60));
    /*
    var data = canvas.toDataURL().replace(/^data:image\/\w+;base64,/, '');
    var buf = new Buffer(data, 'base64');
    fs.writeFile(`image-${Math.round(t*60)}.png`, buf);
    */
    if (encoder && t > 0) encoder.addFrame(context);

  }

  function getCanvas() {
    return canvas;
  }

  function getContext() {
    return context;
  }

  return {
    init: init,
    size: size,
    getCanvas: getCanvas,
    getContext: getContext,
    addShape: addShape,
    clear: clear,
    render: render
  };
};

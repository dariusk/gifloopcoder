var Model = require('./model');
var RenderList = require('./renderList');

var colorLib = require('./libs/color')();
var shapeList = require('./shapeList');

var GIFEncoder = require('gifencoder');
var fs = require('fs');
var encoder = new GIFEncoder(400, 400);
encoder.createReadStream().pipe(fs.createWriteStream('myanimated.gif'));
encoder.start();
encoder.setRepeat(0);   // 0 for repeat, -1 for no-repeat
encoder.setDelay(5);  // frame delay in ms
encoder.setQuality(1); // image quality. 10 is default.


module.exports = function(canvasWrapper, renderCallback, completeCallback){
  var model = new Model();
  var renderList = new RenderList();

  function onRender(t) {
    if (typeof renderCallback === 'function'){
      renderCallback();
    }
    renderList.render(t, encoder);
  }

  function onComplete() {
    if (typeof completeCallback === 'function'){
      completeCallback();
    }
    encoder.finish();
    console.log('done!');
  }

  // Initialize render list
  renderList.init(model.w, model.h, model.styles, model.interpolation);

  // Add all shapes from the shape list
  for (var key in shapeList) {
    if (shapeList.hasOwnProperty(key)) {
      var shapeName = key;
      renderList['add' + shapeName[0].toUpperCase() + shapeName.slice(1)] = (function(shapeName, shapeList){
        return function(props){
          renderList.addShape(shapeList[shapeName], props, encoder);
        }
      })(shapeName, shapeList);
    }
  }

  // Initialize scheduler
  model.scheduler.init(onRender, onComplete);
  var canvasEl = canvasWrapper;

  return {
    w: model.w,
    h: model.h,
    model : model,
    renderList: renderList,
    size: function(width, height) {
      this.w = model.w = width;
      this.h = model.h = height;
      renderList.size(model.w, model.h);
    },
    styles : model.styles,
    playOnce: function(){
      return model.playOnce();
    },
    loop: function() {
      return model.loop();
    },
    getDuration : function(){
      return model.getDuration();
    },
    setFPS: function(value){
      model.setFPS(value);
    },
    setDuration: function(value) {
      model.setDuration(value);
    },
    setMode: function(value) {
      model.interpolation.mode = value;
    },
    setEasing: function (value) {
      model.interpolation.easing = value;
    },
    setMaxColors: function(value) {
      model.maxColors = value;
    },
    color: colorLib,
    canvasEl : canvasEl
  };
};

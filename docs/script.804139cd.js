// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"WVwn":[function(require,module,exports) {
/*
	The code here was taken from https://github.com/cbrandolino/camvas and modified to suit the needs of our project
*/

/*
Copyright (c) 2012 Claudio Brandolino

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
// The function takes a canvas context and a `drawFunc` function.
// `drawFunc` receives two parameters, the video and the time since
// the last time it was called.
camvas = function camvas(ctx, callback) {
  var self = this;
  this.ctx = ctx;
  this.callback = callback; // We can't `new Video()` yet, so we'll resort to the vintage
  // "hidden div" hack for dynamic loading.

  var streamContainer = document.createElement('div');
  this.video = document.createElement('video'); // If we don't do this, the stream will not be played.
  // By the way, the play and pause controls work as usual 
  // for streamed videos.

  this.video.setAttribute('autoplay', '1');
  this.video.setAttribute('playsinline', '1'); // The video should fill out all of the canvas

  this.video.setAttribute('width', 1);
  this.video.setAttribute('height', 1);
  streamContainer.appendChild(this.video);
  document.body.appendChild(streamContainer); // The callback happens when we are starting to stream the video.

  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
  }).then(function (stream) {
    // Yay, now our webcam input is treated as a normal video and
    // we can start having fun
    self.video.srcObject = stream; // Let's start drawing the canvas!

    self.update();
  }, function (err) {
    throw err;
  }); // As soon as we can draw a new frame on the canvas, we call the `draw` function 
  // we passed as a parameter.

  this.update = function () {
    var self = this;
    var last = Date.now();

    var loop = function loop() {
      // For some effects, you might want to know how much time is passed
      // since the last frame; that's why we pass along a Delta time `dt`
      // variable (expressed in milliseconds)
      var dt = Date.now - last;
      self.callback(self.video, dt);
      last = Date.now();
      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);
  };
};
},{}],"sGue":[function(require,module,exports) {
/* This library is released under the MIT license, see https://github.com/tehnokv/picojs */
pico = {};

pico.unpack_cascade = function (bytes) {
  //
  var dview = new DataView(new ArrayBuffer(4));
  /*
  	we skip the first 8 bytes of the cascade file
  	(cascade version number and some data used during the learning process)
  */

  var p = 8;
  /*
  	read the depth (size) of each tree first: a 32-bit signed integer
  */

  dview.setUint8(0, bytes[p + 0]), dview.setUint8(1, bytes[p + 1]), dview.setUint8(2, bytes[p + 2]), dview.setUint8(3, bytes[p + 3]);
  var tdepth = dview.getInt32(0, true);
  p = p + 4;
  /*
  	next, read the number of trees in the cascade: another 32-bit signed integer
  */

  dview.setUint8(0, bytes[p + 0]), dview.setUint8(1, bytes[p + 1]), dview.setUint8(2, bytes[p + 2]), dview.setUint8(3, bytes[p + 3]);
  var ntrees = dview.getInt32(0, true);
  p = p + 4;
  /*
  	read the actual trees and cascade thresholds
  */

  var tcodes_ls = [];
  var tpreds_ls = [];
  var thresh_ls = [];

  for (var t = 0; t < ntrees; ++t) {
    // read the binary tests placed in internal tree nodes
    Array.prototype.push.apply(tcodes_ls, [0, 0, 0, 0]);
    Array.prototype.push.apply(tcodes_ls, bytes.slice(p, p + 4 * Math.pow(2, tdepth) - 4));
    p = p + 4 * Math.pow(2, tdepth) - 4; // read the prediction in the leaf nodes of the tree

    for (var _i = 0; _i < Math.pow(2, tdepth); ++_i) {
      dview.setUint8(0, bytes[p + 0]), dview.setUint8(1, bytes[p + 1]), dview.setUint8(2, bytes[p + 2]), dview.setUint8(3, bytes[p + 3]);
      tpreds_ls.push(dview.getFloat32(0, true));
      p = p + 4;
    } // read the threshold


    dview.setUint8(0, bytes[p + 0]), dview.setUint8(1, bytes[p + 1]), dview.setUint8(2, bytes[p + 2]), dview.setUint8(3, bytes[p + 3]);
    thresh_ls.push(dview.getFloat32(0, true));
    p = p + 4;
  }

  var tcodes = new Int8Array(tcodes_ls);
  var tpreds = new Float32Array(tpreds_ls);
  var thresh = new Float32Array(thresh_ls);
  /*
  	construct the classification function from the read data
  */

  function classify_region(r, c, s, pixels, ldim) {
    r = 256 * r;
    c = 256 * c;
    var root = 0;
    var o = 0.0;
    var pow2tdepth = Math.pow(2, tdepth) >> 0; // '>>0' transforms this number to int

    for (var _i2 = 0; _i2 < ntrees; ++_i2) {
      idx = 1;

      for (var j = 0; j < tdepth; ++j) {
        // we use '>> 8' here to perform an integer division: this seems important for performance
        idx = 2 * idx + (pixels[(r + tcodes[root + 4 * idx + 0] * s >> 8) * ldim + (c + tcodes[root + 4 * idx + 1] * s >> 8)] <= pixels[(r + tcodes[root + 4 * idx + 2] * s >> 8) * ldim + (c + tcodes[root + 4 * idx + 3] * s >> 8)]);
      }

      o = o + tpreds[pow2tdepth * _i2 + idx - pow2tdepth];
      if (o <= thresh[_i2]) return -1;
      root += 4 * pow2tdepth;
    }

    return o - thresh[ntrees - 1];
  }
  /*
  	we're done
  */


  return classify_region;
};

pico.run_cascade = function (image, classify_region, params) {
  var pixels = image.pixels;
  var nrows = image.nrows;
  var ncols = image.ncols;
  var ldim = image.ldim;
  var shiftfactor = params.shiftfactor;
  var minsize = params.minsize;
  var maxsize = params.maxsize;
  var scalefactor = params.scalefactor;
  var scale = minsize;
  var detections = [];

  while (scale <= maxsize) {
    var step = Math.max(shiftfactor * scale, 1) >> 0; // '>>0' transforms this number to int

    var offset = scale / 2 + 1 >> 0;

    for (var r = offset; r <= nrows - offset; r += step) {
      for (var c = offset; c <= ncols - offset; c += step) {
        var q = classify_region(r, c, scale, pixels, ldim);
        if (q > 0.0) detections.push([r, c, scale, q]);
      }
    }

    scale = scale * scalefactor;
  }

  return detections;
};

pico.cluster_detections = function (dets, iouthreshold) {
  /*
  	sort detections by their score
  */
  dets = dets.sort(function (a, b) {
    return b[3] - a[3];
  });
  /*
  	this helper function calculates the intersection over union for two detections
  */

  function calculate_iou(det1, det2) {
    // unpack the position and size of each detection
    var r1 = det1[0],
        c1 = det1[1],
        s1 = det1[2];
    var r2 = det2[0],
        c2 = det2[1],
        s2 = det2[2]; // calculate detection overlap in each dimension

    var overr = Math.max(0, Math.min(r1 + s1 / 2, r2 + s2 / 2) - Math.max(r1 - s1 / 2, r2 - s2 / 2));
    var overc = Math.max(0, Math.min(c1 + s1 / 2, c2 + s2 / 2) - Math.max(c1 - s1 / 2, c2 - s2 / 2)); // calculate and return IoU

    return overr * overc / (s1 * s1 + s2 * s2 - overr * overc);
  }
  /*
  	do clustering through non-maximum suppression
  */


  var assignments = new Array(dets.length).fill(0);
  var clusters = [];

  for (var _i3 = 0; _i3 < dets.length; ++_i3) {
    // is this detection assigned to a cluster?
    if (assignments[_i3] == 0) {
      // it is not:
      // now we make a cluster out of it and see whether some other detections belong to it
      var r = 0.0,
          c = 0.0,
          s = 0.0,
          q = 0.0,
          n = 0;

      for (var j = _i3; j < dets.length; ++j) {
        if (calculate_iou(dets[_i3], dets[j]) > iouthreshold) {
          assignments[j] = 1;
          r = r + dets[j][0];
          c = c + dets[j][1];
          s = s + dets[j][2];
          q = q + dets[j][3];
          n = n + 1;
        }
      } // make a cluster representative


      clusters.push([r / n, c / n, s / n, q]);
    }
  }

  return clusters;
};

pico.instantiate_detection_memory = function (size) {
  /*
  	initialize a circular buffer of `size` elements
  */
  var n = 0;
  var memory = [];

  for (var _i4 = 0; _i4 < size; ++_i4) {
    memory.push([]);
  }
  /*
  	build a function that:
  	(1) inserts the current frame's detections into the buffer;
  	(2) merges all detections from the last `size` frames and returns them
  */


  function update_memory(dets) {
    memory[n] = dets;
    n = (n + 1) % memory.length;
    dets = [];

    for (i = 0; i < memory.length; ++i) {
      dets = dets.concat(memory[i]);
    } //


    return dets;
  }
  /*
  	we're done
  */


  return update_memory;
};
},{}],"MZhh":[function(require,module,exports) {
var global = arguments[3];
"use strict";

require("./camvas.js");

require("./pico.js");

var initialized = false;
pico = global.pico;
camvas = global.camvas;

function button_callback() {
  /*
  	(0) check whether we're already running face detection
  */
  if (initialized) return; // if yes, then do not initialize everything again

  /*
  	(1) prepare the pico.js face detector
  */

  var update_memory = pico.instantiate_detection_memory(5); // we will use the detecions of the last 5 frames

  var facefinder_classify_region = function facefinder_classify_region(r, c, s, pixels, ldim) {
    return -1.0;
  };

  var cascadeurl = 'https://raw.githubusercontent.com/nenadmarkus/pico/c2e81f9d23cc11d1a612fd21e4f9de0921a5d0d9/rnt/cascades/facefinder';
  fetch(cascadeurl).then(function (response) {
    response.arrayBuffer().then(function (buffer) {
      var bytes = new Int8Array(buffer);
      facefinder_classify_region = pico.unpack_cascade(bytes);
      console.log('* cascade loaded');
    });
  });
  /*
  	(2) get the drawing context on the canvas and define a function to transform an RGBA image to grayscale
  */

  var ctx = document.getElementsByTagName('canvas')[0].getContext('2d');

  function rgba_to_grayscale(rgba, nrows, ncols) {
    var gray = new Uint8Array(nrows * ncols);

    for (var r = 0; r < nrows; ++r) {
      for (var c = 0; c < ncols; ++c) {
        // gray = 0.2*red + 0.7*green + 0.1*blue
        gray[r * ncols + c] = (2 * rgba[r * 4 * ncols + 4 * c + 0] + 7 * rgba[r * 4 * ncols + 4 * c + 1] + 1 * rgba[r * 4 * ncols + 4 * c + 2]) / 10;
      }
    }

    return gray;
  }
  /*
  	(3) this function is called each time a video frame becomes available
  */


  var processfn = function processfn(video, dt) {
    // render the video frame to the canvas element and extract RGBA pixel data
    ctx.drawImage(video, 0, 0);
    var rgba = ctx.getImageData(0, 0, 640, 480).data; // prepare input to `run_cascade`

    image = {
      "pixels": rgba_to_grayscale(rgba, 480, 640),
      "nrows": 480,
      "ncols": 640,
      "ldim": 640
    };
    params = {
      "shiftfactor": 0.1,
      // move the detection window by 10% of its size
      "minsize": 100,
      // minimum size of a face
      "maxsize": 1000,
      // maximum size of a face
      "scalefactor": 1.1 // for multiscale processing: resize the detection window by 10% when moving to the higher scale

    }; // run the cascade over the frame and cluster the obtained detections
    // dets is an array that contains (r, c, s, q) quadruplets
    // (representing row, column, scale and detection score)

    dets = pico.run_cascade(image, facefinder_classify_region, params);
    dets = update_memory(dets);
    dets = pico.cluster_detections(dets, 0.2); // set IoU threshold to 0.2
    // draw detections

    for (i = 0; i < dets.length; ++i) {
      // check the detection score
      // if it's above the threshold, draw it
      // (the constant 50.0 is empirical: other cascades might require a different one)
      if (dets[i][3] > 50.0) {
        ctx.beginPath();
        ctx.arc(dets[i][1], dets[i][0], dets[i][2] / 2, 0, 2 * Math.PI, false);
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'red';
        ctx.stroke();
      }
    }
  };
  /*
  	(4) instantiate camera handling (see https://github.com/cbrandolino/camvas)
  */


  var mycamvas = camvas(ctx, processfn);
  /*
  	(5) it seems that everything went well
  */

  initialized = true;
}

setTimeout(button_callback, 1000);
},{"./camvas.js":"WVwn","./pico.js":"sGue"}]},{},["MZhh"], "global")
//# sourceMappingURL=script.804139cd.js.map
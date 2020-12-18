import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css' // Import precompiled Bootstrap css

import './camvas'
camvas = global.camvas

import './pico'
pico = global.pico


var initialized = false;
var currentState = 0;
var left = null
var right = null

function setState(state) {

    if (state == 0) {
        left.style.backgroundColor = "black";
        right.style.backgroundColor = "black";
    } else if (state == 1) {
        left.style.backgroundColor = "white";
        right.style.backgroundColor = "black";
	} else if (state == 2) {
        left.style.backgroundColor = "black";
        right.style.backgroundColor = "white";
    } else {
        console.log("Error")
    }

    return state
}

function onLoad() {
	/*
		(0) check whether we're already running face detection
	*/
	if(initialized)
		return; // if yes, then do not initialize everything again
	/*
		(1) prepare the pico.js face detector
	*/
	var update_memory = pico.instantiate_detection_memory(5); // we will use the detecions of the last 5 frames
	var facefinder_classify_region = function(r, c, s, pixels, ldim) {return -1.0;};
	var cascadeurl = 'https://raw.githubusercontent.com/nenadmarkus/pico/c2e81f9d23cc11d1a612fd21e4f9de0921a5d0d9/rnt/cascades/facefinder';
	fetch(cascadeurl).then(function(response) {
		response.arrayBuffer().then(function(buffer) {
			var bytes = new Int8Array(buffer);
			facefinder_classify_region = pico.unpack_cascade(bytes);
			console.log('* cascade loaded');
		})
	})
	/*
		(2) get the drawing context on the canvas and define a function to transform an RGBA image to grayscale
	*/
	var ctx = document.getElementById('canvas').getContext('2d');
	function rgba_to_grayscale(rgba, nrows, ncols) {
		var gray = new Uint8Array(nrows*ncols);
		for(var r=0; r<nrows; ++r)
			for(var c=0; c<ncols; ++c)
				// gray = 0.2*red + 0.7*green + 0.1*blue
				gray[r*ncols + c] = (2*rgba[r*4*ncols+4*c+0]+7*rgba[r*4*ncols+4*c+1]+1*rgba[r*4*ncols+4*c+2])/10;
		return gray;
	}
	/*
		(3) this function is called each time a video frame becomes available
	*/
	var processfn = function(video, dt) {
		// render the video frame to the canvas element and extract RGBA pixel data
		ctx.drawImage(video, 0, 0);
		var rgba = ctx.getImageData(0, 0, 640, 480).data;
		// prepare input to `run_cascade`
		image = {
			"pixels": rgba_to_grayscale(rgba, 480, 640),
			"nrows": 480,
			"ncols": 640,
			"ldim": 640
		}
		params = {
			"shiftfactor": 0.1, // move the detection window by 10% of its size
			"minsize": 100,     // minimum size of a face
			"maxsize": 1000,    // maximum size of a face
			"scalefactor": 1.1  // for multiscale processing: resize the detection window by 10% when moving to the higher scale
		}
		// run the cascade over the frame and cluster the obtained detections
		// dets is an array that contains (r, c, s, q) quadruplets
		// (representing row, column, scale and detection score)
		dets = pico.run_cascade(image, facefinder_classify_region, params);
		dets = update_memory(dets);
		dets = pico.cluster_detections(dets, 0.2); // set IoU threshold to 0.2

		currentState = 0

		// draw detections
		for(i=0; i<dets.length; ++i) {
			// check the detection score
			// if it's above the threshold, draw it
			// (the constant 50.0 is empirical: other cascades might require a different one)
			if(dets[i][3]>50.0)
			{

				centerX = 640/2
				margin = 40
				currentX = dets[i][1]
				currentY = dets[i][0]

				ctx.beginPath();
				ctx.arc(currentX, currentY, 10, 0, 2*Math.PI, false);
				ctx.fillStyle = 'red';
				ctx.fill();

				ctx.moveTo(centerX-margin, 0);
				ctx.lineTo(centerX-margin, 480);
				ctx.lineWidth = 3;
				ctx.strokeStyle = 'red';
				ctx.stroke();

				ctx.moveTo(centerX+margin, 0);
				ctx.lineTo(centerX+margin, 480);
				ctx.lineWidth = 3;
				ctx.strokeStyle = 'red';
				ctx.stroke();

				if (currentX > (centerX + margin)) {
					currentState = 2
				} else if (currentX < (centerX - margin)) {
					currentState = 1
				} else {
					currentState = 0
				}

				break
			}
		}

		setState(currentState)
	}
	/*
		(4) instantiate camera handling (see https://github.com/cbrandolino/camvas)
	*/
	var mycamvas = new camvas(ctx, processfn);
	/*
		(5) it seems that everything went well
	*/
	initialized = true;
}


window.addEventListener('load', function () {

	left = document.getElementById('left')
	right = document.getElementById('right')
	
	onLoad()

})


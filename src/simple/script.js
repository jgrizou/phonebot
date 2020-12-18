import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css' // Import precompiled Bootstrap css


var currentState = 0;

function setState(state) {

    var left = document.getElementById('left')
    var right = document.getElementById('right')


    if (state == 0) {
        left.style.backgroundColor = "black";
        right.style.backgroundColor = "black";
        state = 1
    } else if (state == 1) {
        left.style.backgroundColor = "white";
        right.style.backgroundColor = "black";
        state = 0
    } else {
        console.log("Error")
    }

    return state
  }

window.addEventListener('load', function () {

    window.setInterval(function(){
        currentState = setState(currentState)
      }, 1000);

})


const PWMA = D15;
const AIN2 = D16;
const AIN1 = D17;
const STBY = D18;
const BIN1 = D19;
const BIN2 = D20;
const PWMB = D22;

digitalWrite(STBY, true);

var speed = 0.5;

function stop() {
  analogWrite(PWMA, 0);
  analogWrite(PWMB, 0); 
}

function backward() {
  digitalWrite(BIN1, false);
  digitalWrite(BIN2, true); 

  digitalWrite(AIN1, false);
  digitalWrite(AIN2, true); 

  analogWrite(PWMA, speed);
  analogWrite(PWMB, speed); 
}


function forward() {
  digitalWrite(BIN1, true);
  digitalWrite(BIN2, false); 

  digitalWrite(AIN1, true);
  digitalWrite(AIN2, false); 

  analogWrite(PWMA, speed);
  analogWrite(PWMB, speed); 
}


function left() {
  digitalWrite(BIN1, false);
  digitalWrite(BIN2, true); 

  digitalWrite(AIN1, true);
  digitalWrite(AIN2, false); 

  analogWrite(PWMA, speed);
  analogWrite(PWMB, speed); 
}


function right() {
  digitalWrite(BIN1, true);
  digitalWrite(BIN2, false); 

  digitalWrite(AIN1, false);
  digitalWrite(AIN2, true); 

  analogWrite(PWMA, speed);
  analogWrite(PWMB, speed); 
}

//function add(x, y) {
//  return {'result': x + y} ;
//}


// setInterval(function() {console.log({'value': true});}, 500);

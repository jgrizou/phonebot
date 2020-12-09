#include <SimpleKalmanFilter.h>


SimpleKalmanFilter simpleKalmanFilterLeft(2, 2, 0.01);
SimpleKalmanFilter simpleKalmanFilterRight(2, 2, 0.01);


#define PWMA 9
#define AIN2 8
#define AIN1 7
#define STBY 6
#define BIN1 5
#define BIN2 4
#define PWMB 3

#define SENSORRIGHT A0
#define SENSORLEFT A1

int valLeft = 0; 
int valRight = 0;

float estLeft = 0.0;
float estRight = 0.0;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);           // set up Serial library at 9600 bps
  Serial.println("Hello world!");

  
  pinMode(PWMA, OUTPUT);
  pinMode(AIN2, OUTPUT);
  pinMode(AIN1, OUTPUT);
  pinMode(STBY, OUTPUT);
  pinMode(BIN1, OUTPUT);
  pinMode(BIN2, OUTPUT);
  pinMode(PWMB, OUTPUT);

  pinMode(SENSORRIGHT, INPUT);
  pinMode(SENSORLEFT, INPUT);
  
  pinMode(LED_BUILTIN, OUTPUT);

   
  digitalWrite(AIN1, HIGH);
  digitalWrite(AIN2, LOW);  
  
  digitalWrite(BIN1, HIGH);  
  digitalWrite(BIN2, LOW);

  digitalWrite(STBY, HIGH); 
}

void loop() {

  valLeft = analogRead(SENSORLEFT);
  valRight = analogRead(SENSORRIGHT);

  estLeft = simpleKalmanFilterLeft.updateEstimate(valLeft);
  estRight = simpleKalmanFilterRight.updateEstimate(valRight);
  
  
//  Serial.print(valLeft);
//  Serial.print(" - ");  
//  Serial.print(estLeft);
//  Serial.print(" :: ");    
//  Serial.print(valRight);  
//  Serial.print(" - ");  
//  Serial.print(estRight);
//  Serial.println();  

  if (estRight > 20) {
    digitalWrite(BIN1, LOW);
    digitalWrite(BIN2, HIGH); 
  } else {
    digitalWrite(BIN1, HIGH);
    digitalWrite(BIN2, LOW); 
  }

  if (estLeft > 20) {
    digitalWrite(AIN1, HIGH);
    digitalWrite(AIN2, LOW); 
  } else {
    digitalWrite(AIN1, LOW);
    digitalWrite(AIN2, HIGH); 
  }
  
  analogWrite(PWMA, 200);  // max 255
  analogWrite(PWMB, 200);  // max 255

//  digitalWrite(LED_BUILTIN, HIGH);
//  delay(10); 


//  digitalWrite(AIN1, LOW);
//  digitalWrite(AIN2, HIGH);  
//  
//  digitalWrite(BIN1, HIGH);  
//  digitalWrite(BIN2, LOW);
//  
//  analogWrite(PWMA, 900);
//  analogWrite(PWMB, 900);
//
//  digitalWrite(LED_BUILTIN, LOW); 
//  delay(500); 
//

}

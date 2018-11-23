//Define the Calc constructor method 
function Calc(firstNumber, secondNumber) {
    //Define the two properties 
    this.firstNumber = firstNumber;
    this.secondNumber = secondNumber;
    //Define your add method that will return the result of adding two properties.
    this.add() = function() {
        return this.firstNumber + this.secondNumber;
    };
}

//Assign variables to an instance of Calc with 5 and 10, and also numbers switched around. 
const numberToAdd = new Calc(5, 10);
const numberToAddReversed = new Calc(10, 5);


//Group your add test
describe('Check if the add method works as inteded', () => {
  test('Check is 5 + 10 is falsey', () => {
      expect(numberToAdd.add() === 50).toBeFalsy();
  });
  test('Check is 5 + 10 is truthy', () => {
      expect(numberToAdd.add() === 15).toBeTruthy();
  });
  test('Check if numbers switched around is truthy', () => {
      expect(numberToAddReversed.add()).toEqual(15);
  });
})

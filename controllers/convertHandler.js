function numberStringSplitter(input) {
  //this is a helper function that takes a string input and returns an array with the number and the string separated
  let number = input.match(/[.\d\/]+/g) || ['1'];
  let string = input.match(/[a-zA-Z]+/g)[0];

  return [number[0], string];
)

function checkDiv(possibleFraction){
  //this is a helper function
  let nums = possibleFraction.split('/');
  if (nums.length > 2){
    return false;
  }
  return nums;
}

function ConvertHandler() {
  
  this.getNum = function(input) {
    let result = numberStringSplitter(input)[0];
    let nums = checkDiv(result);
    if (!nums){
      return undefined;
    }

    let num1 = nums[0];
    let num2 = nums[1] || "1";
    result = parseFloat(num1) / parseFloat(num2);
    if (isNaN(num1) || isNaN(num2)){
      return undefined;
    }
    return result;
  };
  
  this.getUnit = function(input) {
    let result = numberStringSplitter(input)[1].toLowerCase();
    switch(result){
      case "gal":
        return "gal";
      case "l":
        return "L";
      case "lbs":
        return "lbs";
      case "kg":
        return "kg";
      case "mi":
        return "mi";
      case "km":
        return "km";
      default:
        return undefined;
    }
    
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result = initUnit.toLowerCase();
    
    switch(result){
      case "gal":
        return "L";
      case "l":
        return "gal";
      case "lbs":
        return "kg";
      case "kg":
        return "lbs";
      case "mi":
        return "km";
      case "km":
        return "mi";
      default:
        return undefined;
    }

    return result;
  };

  this.spellOutUnit = function(unit) {
    let result = unit.toLowerCase();
    
    switch(result){
      case "gal":
        return "gallons";
      case "l":
        return "liters";
      case "lbs":
        return "pounds";
      case "kg":
        return "kilograms";
      case "mi":
        return "miles";
      case "km":
        return "kilometers";
      default:
        return undefined;
    }
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    let unit = initUnit.toLowerCase();
    let result;

    switch (unit){
      case "gal":
        result = initNum * galToL;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      default:
        result = undefined;
    }
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;

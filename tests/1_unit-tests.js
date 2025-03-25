const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    suite("Function convertHandler.getNum(input)", function(){
        test("Whole number input", function(done){
            assert.equal(convertHandler.getNum("32L"), 32);
            done();
        });
        test("Decimal number input", function(done){
            assert.equal(convertHandler.getNum("32.2L"), 32.2);
            done();
        });
        test("Fractional input", function(done){
            assert.equal(convertHandler.getNum("32/3L"), 32/3);
            done();
        });
        test("Fractional input with decimal", function(done){
            assert.equal(convertHandler.getNum("9/3.3L"), 9/3.3);
            done();
        });
        test("Invalid Input (Double fraction)", function(done){
            assert.equal(convertHandler.getNum("32/3/3L"), undefined);
            done();
        });
        test("No numerical input", function(done){
            assert.equal(convertHandler.getNum("L"), 1);
            done();
        });
    });

    suite("Function convertHandler.getUnit(input)", function(){
        test("For each valid unit inputs", function(done){
            let validInputs = ['gal', 'L', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
            let validOutputs = ['gal', 'L', 'mi', 'km', 'lbs', 'kg', 'gal', 'L', 'mi', 'km', 'lbs', 'kg'];
            validInputs.forEach(function(ele, index){
                assert.equal(convertHandler.getUnit(ele), validOutputs[index]);
            });
            done();
        });
        test("Unknown unit input", function(done){
            assert.equal(convertHandler.getUnit("34kilograms"), undefined);
            done();
        });
    });

    suite("Function convertHandler.getReturnUnit(initUnit)", function(){
        test("For each valid unit inputs", function(done){
            let validInputs = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
            let expectedOutputs = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
            validInputs.forEach(function(ele, i){
                assert.equal(convertHandler.getReturnUnit(ele), expectedOutputs[i]);
            });
            done();
        });
    });

    suite("Function convertHandler.spellOutUnit(unit)", function(){
        test("For each valid unit inputs", function(done){
            let validInputs = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
            let expectedOutputs = ['gallons', 'liters', 'miles', 'kilometers', 'pounds', 'kilograms'];
            validInputs.forEach(function(ele, i){
                assert.equal(convertHandler.spellOutUnit(ele), expectedOutputs[i]);
            });
            done();
        });
    });

    suite("Function convertHandler.convert(num, unit)", function(){
        test("Gal to L", function(done){
            let input = [5, 'gal'];
            let expected = 18.9271;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
            done();
        });
        test("L to Gal", function(done){
            let input = [5, 'l'];
            let expected = 1.32086;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
            done();
        });
        test("Mi to Km", function(done){
            let input = [5, 'mi'];
            let expected = 8.04672;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
            done();
        });
        test("Km to Mi", function(done){
            let input = [5, 'km'];
            let expected = 3.10686;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
            done();
        });
        test("Lbs to Kg", function(done){
            let input = [5, 'lbs'];
            let expected = 2.26796;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
            done();
        });
        test("Kg to Lbs", function(done){
            let input = [5, 'kg'];
            let expected = 11.02312;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
            done();
        });
    });
});
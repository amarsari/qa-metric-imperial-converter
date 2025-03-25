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
            assert.equal(convertHandler.getNum("3.2L"), 3.2);
            done();
        });
        test("Fractional input", function(done){
            assert.equal(convertHandler.getNum("32/3L"), 32/3);
            done();
        });
        test("Fractional input with decimal", function(done){
            assert.equal(convertHandler.getNum("3.2/2L"), 1.6);
            done();
        });
        test("No numerical input", function(done){
            assert.equal(convertHandler.getNum("L"), 1);
            done();
        });
    });

    suite("Function convertHandler.getUnit(input)", function(){
        test("For each valid unit inputs", function(done){
            let validInputs = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
            validInputs.forEach(function(ele){
                assert.equal(convertHandler.getUnit("3.2" + ele), ele);
            });
            done();
        });
        test("Unknown unit input", function(done){
            assert.equal(convertHandler.getUnit("3.2g"), "invalid unit");
            done();
        });
    });

    suite("Function convertHandler.getReturnUnit(initUnit)", function(){
        test("For each valid unit inputs", function(done){
            let validInputs = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
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
            assert.equal(convertHandler.convert(3.78541, 'gal'), 1);
            done();
        });
        test("L to Gal", function(done){
            assert.equal(convertHandler.convert(1, 'L'), 3.78541);
            done();
        });
        test("Mi to Km", function(done){
            assert.equal(convertHandler.convert(1, 'mi'), 1.60934);
            done();
        });
        test("Km to Mi", function(done){
            assert.equal(convertHandler.convert(1, 'km'), 0.62137);
            done();
        });
        test("Lbs to Kg", function(done){
            assert.equal(convertHandler.convert(1, 'lbs'), 0.45359);
            done();
        });
        test("Kg to Lbs", function(done){
            assert.equal(convertHandler.convert(1, 'kg'), 2.20462);
            done();
        });
    });
});
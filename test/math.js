var expect = require('chai').expect;
var math = require('../api/math');

describe("Math function tests", function () {
    describe("Testing fromInfixToPostfix", function () {
        it("Given infix is successfully transformed to postfix", function () {
            var postfix = math.fromInfixToPostfix("5 + 3 * 6 - ( 5 / 3 ) + 7");
            expect(postfix).to.equal("5 3 6 * + 5 3 / - 7 + ");
        });
    });

    describe("Testing solvePostfix", function () {
        it("returns correct answer with given postfix", function () {
            var result = math.solvePostfix("5 3 6 * + 5 3 / - 7 + ");
            expect(result).to.equal(28.333333333333332);
        });
        it("returns error when the given postfix is invalid", function () {
            expect(math.solvePostfix.bind(math, '5 3 6 * + 5 3 / - 7 + - ')).
            to.throw('Given input was invalid: 5 3 6 * + 5 3 / - 7 + - ');
            expect(math.solvePostfix.bind(math, '5 3 6 * + 3 / - 7 + -')).
            to.throw('Given input was invalid: 5 3 6 * + 3 / - 7 + -');
        });
    });

});

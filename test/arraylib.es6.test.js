/**
 * Created by maksim.bulakhau on 4/6/2017.
 *
 *Unit tests for ArrayLibrary via jasmine
 */

import ArrayLibrary from "../js/arraylib.es6.js";

var testArray;

describe("ArrayLibrary tests", function() {

    beforeEach(function(){
       testArray  = [1,2,3,4,5,6,7,8];
    });

    describe("Method take tests", function() {
        it("returns {1,2} on ({1,2,3,4..}, 2)", function(){
            expect(ArrayLibrary.take(testArray,2)).toEqual([1,2]);
        });

        it("returns {1,2,3,4} on ({1,2,3,4..}, 4)", function() {
            expect(ArrayLibrary.take(testArray,4)).toEqual([1,2,3,4]);
        });

        it("returns {1,2,3,4} on ({1,2,3,4..}, n > length)", function() {
            expect(ArrayLibrary.take(testArray,10)).toEqual(testArray);
        });

        it("returns elements except last mod(n) on n <= 0", function() {
            expect(ArrayLibrary.take([1,2,3,4], -3)).toEqual([1]);
        });
    });

    describe("Method skip tests", function() {
        it("returns {7,8} on (testArray,6)", function() {
            expect(ArrayLibrary.skip(testArray,6)).toEqual([7,8]);
        });

        it("returns {4,5,6,7,8} on (testArray,3)", function() {
            expect(ArrayLibrary.skip(testArray,3)).toEqual([4,5,6,7,8]);
        });

        it("returns {8} on (testArray,7)", function() {
            expect(ArrayLibrary.skip(testArray,7)).toEqual([8]);
        });

        it("goes round on n >= testArray.length", function() {
            expect(ArrayLibrary.skip(testArray,10)).toEqual([]);
        });

        it("returns {2,3,4,5,6,7,8} on (testArray,1)", function() {
            expect(ArrayLibrary.skip(testArray,1)).toEqual([2,3,4,5,6,7,8]);
        });

        it("returns skip(length-n) on n < 0", function() {
            expect(ArrayLibrary.skip(testArray,-2)).toEqual([7,8]);
        });

        it("returns same values array on n = 0", function() {
            expect(ArrayLibrary.skip(testArray,0)).toEqual(testArray);
        });
    });

    describe("Method map tests", function() {
        it("reduces each element by 1 if x=> x - 1", function() {
            expect(ArrayLibrary.map(testArray, function(x){ return x - 1;})).
            toEqual([0,1,2,3,4,5,6,7]);
        });

        it("squares each element if x => x*x", function() {
            expect(ArrayLibrary.map(testArray, function(x) { return x*x; })).
            toEqual([1,4,9,16,25,36,49,64]);
        });

        it("doesn't change original array", function() {
            var map = ArrayLibrary.map(testArray, Math.sqrt);

            expect(testArray).not.toEqual(map);
        });
    });

    describe("Method reduce tests", function() {
        it("returns sum of array elements if x,y => x + y ", function() {
            expect(ArrayLibrary.reduce(testArray, function(a, b) { return a + b; })).toBe(36);
        });

        it("returns concat for string array if x,y => x + y", function() {
            var initial = ["I ", "love ", "Minsk"];

            expect(ArrayLibrary.reduce(initial, function(a,b) { return a + b; })).
            toEqual("I love Minsk");
        });

        it("returns multiplication of array elements if x,y => x * y ", function() {
            expect(ArrayLibrary.reduce(testArray, function(a, b) { return a * b; })).toEqual(24*1680);
        });

        it("returns difference of array elements if x,y => x * y ", function() {
            expect(ArrayLibrary.reduce(testArray, function(a, b) { return a - b; })).toBe(-34);
        });

        it("still works on array with 1 or more elements", function() {
            var arr = [1,2];

            expect(ArrayLibrary.reduce(arr, function(a, b) { return a - b;})).toBe(-1);
        });

        it("still works on array with 1 element without initial value", function() {
            var arr = [1];

            expect(ArrayLibrary.reduce(arr, function(a, b) { return a - b;})).toBe(1);
        });

        it("still works on array with 1 element without initial value", function() {
            var arr = [1];

            expect(ArrayLibrary.reduce(arr, function(a, b) { return a * b;})).toBe(1);
        });

        it("works with initial value", function() {
            var arr = [1];

            expect(ArrayLibrary.reduce(arr, function(a, b) { return a - b;}, 10)).toBe(9);
        });

        it("successfully ignores undefined elements", function() {
            var arr = [1,,,2,3];

            expect(ArrayLibrary.reduce(arr, function(a, b) { return a + b;})).toBe(6);
        });
    });

    describe("Method foreach tests", function() {
        it("writes each element to string", function() {
            var actual = "", list = ["Hi", "Goodbye", "Не скучай"];

            var func = function(item, i, arr) {
                actual += i + ": " + item + " (array: " + arr + " )\n";
            };

            ArrayLibrary.foreach(list, func);
            var expected = "0: Hi (array: Hi,Goodbye,Не скучай )\n" +
                "1: Goodbye (array: Hi,Goodbye,Не скучай )\n" +
                "2: Не скучай (array: Hi,Goodbye,Не скучай )\n";
            expect(actual).toEqual(expected);
        });

        it("ignores missed elements", function() {
            var actual = "", list = ["Hi", , "Не скучай"];

            var func = function(item, i, arr) {
                actual += i + ": " + item + " (array: " + arr + " )\n";
            };

            ArrayLibrary.foreach(list, func);
            var expected = "0: Hi (array: Hi,,Не скучай )\n" +
                "2: Не скучай (array: Hi,,Не скучай )\n";
            expect(actual).toEqual(expected);
        });

        it("works if callback func arguments.length < 3", function() {
            var actual = "", list = ["Hi", "Goodbye", "Не скучай"];

            var func = function(item) {
                actual += item + "\n";
            };

            ArrayLibrary.foreach(list, func);
            var expected = "Hi\nGoodbye\nНе скучай\n";
            expect(actual).toEqual(expected);
        });
    });

    describe("Method filter tests", function() {
        it("doesn't change original array", function() {
            var moreThanFiveArr = ArrayLibrary.filter(testArray, function(number) { return number - 5 > 0; });

            expect(testArray).not.toEqual(moreThanFiveArr);
        });

        it("works in normal conditions, when func args.length < 3", function() {
            var moreThanFiveArr = ArrayLibrary.filter(testArray, function(number) { return number - 5 > 0; });

            expect(moreThanFiveArr).toEqual([6,7,8]);
        });

        it("works in normal conditions, when func args.length = 3", function() {
            var actualArr = ArrayLibrary.filter(testArray, function(number, i, arr) { return (number*i) in arr; });

            expect(actualArr).toEqual([1,2,3]);
        });
    });

    describe("Method chain tests", function() {
        it("works on single function take", function() {
            expect(ArrayLibrary.chain(testArray).take(5).value()).toEqual(ArrayLibrary.take(testArray,5));
        });

        it("works on single function skip", function() {
            expect(ArrayLibrary.chain(testArray).skip(5).value()).toEqual(ArrayLibrary.skip(testArray,5));
        });

        it("works on single function map", function() {
            expect(ArrayLibrary.chain(testArray).map(function(x) { return x * x; }).value())
                .toEqual(ArrayLibrary.map(testArray, function(x) { return x * x; }));
        });

        it("works on single function foreach", function() {
            var actual = "", list = ["Hi", "Goodbye", "Не скучай"];
            var func = function(item, i, arr) {
                actual += i + ": " + item + " (array: " + arr + " )\n";
            };

            expect(ArrayLibrary.foreach(list, func))
                .toEqual(ArrayLibrary.chain(list).foreach(func).value());
        });

        it("works on single function filter", function() {
            var func = function(number) {
                return number - 5 > 0;
            };

            expect(ArrayLibrary.chain(testArray).filter(func).value())
                .toEqual(ArrayLibrary.filter(testArray, func));
        });

        it("works on multiple functions", function() {
            expect(ArrayLibrary.chain(testArray).skip(3).take(2).value()).
            toEqual(ArrayLibrary.take(ArrayLibrary.skip(testArray,3),2));
        });

        it("works on multiple functions (3)", function() {
            expect(ArrayLibrary.chain(testArray).skip(3).take(2).skip(1).value()).
            toEqual(ArrayLibrary.skip(ArrayLibrary.take(ArrayLibrary.skip(testArray,3),2), 1));
        });

        it("works on multiple functions (4)", function() {
            expect(ArrayLibrary.chain(testArray).skip(3).take(4).skip(1).take(2).value()).
            toEqual([5,6]);
        });

        it("works if transitioned", function() {
            var test = ArrayLibrary.chain(testArray);
            var test2 = test.take(2).value();
            var test3 = test.take(3).value();

            expect(ArrayLibrary.take(testArray, 2)).toEqual(test2);
            expect(ArrayLibrary.take(testArray, 3)).toEqual(test3);
        });

        it("works with foreach", function() {
            var value = 2;
            var double = function (item) {
                value = value*item;
            }

            ArrayLibrary.chain(testArray).skip(3).take(2).foreach(double);
            expect(value).toEqual(40);
        });
    });

    describe("method sum test", function() {
        it("works if two argument mentioned", function() {
            expect(ArrayLibrary.sum(testArray, 4, 7)).toEqual(26);
            expect(ArrayLibrary.memo["1,2,3,4,5,6,7,8, 4, 7"]).toEqual(26);
        });

        it("works if called with same args on different arrays", function() {
            expect(ArrayLibrary.sum(testArray, 1, 2))
                .not.toEqual(ArrayLibrary.sum([1,2,2,2,4,5,6,7], 1, 2));
        });
    })
});

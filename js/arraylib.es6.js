/**
 * Created by maksim.bulakhau on 3/27/2017.
 */
/*
 Array Library object for operating on arrays
 */

/*
It would be great to add static keyword, which could be applied on classes
In ES5 that would look like:

var StaticClass = function() {};
StaticClass.prototype = Object.create(null);
StaticClass.method1 = function() { / native code / };
*/
"use strict";

export default class ArrayLibrary {

    static take(array, n) {
        return array.slice(0, n);
    }

    static skip(array, n) {
        return array.slice(n);
    }

    static map(array, callback) {
        let newArray = [];

        for (let item of array) {
            if (typeof item !== "undefined") {
                newArray.push(callback(item));
            }
        }

        return newArray;
    }

    static reduce(array, callback, ...args) {
        let value = 0;

        if (args.length > 0) {
            value = args[0];
        } else {
            value = array[0];
            array = array.slice(1);
        }

        for (let item of array){
            if (typeof item !== "undefined") {
                value = callback(value, item);
            }
        }

        return value;
    }

    static foreach(array, callback) {
        for (let item of array) {
            if (typeof item !== "undefined") {
                callback(item, array.indexOf(item), array);
            }
        }
    }

    static filter(array, callback) {
        let newArray = [];

        for (let item of array) {
            if (callback(item, array.indexOf(item), array)) {
                newArray.push(item);
            }
        }

        return newArray;
    }

    static chain(initArray) {

        var wrapChain = callback => {
            callback = callback.bind(null, initArray);
            return (...args) => this.chain(callback.apply(null, args));
        }

        return {
            take: wrapChain(this.take),
            skip: wrapChain(this.skip),
            map: wrapChain(this.map),
            foreach: wrapChain(this.foreach),
            filter: wrapChain(this.filter),
            value: () => initArray
        };
    }

    static sum(array, start, end) {
        if (!this.memo){
            this.memo = {};
        }

        function summarize(array, start, end, memo) {
            var property = array + ", " + start + ", " + end;

            if (property in memo) {
                return memo[property];
            } else {
                var resultSum = 0;
                for(var i = start; i <= end; i++) {
                    resultSum += array[i];
                }
                memo[property] = resultSum;
                return resultSum;
            }
        }

        return summarize(array, start, end, this.memo);
    }
}
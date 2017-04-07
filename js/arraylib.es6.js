/**
 * Created by maksim.bulakhau on 4/6/2017.
 */
var arraylib = (function arrayLibrary() {
    function take(array, n) {
        return array.slice(0, n);
    }

    function skip(array, n) {
        return array.slice(n);
    }

    function map(array, callback) {
        let length = array.length;
        let newArray = [];

        for (let k = 0; k < length; k++) {
            newArray.push(callback(array[k]));
        }

        return newArray;
    }

    function reduce(array, callback /*, initialValue*/) {
        let k = 0;
        let value = 0;

        if (arguments.length >= 3) {
            value = arguments[2];
        } else {
            value = array[k];
            k++;
        }

        let length = array.length;

        for (; k < length; k++){
            if (k in array){
                value = callback(value, array[k]);
            }
        }

        return value;
    }

    function foreach(array, callback) {
        let length = array.length;

        for (let i = 0; i < length; i++) {
            if (i in array) {
                callback(array[i], i, array);
            }
        }
    }

    function filter(array, callback) {
        let newArray = [];
        let length = array.length;

        for (let i = 0; i < length; i++) {
            if (i in array) {
                if (callback(array[i], i, array)) {
                    newArray.push(array[i]);
                }
            }
        }

        return newArray;
    }

    function chain(initArray) {

        var wrapChain = callback => {
            callback = callback.bind(null, initArray);
            return (n) => { chain(callback.apply(null, arguments)) }
        }

        return {
            take: wrapChain(this.take),
            skip: wrapChain(this.skip),
            map: wrapChain(this.map),
            foreach: wrapChain(this.foreach),
            filter: wrapChain(this.filter),
            value: () => { initArray }
        };
    }

    var sum = (function () {
        let memo = {};

        function summarize(array, start, end) {
            let property = array + ", " + start + ", " + end;

            if (property in memo) {
                return memo[property];
            } else {
                let resultSum = 0;
                for(let i = start; i <= end; i++) {
                    resultSum += array[i];
                }
                memo[property] = resultSum;
                return resultSum;
            }
        }

        return summarize;
    })();

    return { take, skip, map, reduce, foreach, filter, chain, sum };
})();

export { arraylib };

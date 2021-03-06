'use strict';

var _           = require("lodash"),
    Type        = require("./Type"),
    Safe        = require("./Safe");



var Arr = {

    /**
     * Get index value
     *
     * @param {Array}   array
     * @param {Number}  index
     *
     * @return {*}
     *
     */
    index: function(array, index){

        array = Safe.array(array);
        index = Safe.number(index);

        if(index < 0 || index > array.length - 1)
            return null;

        return array[index];

    },

    /**
     *
     * Get last value of the array
     *
     * @param {Array}   array
     *
     * @return {Object}
     *
     */
    last: function(array){

        array = Safe.array(array);

        return Arr.index(array, array.length - 1);

    },

    /*
     * Get first value of the array
     *
     * @param {Array}   array
     *
     * @return {Object}
     *
     */
    first: function(array){

        return Arr.index(array);

    },

    /**
     *
     * Returns the length of the array
     *
     * @param {Array}   array
     *
     * @return {Number}
     *
     */
    length: function(array){

        array = Safe.array(array);

        return array.length;

    },

    /**
     *
     * Inserts the value in the specified index of the array
     *
     * @param {Array}   array
     * @param {*}       value
     * @param {Number}  index
     *
     * @return {Array}
     *
     */
    insert: function(array, value, index){

        array = Safe.array(array);
        value = Safe.array(value);

        /* jshint -W041 */
        if(index == null){
            index = Arr.length(array);
        } else {
            index = Safe.number(index);
        }

        // merge the structures
        _.each(
            value.reverse(),
            function(item){
                array.splice(index, 0, item);
            }
        );

        return array;

    },

    /*
     * Remove index of the array. If no index is specified the first
     * element is removed.
     *
     * Returns the removed elements.
     *
     * @param {Array}   index
     * @param {Number}  index
     * @param {Number}  n
     *
     * @return {Array}
     *
     */
    remove: function(array, index, n){

        array   = Safe.array(array);
        index   = Safe.number(index, 0);
        n       = Safe.number(n, 1);

        return array.splice(index, n);

    }

};


module.exports = Arr;


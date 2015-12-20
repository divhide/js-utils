"use strict";

var _ = require("lodash"),
    Type = require("../Type"),
    Safe = require("../Safe"),
    traverse = require("./traverse");


/**
 *
 * Converts the given primitive value to its string
 * representation.
 *
 * @param  {*} value
 * @return {String}
 */
var convertLiteralToString = function(value){

    // wrap the string with quotes if it's a string.
    if(Type.isString(value)){
        value = "\"" + value + "\"";
    }

    return String(value);

};

/**
 *
 * Convert the SchemaResult to a string.
 *
 * @param {*}       value
 * @param {Object}  info
 * @param {String}  accumulator
 * @param {Object}  options
 *
 * @return {String}
 *
 */
var stringifyCallback = function(value, info, accumulator, options){

    var resultStr = "",
        isLiteral = !Type.isComplex(value);

    // callback is being run before the inner structure recursion
    if(info.isBefore){

        // When the parent is an Object
        if(Type.isString(info.index)){

            if(info.isFirst === true){
                resultStr = resultStr + "{";
                resultStr = resultStr + (options.space ? "\n" : "");
            }

            resultStr = resultStr + (options.space ? _.repeat(options.space, info.level-1) : "");
            resultStr = resultStr + convertLiteralToString(info.index) + ":" + (options.space ? " " : "");

        }
        // When the parent is an Array
        else if(Type.isNumber(info.index)){

            if(info.isFirst === true){
                resultStr = resultStr + "[";
                resultStr = resultStr + (options.space ? "\n" : "");
            }

            // If value is not a literal apply identation after new line
            if(!isLiteral){
                resultStr = resultStr + (options.space ? _.repeat(options.space, info.level-1) : "");
            }

        }

        // if value is a literal value
        if(isLiteral){

            // don't apply indentation on
            if(!Type.isString(info.index)){
                resultStr = resultStr + (options.space ? _.repeat(options.space, info.level-1) : "");
            }

            resultStr = resultStr + convertLiteralToString(value);

        }

    }
    // callback is being run after the inner structure recursion
    else if(info.isAfter){

        // if value is empty
        if(!isLiteral && Type.isEmpty(value)){

            if(Type.isArray(value)){
                resultStr = resultStr + (options.space ? _.repeat(options.space, info.level-2) : "");
                resultStr = "[]";
            }
            else if(Type.isObject(value)){
                resultStr = resultStr + (options.space ? _.repeat(options.space, info.level-2) : "");
                resultStr = "{}";
            }

            if(info.isLast === false){
                resultStr = resultStr + ",";
                resultStr = resultStr + (options.space ? "\n" : "");
            }

        }
        // if value belongs to an Object
        else if(Type.isString(info.index)){

            if(info.isLast === false){
                resultStr = resultStr + ",";
                resultStr = resultStr + (options.space ? "\n" : "");
            }
            else {
                resultStr = resultStr + (options.space ? "\n" : "");
                resultStr = resultStr + (options.space ? _.repeat(options.space, info.level-2) : "");
                resultStr = resultStr + "}";
            }

        }
        // if value belongs to an Array
        else if(Type.isNumber(info.index)){

            if(info.isLast === false){
                resultStr = resultStr + ",";
                resultStr = resultStr + (options.space ? "\n" : "");
            }
            else {
                resultStr = resultStr + (options.space ? "\n" : "");
                resultStr = resultStr + (options.space ? _.repeat(options.space, info.level-2) : "");
                resultStr = resultStr + "]";
            }

        }

    }

    // append the result to the accumulator
    return accumulator + resultStr;

};

/**
 *
 * Converts the given value to a friendly string. This function represents
 * an alternative to JSON.stringify adding more options.
 *
 * @param  {*} value
 * @param  {Object} options
 *
 * @return {String}
 *
 */
var stringify = function(value, options){

    options = _.extend({
        space: 4
    }, options);

    return traverse(
        value,
        stringifyCallback,
        "",
        { runBefore: true, runAfter: true },
        {
            space: _.repeat(" ", Safe.number(options.space, 0))
        });
};

module.exports = stringify;
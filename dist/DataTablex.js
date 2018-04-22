(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.DataTablex = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

/**
 * Modalx.js
 * @author Ozy Wu-Li - @ousikaa
 * @description Simple modal toggler
 */

// https://github.com/jquery-boilerplate/jquery-patterns/blob/master/patterns/jquery.basic.plugin-boilerplate.js

// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
// the anonymous function protects the `$` alias from name collisions
;(function ($, window, document, undefined) {
    /**
     * Plugin namespace
     */
    var namespace = {
        pluginName: 'DataTablex'
    };

    /**
     * Defaults
     */
    var defaults = {
        data: null

        /**
         * Plugin Constructor
         */
    };namespace['pluginName'] = function (options) {
        this.options = $.extend({}, defaults, options);
        this.init();
    };

    /**
     * Prototype
     */
    namespace['pluginName'].prototype = {
        /**
         * 
         */
        init: function init() {
            console.log('init');
            this.buildTable(this.options.data);
            this.initSortClickEvent();
        },


        /**
         * 
         */
        sorter: function sorter(key, reverse) {
            this.options.data.sort(function (a, b) {
                if (reverse) {
                    return a[key] - b[key];
                } else {
                    return b[key] - a[key];
                }
            });

            this.buildTableBody(this.options.data);
        },


        /**
         * 
         */
        buildTableHead: function buildTableHead(data) {
            if (data) {
                var dataTableHeader = '';

                for (var key in data[0]) {
                    if (isNaN(data[0][key])) {
                        dataTableHeader += '\n                            <td>' + key + '</td>\n                        ';
                    } else {
                        dataTableHeader += '\n                            <td><a href="#" class="' + key + '" data-tablex-key=' + key + '>' + key + '</a></td>\n                        ';
                    }
                }

                $('.datatablex thead').append(dataTableHeader);
            } else {
                console.log('no data');
            }
        },


        /**
         * 
         */
        buildTableBody: function buildTableBody(data) {
            if (data) {
                var dataTableBody = '';

                data.forEach(function (item) {
                    var dataTableRowCells = '';
                    for (var key in item) {
                        dataTableRowCells += '\n                            <td>' + item[key] + '</td>\n                        ';
                    }

                    var dataTableRow = '\n                        <tr>\n                            ' + dataTableRowCells + '\n                        </tr>\n                    ';

                    dataTableBody += dataTableRow;
                });

                $('.datatablex tbody').empty();
                $('.datatablex tbody').append(dataTableBody);
            } else {
                console.log('no data');
            }
        },


        /**
         * 
         */
        buildTable: function buildTable(data) {
            var dataTableContainer = '\n                <div class="datatablex-container">\n                    <table>\n                        <thead>\n                        </thead>\n                        <tbody>\n                        </tbody>\n                    </table>\n                </div>\n            ';

            $('.datatablex').append(dataTableContainer);
            this.buildTableHead(data);
            this.buildTableBody(data);
        },


        /**
         * 
         */
        initSortClickEvent: function initSortClickEvent() {
            $('body').on('click', '.datatablex a', this.sortClickEventHandler);
        },


        /**
         * 
         */
        sortClickEventHandler: function sortClickEventHandler(event) {
            event.preventDefault();

            var key = $(this).attr('data-tablex-key');

            if (!$(this).hasClass('is-sorting')) {
                $('.datatablex a').removeClass('is-sorting is-reversed');
            }

            $(this).addClass('is-sorting');
            $(this).toggleClass('is-reversed');

            if (!$(this).hasClass('is-reversed')) {
                myDataTablex.sorter(key, true);
            } else {
                myDataTablex.sorter(key, false);
            }
        }
    };

    /*------------------------------------*\
      EXPORT OPTIONS
    \*------------------------------------*/
    module.exports = namespace['pluginName'];
})(jQuery, window, document);

},{}]},{},[1])(1)
});

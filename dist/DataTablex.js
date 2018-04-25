(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.DataTablex = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _numberWithCommas = require('woohaus-utility-belt/lib/numberWithCommas');

var _numberWithCommas2 = _interopRequireDefault(_numberWithCommas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * DataTablex.js
 * @author Ozy Wu-Li - @ousikaa
 * @description Simple data table
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
            var _this = this;

            if (this.options.title) {
                this.addTableTitle();
            }
            this.buildTable(this.options.data);
            if (this.options.source) {
                this.addTableSource();
            }
            this.initSortClickEvent();

            if (this.options.initialKey) {
                $('.datatablex table a[data-tablex-key="' + this.options.initialKey + '"]').addClass('is-sorting');
                this.options.data.sort(function (a, b) {
                    return b[_this.options.initialKey] - a[_this.options.initialKey];
                });
            }
        },
        clonedData: function clonedData() {
            return this.options.data.slice(0);
        },
        sortedData: function sortedData(key, reverse) {
            var clonedData = this.clonedData().sort(function (a, b) {
                var aKey = isNaN(a[key]) ? 0 : a[key];
                var bKey = isNaN(b[key]) ? 0 : b[key];
                if (reverse) {
                    return bKey - aKey;
                } else {
                    return aKey - bKey;
                }
            });

            return clonedData;
        },


        /**
         * 
         */
        sorter: function sorter(key, reverse) {
            var sortedData = this.sortedData(key, reverse);
            this.buildTableBody(sortedData);
        },


        /**
         * 
         */
        buildTableHead: function buildTableHead(data) {
            if (data) {
                var dataTableHeaderRow = '';
                var dataTableHeaderRowCells = '';

                if (this.options.columns) {
                    this.options.columns.forEach(function (key) {
                        if (isNaN(data[0][key.name])) {
                            dataTableHeaderRowCells += '\n                                <td>' + key.name + '</td>\n                            ';
                        } else {
                            dataTableHeaderRowCells += '\n                                <td><a href="#" class="" data-tablex-key="' + key.name + '">' + key.name + '</a></td>\n                            ';
                        }
                    });
                } else {
                    for (var key in data[0]) {
                        if (isNaN(data[0][key])) {
                            dataTableHeaderRowCells += '\n                                <td>' + key + '</td>\n                            ';
                        } else {
                            dataTableHeaderRowCells += '\n                                <td><a href="#" class="" data-tablex-key="' + key + '">' + key + '</a></td>\n                            ';
                        }
                    }
                }

                dataTableHeaderRow = '\n                    <tr>\n                        ' + dataTableHeaderRowCells + '\n                    </tr>\n                ';

                $('.datatablex thead').append(dataTableHeaderRow);
            } else {
                console.log('no data');
            }
        },


        /**
         * 
         */
        buildTableBody: function buildTableBody(data) {
            var _this2 = this;

            if (data) {
                var dataTableBody = '';

                data.forEach(function (item) {
                    var dataTableRowCells = '';

                    if (_this2.options.columns) {
                        _this2.options.columns.forEach(function (key) {
                            var itemKeyName = item[key.name];
                            if (!isNaN(itemKeyName)) {
                                itemKeyName = (0, _numberWithCommas2.default)(itemKeyName);
                            }

                            dataTableRowCells += '\n                                <td data-tablex-key="' + key.name + '">' + itemKeyName + '</td>\n                            ';
                        });
                    } else {
                        for (var key in item) {
                            var itemKeyName = item[key];
                            if (!isNaN(itemKeyName)) {
                                itemKeyName = (0, _numberWithCommas2.default)(itemKeyName);
                            }

                            dataTableRowCells += '\n                                <td data-tablex-key="' + key.name + '">' + item[key] + '</td>\n                            ';
                        }
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
        buildTableContainer: function buildTableContainer() {
            var dataTableContainer = '\n                <div class="datatablex-container">\n                    <table>\n                        <thead>\n                        </thead>\n                        <tbody>\n                        </tbody>\n                    </table>\n                </div>\n            ';

            $('.datatablex').append(dataTableContainer);
        },


        /**
         * Add Table Title
         */
        addTableTitle: function addTableTitle() {
            $('.datatablex').append('<h2 class="datatablex-title">' + this.options.title + '</h2>');
        },


        /**
         * Add Table Source
         */
        addTableSource: function addTableSource() {
            $('.datatablex').append('<div class="datatablex-source">Source(s): ' + this.options.source + '</div>');
        },


        /**
         * 
         */
        buildTable: function buildTable(data) {
            var dataCopy = data.slice(0);

            this.buildTableContainer();
            this.buildTableHead(dataCopy);
            this.buildTableBody(dataCopy);
        },


        /**
         * 
         */
        initSortClickEvent: function initSortClickEvent() {
            $('body').on('click.sort', '.datatablex table a', this.sortClickEventHandler.bind(this));
        },


        /**
         * 
         */
        sortClickEventHandler: function sortClickEventHandler(event) {
            event.preventDefault();

            var key = $(event.currentTarget).attr('data-tablex-key');

            if ($(event.currentTarget).hasClass('is-reversed')) {
                this.sorter(key, false);
            } else {
                this.sorter(key, true);
            }

            if (!$(event.currentTarget).hasClass('is-sorting')) {
                $('.datatablex table a, .datatablex td').removeClass('is-sorting is-reversed');
            }

            $(event.currentTarget).addClass('is-sorting');
            $('.datatablex td[data-tablex-key="' + key + '"]').addClass('is-sorting');

            $(event.currentTarget).toggleClass('is-reversed');
        },


        /**
         * 
         */
        resetSort: function resetSort() {
            $('.datatablex table a, .datatablex td').removeClass('is-sorting is-reversed');
            this.buildTableBody(this.options.data);
        },


        /**
         * 
         */
        destroy: function destroy() {
            $('body').off('click.sort');
            $('.datatablex, .datatablex *').off('click');
            $('.datatablex').empty();
        }
    };

    /*------------------------------------*\
      EXPORT OPTIONS
    \*------------------------------------*/
    module.exports = namespace['pluginName'];
})(jQuery, window, document);

},{"woohaus-utility-belt/lib/numberWithCommas":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
},{}]},{},[1])(1)
});

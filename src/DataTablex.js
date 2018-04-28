import numberWithCommas from 'woohaus-utility-belt/lib/numberWithCommas';

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
;(function( $, window, document, undefined ) {
    /**
     * Plugin namespace
     */
    let namespace = {
        pluginName: 'DataTablex'
    };


    /**
     * Defaults
     */
    let defaults = {
        data: null
    }

    /**
     * Plugin Constructor
     */
    namespace['pluginName'] = function( options ) {
        this.options = $.extend( {}, defaults, options );
        this.init();
    }


    /**
     * Prototype
     */
    namespace['pluginName'].prototype = {
        /**
         * 
         */
        init() {
            if (this.options.title) {
                this.addTableTitle();
            }
            this.buildTable(this.options.data);
            if (this.options.source) {
                this.addTableSource();
            }
            this.initSortClickEvent();

            if (this.options.initialKey) {
                $(`.datatablex table a[data-tablex-key="${this.options.initialKey}"]`).addClass('is-sorting');
                this.options.data.sort((a, b) => {
                    return b[this.options.initialKey] - a[this.options.initialKey];
                })
            }
        },

        clonedData() {
            return this.options.data.slice(0);
        },

        sortedData(key, reverse) {
            let clonedData = this.clonedData().sort((a, b) => {
                let aKey = isNaN(a[key]) ? 0 : a[key];
                let bKey = isNaN(b[key]) ? 0 : b[key];
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
        sorter(key, reverse) {
            let sortedData = this.sortedData(key, reverse);
            this.buildTableBody(sortedData);
        },

        /**
         * 
         */
        buildTableHead(data) {
            if (data) {
                let dataTableHeaderRow = '';
                let dataTableHeaderRowCells = '';

                if (this.options.columns) {
                    this.options.columns.forEach((key) => {
                        if (isNaN(data[0][key.name])) {
                            dataTableHeaderRowCells += `
                                <td>${key.name}</td>
                            `;
                        } else {
                            dataTableHeaderRowCells += `
                                <td><span><a href="#" class="" data-tablex-key="${key.name}">${key.name}</a></span></td>
                            `;
                        }
                    })
                } else {
                    for (let key in data[0]) {
                        if (isNaN(data[0][key])) {
                            dataTableHeaderRowCells += `
                                <td>${key}</td>
                            `;
                        } else {
                            dataTableHeaderRowCells += `
                                <td><span><a href="#" class="" data-tablex-key="${key}">${key}</a></span></td>
                            `;
                        }
                    }
                }

                dataTableHeaderRow = `
                    <tr>
                        ${dataTableHeaderRowCells}
                    </tr>
                `;

                $('.datatablex thead').append(dataTableHeaderRow);
            } else {
                console.log('no data');
            }
        },

        /**
         * 
         */
        buildTableBody(data) {
            if (data) {
                let dataTableBody = '';

                data.forEach((item) => {
                    let dataTableRowCells = ``;

                    if (this.options.columns) {
                        this.options.columns.forEach((key) => {
                            let itemKeyName = item[key.name];
                            if (!isNaN(itemKeyName)) {
                                itemKeyName = numberWithCommas(itemKeyName);
                            }

                            dataTableRowCells += `
                                <td data-tablex-key="${key.name}">${itemKeyName}</td>
                            `;
                        })
                    } else {
                        for (let key in item) {
                            let itemKeyName = item[key];
                            if (!isNaN(itemKeyName)) {
                                itemKeyName = numberWithCommas(itemKeyName);
                            }

                            dataTableRowCells += `
                                <td data-tablex-key="${key.name}">${item[key]}</td>
                            `;
                        }
                    }

                    let dataTableRow = `
                        <tr>
                            ${dataTableRowCells}
                        </tr>
                    `;

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
        buildTableContainer() {
            let dataTableContainer = `
                <div class="datatablex-container">
                    <table>
                        <thead>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            `;

            $('.datatablex').append(dataTableContainer);
        },

        /**
         * Add Table Title
         */
        addTableTitle() {
            $('.datatablex').append(`<h2 class="datatablex-title">${this.options.title}</h2>`);
        },

        /**
         * Add Table Source
         */
        addTableSource() {
            $('.datatablex').append(`<div class="datatablex-source">Source(s): ${this.options.source}</div>`);
        },

        /**
         * 
         */
        buildTable(data) {
            let dataCopy = data.slice(0);

            this.buildTableContainer();
            this.buildTableHead(dataCopy);
            this.buildTableBody(dataCopy);
        },

        /**
         * 
         */
        initSortClickEvent() {
            $('body').on('click.sort', '.datatablex table a', this.sortClickEventHandler.bind(this));
        },

        /**
         * 
         */
        sortClickEventHandler(event) {
            event.preventDefault();

            let key = $(event.currentTarget).attr('data-tablex-key');

            if ($(event.currentTarget).hasClass('is-reversed')) {
                this.sorter(key, false);
            } else {
                this.sorter(key, true);
            }

            if (!$(event.currentTarget).hasClass('is-sorting')) {
                $('.datatablex table a, .datatablex td').removeClass('is-sorting is-reversed');    
            }

            $(event.currentTarget).addClass('is-sorting');
            $(`.datatablex td[data-tablex-key="${key}"]`).addClass('is-sorting');

            $(event.currentTarget).toggleClass('is-reversed');
        },

        /**
         * 
         */
        resetSort() {
            $('.datatablex table a, .datatablex td').removeClass('is-sorting is-reversed');
            this.buildTableBody(this.options.data);
        },

        /**
         * 
         */
        destroy() {
            $('body').off('click.sort');
            $('.datatablex, .datatablex *').off('click');
            $('.datatablex').empty();
        }
    }


    /*------------------------------------*\
      EXPORT OPTIONS
    \*------------------------------------*/
    module.exports = namespace['pluginName'];

})( jQuery, window , document );
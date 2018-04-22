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
            console.log('init');

            if (this.options.initialKey) {
                this.options.data.sort((a, b) => {
                    return b[this.options.initialKey] - a[this.options.initialKey];
                })
            }

            this.buildTable(this.options.data);
            this.initSortClickEvent();      
        },

        clonedData() {
            return this.options.data.slice(0);
        },

        sortedData(key, reverse) {
            let clonedData = this.clonedData().sort((a, b) => {
                if (reverse) {
                    return b[key] - a[key];
                    
                } else {
                    return a[key] - b[key];
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
                let dataTableHeader = '';

                for (let key in data[0]) {
                    if (isNaN(data[0][key])) {
                        dataTableHeader += `
                            <td>${key}</td>
                        `;
                    } else {
                        dataTableHeader += `
                            <td><a href="#" class="${key}" data-tablex-key=${key}>${key}</a></td>
                        `;
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
        buildTableBody(data) {
            if (data) {
                let dataTableBody = '';

                data.forEach((item) => {
                    let dataTableRowCells = ``;
                    for (let key in item) {
                        dataTableRowCells += `
                            <td data-tablex-key="${key}">${item[key]}</td>
                        `;
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
            $('body').on('click', '.datatablex a', this.sortClickEventHandler);
        },

        /**
         * 
         */
        sortClickEventHandler(event) {
            event.preventDefault();

            let key = $(this).attr('data-tablex-key');

            if (!$(this).hasClass('is-reversed')) {
                myDataTablex.sorter(key, true);    
                 
            } else {
                myDataTablex.sorter(key, false);
            }

            if (!$(this).hasClass('is-sorting')) {
                $('.datatablex a, .datatablex td').removeClass('is-sorting is-reversed');    
            }

            $(this).addClass('is-sorting');
            $(`.datatablex td[data-tablex-key=${key}]`).addClass('is-sorting');

            $(this).toggleClass('is-reversed');

        },

        /**
         * 
         */
        resetSort() {
            $('.datatablex a, .datatablex td').removeClass('is-sorting is-reversed');
            this.buildTableBody(this.options.data);
        },
    }


    /*------------------------------------*\
      EXPORT OPTIONS
    \*------------------------------------*/
    module.exports = namespace['pluginName'];

})( jQuery, window , document );
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
            this.buildTable(this.options.data);            
        },

        /**
         * 
         */
        sorter(key, reverse) {
            this.options.data.sort((a, b) => {
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
                            <td><a href="#" class="${key}">${key}</a></td>
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
                            <td>${item[key]}</td>
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
        buildTable(data) {
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
            this.buildTableHead(data);
            this.buildTableBody(data);

        },

        /**
         * 
         */
        updateTableBody() {

        }
    }


    /*------------------------------------*\
      EXPORT OPTIONS
    \*------------------------------------*/
    module.exports = namespace['pluginName'];

})( jQuery, window , document );
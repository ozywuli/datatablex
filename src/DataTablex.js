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

    }

    /**
     * Plugin Constructor
     */
    namespace['pluginName'] = function( options ) {
        this.options = $.extend( {}, defaults, options );

    }


    /**
     * Prototype
     */
    namespace['pluginName'].prototype = {

    }


    /*------------------------------------*\
      EXPORT OPTIONS
    \*------------------------------------*/
    module.exports = namespace['pluginName'];

})( jQuery, window , document );
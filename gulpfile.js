/* Anthony2511/MMI-GAME
 *
 * /gulpfile.js - Gulp tasks
 *
 * coded by Anthony2511
 * started at 27/05/2017
 */

var gulp = require( "gulp" ),
    babel = require( "gulp-babel" ),
    rename = require( "gulp-rename" ),
    sourcemaps = require( "gulp-sourcemaps" );

// --- Task for js

gulp.task( "js", function() {
    gulp.src( "src/**/*.js" )
        .pipe( sourcemaps.init() )
        .pipe( babel() )
        .on( "error", function( oError ) {
            console.error( oError );
            this.emit( "end" );
        } )
        .pipe( sourcemaps.write() )
        .pipe( rename( function( path ) {
            path.basename += ".min";
        } ) )
        .pipe( gulp.dest( "bin" ) );
} );

// --- Watch tasks

gulp.task( "watch", function() {
    gulp.watch( "src/**/*.js", [ "js" ] );
} );

// --- Aliases

gulp.task( "default", [ "js" ] );
gulp.task( "work", [ "default", "watch" ] );

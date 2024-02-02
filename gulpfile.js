const gulp = require("gulp"); // task runner
const imagemin = require("gulp-imagemin"); // minify images (jpg, png, svg)
const minify = require("gulp-minify"); // minify js
const cleanCss = require("gulp-clean-css"); // minify css
const concat = require("gulp-concat"); // concat multiple files into one

// minify and concat all js
gulp.task("pack-js", function () {
  return gulp
    .src(["assets/js/fontawesome.js", "assets/js/main.js"])
    .pipe(concat("bundle.js"))
    .pipe(
      minify({
        ext: {
          min: ".js",
        },
        noSource: true,
      })
    )
    .pipe(gulp.dest("public/build/js"));
});

// minify and concat all css
gulp.task("pack-css", function () {
  return gulp
    .src(["assets/css/main.css", "assets/css/bootstrap.css"])
    .pipe(concat("stylesheet.css"))
    .pipe(cleanCss({ level: { 1: { specialComments: 0 } } }))
    .pipe(gulp.dest("public/build/css"));
});

// we're lazy loading the polyfill.io script for older browsers, we still need to minify it
gulp.task("pack-polyfill-js", function () {
  return gulp
    .src(["assets/js/polyfill.js"])
    .pipe(concat("polyfill.js"))
    .pipe(
      minify({
        ext: {
          min: ".js",
        },
        noSource: true,
      })
    )
    .pipe(gulp.dest("public/build/js"));
});

// glider is only used on the home page, so we can minify it separately and load it only there
gulp.task("pack-glider-js", function () {
  return gulp
    .src(["assets/js/glider.js"])
    .pipe(concat("glider.js"))
    .pipe(
      minify({
        ext: {
          min: ".js",
        },
        noSource: true,
      })
    )
    .pipe(gulp.dest("public/build/js"));
});

// same as above, but for css
gulp.task("pack-glider-css", function () {
  return gulp
    .src(["assets/css/glider.css"])
    .pipe(concat("glider.css"))
    .pipe(cleanCss({ level: { 1: { specialComments: 0 } } }))
    .pipe(gulp.dest("public/build/css"));
});

// minify images will hit all folders and overwrite existing files with minified versions
// TODO: time consuming, we can add a check to only minify images that have changed, uncomment to enable
// and re-add to parallel task below
// gulp.task("minify-images", function () {
//   return gulp
//     .src("public/images/**/*")
//     .pipe(imagemin())
//     .pipe(gulp.dest("public/images"));
// });

// Note: there's no need to minify the webp images, they're already compressed
// we can introduce a new pipeline step to convert all images to webp,
// but in practice sometimes they come out larger than the jpgs
// we'll also need to update the html to load the webp images instead of the other image sources

// run all tasks
gulp.task(
  "default",
  gulp.parallel(
    "pack-js",
    "pack-css",
    "pack-polyfill-js",
    "pack-glider-js",
    "pack-glider-css",
    // "minify-images"
  )
);

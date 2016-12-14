require 'compass/import-once/activate'#解决sassr @import同一个文件，如引入多次，sass每次都会重新引入的问题，也减少了代码的重复。如需要再重复加载，可以在文件后添加一个"!"号
#require 'compass-normalize'#解决sassr reset一刀切的问题(每个标签样式都重新定义，会影响执行效率)，normalize保护有用的浏览器默认样式而不是完全去掉所有样式。
# Require any additional compass plugins here.
environment=:development#环境=开发环境
# Set this to the root of your project when deployed:
http_path = "/"
sass_dir = "sass"
css_dir = "../../css"
js_dir = "../../js"
font_dir="../../font"
images_dir = "../../images"
# You can select your preferred output style here (can be overridden via the command line):
output_style =(environment==:development)? :nested : :compressed
#:nested(默认风格尾括号不独行一行)；
#:compressed(括号独占一行)；
#:compact(每个规则独占一行)；
#:compressed(压缩)
# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false


# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass

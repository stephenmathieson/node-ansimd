
/**
 * Module dependencies.
 */

var marked = require('marked');
var unescape = require('unescape-html');

/**
 * Expose `render`.
 */

exports = module.exports = render;

/**
 * Render the given markdown `text`.
 */

function render(text) {
  text = String(text);
  var str = marked(text, { renderer: renderer });
  // remove escaped things (<, >, etc.)
  return unescape(str);
}

/**
 * Expose our `renderer`.
 */

var renderer = exports.renderer = new marked.Renderer();

/**
 * Render text.
 */

renderer.text = function (text) {
  return text;
};

/**
 * Render tablecell.
 */

renderer.tablecell = function (text) {
  return text;
};

/**
 * Render tablerow.
 */

renderer.tablerow = function (text) {
  return text;
};

/**
 * Render table.
 */

renderer.table = function (text) {
  return text;
};

/**
 * Render a heading.
 */

renderer.heading = function (text) {
  return newlines(bold(underline(text)));
};

/**
 * Render a code block.
 */

renderer.code = function (text) {
  return newlines(text.replace(/^/gm, '    '));
};

/**
 * Render italic text.
 */

renderer.em = function (text) {
  return italic(text);
};

/**
 * Render strong text.
 */

renderer.strong = 
renderer.codespan = function (text) {
  return bold(text);
};

/**
 * Render a list.
 */

renderer.list = function (text, ordered) {
  var i = 0;
  return newlines(text
    .split('\0')
    .filter(Boolean)
    .map(function (item) {
      var prefix = ordered ? ' ' + ++i + '. ' : ' - ';
      return prefix + item;
    })
    .join('\n'));
};

/**
 * Render a list item.
 */

renderer.listitem = function (text) {
  return text + '\0';
};

/**
 * Render a paragraph.
 */

renderer.paragraph = newlines;

/**
 * Render (noop) images and linebreaks.
 */

renderer.image =
renderer.hr =
renderer.blockquote =
renderer.br = newline;

/**
 * Render a link.
 */

renderer.link = function (href, title, text) {
  return underline(text) + ' (' + href + ')';
};

/**
 * Wrap the given `str` in newlines.
 */

function newlines(str) {
  return '\n' + str + '\n';
}

/**
 * Newline.
 */

function newline() {
  return '\n';
}

/**
 * Make `str` bold.
 */

function bold(str) {
  return '\033[1m' + str + '\033[0m';
}

/**
 * Underline `str`.
 */

function underline(str) {
  return '\033[4m' + str + '\033[0m';
}

/**
 * Make `str` italic.
 */

function italic(str) {
  return '\033[3m' + str + '\033[0m';
}

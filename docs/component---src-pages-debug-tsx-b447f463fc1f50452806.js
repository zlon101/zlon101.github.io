(window.webpackJsonp = window.webpackJsonp || []).push([
  [4],
  {
    'N/sl': function(e, t, n) {},
    qu06: function(e, t, n) {
      'use strict';
      n.r(t);
      var a = n('q1tI'),
        c = n.n(a);
      n('N/sl');
      t.default = function() {
        var e = Object(a.useState)(''),
          t = e[0],
          n = e[1];
        return c.a.createElement(
          'div',
          { className: 'p-debug' },
          c.a.createElement('div', { className: t + ' animation' }),
          c.a.createElement(
            'button',
            {
              onClick: function() {
                n(t ? '' : 'active');
              },
            },
            'debug'
          )
        );
      };
    },
  },
]);
//# sourceMappingURL=component---src-pages-debug-tsx-b447f463fc1f50452806.js.map

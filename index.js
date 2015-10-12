"use strict"

var postcss = require('postcss');

var addBreakpoints = function(atRule, opts) {
    var after = atRule;
    var rules = atRule.nodes ? atRule.nodes.slice() : [atRule.next()];
    var viewports = opts.viewports;

    var params = atRule.params.split(',').map(v => v.trim());

    if (! params.length || params.indexOf('all') !== -1) {
        params = Object.keys(viewports);
    }

    rules.forEach(rule => {
        rule.remove();
        atRule.parent.insertAfter(after, rule);
        after = rule;

        for (let viewport in viewports) {
            if (params.indexOf(viewport) === -1) {
                continue;
            }

            var value = viewports[viewport];
            var media = postcss.atRule({ name: 'media', params: `screen and (max-width: ${value})` });
            
            let r = rule.clone();
            r.selector = r.selector.replace(/^.(.*)$/, `[data-${viewport}~="$1"]`);

            media.append(r);

            atRule.parent.insertAfter(after, media);
            after = media;
        }
    });

    atRule.remove();
};

module.exports = postcss.plugin('postcss-breakpoints', opts => {
    return (css, result) => {
        css.walkAtRules(rule => {
            if (rule.name == 'viewports') {
                addBreakpoints(rule, opts);
            }
        });
    };
});

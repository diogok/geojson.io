module.exports = function(context) {
    function success(err, d) {
        context.container.select('.map').classed('loading', false);
        if (err) return;
        context.data.parse(d);
    }

    context.container.select('.map').classed('loading', true);
    context.data.save(success);
};

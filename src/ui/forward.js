
module.exports = function(context) {

    return function(selection) {

        selection.select('.forward').remove();
        selection.select('.tooltip.in')
                 .classed('in', false);

        var sel = selection.append('div')
            .attr('class', 'forward pad1');

        var form = sel.append('form')
                      .attr('id','forward_form')
                      .on('submit',function(){
                          pre_submit();
                          return true;
                      });

        var method_input = form.append('select')
                               .attr('name','forward_method')
                               .attr('id','forward_method')

        method_input.append('option')
                    .attr('value','GET')
                    .text('GET');
        method_input.append('option')
                    .attr('value','POST')
                    .text('POST');

        var url_input = form.append('input')
                            .attr('type', 'text')
                            .attr('placeholder','URL to send the geojson to...')
                            .attr('value','http://')
                            .attr('name','forward_url')
                            .attr('id','forward_url')
                            .attr('title', 'URL');

        sel.append('button')
           .attr('class','icon-arrow-right')
           .attr('type','submit')
           .on('click',function() { 
               pre_submit();
               getEl('forward_form').submit(); 
           });

        sel.append('a')
            .attr('class', 'icon-remove')
            .on('click', function() { sel.remove(); });

        function getEl(name) {
            return document.getElementById(name);
        }

        function pre_submit() {
            form.attr('action',getEl('forward_url').value)
                .attr('method',getEl('forward_method').value)
                .append('input')
                .attr('type','hidden')
                .attr('name','data')
                .attr('value',JSON.stringify(window.api.data.all().map));

            method_input.attr('disabled','disabled');
            url_input.attr('disabled','disabled');
        };
    };

};


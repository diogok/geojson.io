
module.exports = function(hostname) {

    if(typeof hostname == 'undefined') hostname=location.hostname;
    var env = (hostname === 'geojson.io')?'production':'development';

    var config = {
        production: {
            env: 'production',
            client_id: '62c753fd0faf18392d85' ,
            gatekeeper_url: 'https://geojsonioauth.herokuapp.com' 
        },
        development: {
            env: 'development',
            client_id: 'bb7bbe70bd1f707125bc',
            gatekeeper_url: 'https://localhostauth.herokuapp.com'
        }
    };

    var cfg = config[env];

    var params = (location.search+"&"+location.hash.substring(1)).split("&")
                    .map(function(p) { return p.match(/([\w]+)=([^&]+)/);})
                    .filter(function(p) { return p != null && p.length==3;})
                    .map(function(p) { return p.slice(1);});
    for(var i=0;i<params.length;i++) {
        var key=params[i][0], value=params[i][1];
        if(value != null && value.length >= 1 && typeof cfg[key] === 'undefined') {
            if(value=='true') value=true;
            else if(value=='false') value=false;
            else if(!isNaN(parseFloat(value))) value=parseFloat(value);
            else if(!isNaN(parseInt(value))) value=parseInt(value);
            else value = decodeURIComponent(value);
            cfg[key] = value;
        }
    }

    cfg.feature = function(name) {
        if(cfg['deny']) {
            return cfg[name] === true;
        } else {
            return typeof cfg["no"+name] == 'undefined';
        }
    };

    return cfg;
};


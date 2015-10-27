var Digitalx = require('digitalx');


/*var digitalx = new Digitalx(key, secret);*/
var digitalx = new Digitalx('YOUR API KEY HERE', 'YOUAR API SECRET HERE');



digitalx.price("buy",
    function(err, res){
        console.log(res);
});


digitalx.transaction("d1c72f2b-ce23-5d2d-b38e-92a13f8f94ea",
    function(err, res){
        console.log(res);
});

digitalx.invoice(
    function(err, res){
        console.log(res);
});


// digitalx.order(price, amount, 'buy' ... 
digitalx.order(.001, 400, 'buy',
    function(err, res){
        console.log(res);
});

digitalx.status(
    function(err, res){
        console.log(res);
});


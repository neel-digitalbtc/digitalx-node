// Generated by CoffeeScript 1.8.0
(function() {
  var Digitalx, crypto, qs, request;

  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

  request = require('request');

  crypto = require('crypto');

  qs = require('querystring');

  module.exports = Digitalx = (function() {
    function Digitalx(key, secret) {
      this.url = "https://api.direct.digitalx.com/v0/";
      this.key = key;
      this.secret = secret;
      this.nonce = Math.ceil((new Date()).getTime());
    }

    Digitalx.prototype._nonce = function() {
      return ++this.nonce;
    };

    Digitalx.prototype.make_request = function(sub_path, params, cb) {
      var headers, key, nonce, path, payload, signature, url, value;
      if (!this.key || !this.secret) {
        return cb(new Error("missing api key or secret"));
      }
      path = sub_path;
      url = this.url + "/" + path;
      nonce = JSON.stringify(this._nonce());
      payload = {
        nonce: nonce
      };
      for (key in params) {
        value = params[key];
        payload[key] = value;
      }
      payload = new Buffer(JSON.stringify(payload)).toString('base64');
      signature = crypto.createHmac("sha256", this.secret).update(payload).digest('hex');
      headers = {
        'X-DIGITALX-KEY': this.key,
        'X-DIGITALX-PARAMS': payload,
        'X-DIGITALX-SIGNATURE': signature
      };
      return request({
        url: url,
        method: "POST",
        headers: headers,
        timeout: 15000
      }, function(err, response, body) {
        var error, result;

        if (err || (response.statusCode !== 200 && response.statusCode !== 400)) {
          return cb(new Error(err != null ? err : response.statusCode));
        }
        try {
          result = JSON.parse(body);
        } catch (_error) {
          error = _error;
	  
          return cb(null, {
            messsage: body.toString()
          });
        }
        return cb(null, result);
      });
    };


    Digitalx.prototype.order = function(amount, price, side, cb) {
      var params;
      params = {
	method: "order",
        price: price,
        amount: amount,
        side: side
      };
      return this.make_request('order', params, cb);
    };

    Digitalx.prototype.price = function(currencies, cb) {
      var params;
      params = {
	method: "price",
        side: "buy",
      };
      return this.make_request('price', params, cb);
    };

    Digitalx.prototype.status = function(cb) {
      var params;
      params = {
	method: "status"
      };
      return this.make_request('status', params, cb);
    };

    Digitalx.prototype.invoice = function(cb) {
      var params;
      params = {
	method: "invoice"
      };
      return this.make_request('invoice', params, cb);
    };

    Digitalx.prototype.transaction = function(tx_id, cb) {
      var params;
      params = {
	method: "transaction",
        tx_id: tx_id
      };
      return this.make_request('transaction', params, cb);
    };

    return Digitalx;

  })();

}).call(this);

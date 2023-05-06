var nnn = function(r){
	for(var i = 0; i < 16; i++){
		r[i] = Math.random()*256
	}
	return r
}

var lll = function(r) {
    var r = new Uint8Array(16);
    return nnn(r)
}

var ccc = function(t, e) {
    for (var n = [], i = 0; i < 256; ++i)
        n[i] = (i + 256).toString(16).substr(1);
    var i = e || 0
    , r = n;
    return [r[t[i++]], r[t[i++]], r[t[i++]], r[t[i++]], "-", r[t[i++]], r[t[i++]], "-", r[t[i++]], r[t[i++]], "-", r[t[i++]], r[t[i++]], "-", r[t[i++]], r[t[i++]], r[t[i++]], r[t[i++]], r[t[i++]], r[t[i++]]].join("")
}

var reqId = function(t, e, n) {
    var i = 0
      , b = []
      , f = null
      , v = null;
    if (null == f || null == v) {
        var m = lll();
        null == f && (f = r = [1 | m[0], m[1], m[2], m[3], m[4], m[5]]),
        null == v && (v = o = 16383 & (m[6] << 8 | m[7]))
    }
    var y = (new Date).getTime()
      , w = 1
      , d = 0
      , h = 0
      , dt = y - d + (w - h) / 1e4;
    d = y,
    h = w - 1,
    o = v;
    var x = (1e4 * (268435455 & (y += 122192928e5)) + h) % 4294967296;
    b[i++] = x >>> 24 & 255,
    b[i++] = x >>> 16 & 255,
    b[i++] = x >>> 8 & 255,
    b[i++] = 255 & x;
    var _ = y / 4294967296 * 1e4 & 268435455;
    b[i++] = _ >>> 8 & 255,
    b[i++] = 255 & _,
    b[i++] = _ >>> 24 & 15 | 16,
    b[i++] = _ >>> 16 & 255,
    b[i++] = v >>> 8 | 128,
    b[i++] = 255 & v;
    for (var A = 0; A < 6; ++A)
        b[i + A] = f[A];
    return ccc(b)
}

module.exports = async() => {
	return reqId();
}
var ccc = function (t, e) {
    for (var n = [], i = 0; i < 256; ++i)
        n[i] = (i + 256).toString(16).substr(1);
    var i = e || 0
        , r = n;
    return [r[t[i++]], r[t[i++]], r[t[i++]], r[t[i++]], "-", r[t[i++]], r[t[i++]], "-", r[t[i++]], r[t[i++]], "-", r[t[i++]], r[t[i++]], "-", r[t[i++]], r[t[i++]], r[t[i++]], r[t[i++]], r[t[i++]], r[t[i++]]].join("")
}

var reqId = function (mmm) {
    var i = 0
        , b = []
        , f = [1 | mmm[0], mmm[1], mmm[2], mmm[3], mmm[4], mmm[5]]
        , v = 16383 & (mmm[6] << 8 | mmm[7])
        , y = (new Date).getTime()
        , h = 0
        , x = (1e4 * (268435455 & (y += 122192928e5)) + h) % 4294967296;
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
//mmm is a Buffer(16)
module.exports = async (mmm) => {
    mmm = Buffer.from(mmm, "base64")
    return reqId(mmm);
}
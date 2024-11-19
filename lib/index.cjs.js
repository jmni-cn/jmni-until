'use strict';

function generateUID() {
    var timestamp = Date.now().toString(36); // 时间戳转为36进制
    var randomPart = Math.random().toString(36).substring(2, 10); // 随机数转为36进制
    return timestamp + randomPart;
}

exports.generateUID = generateUID;
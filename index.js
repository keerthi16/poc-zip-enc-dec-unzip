/**
 #
 # Copyright 2017 KiKe. All Rights Reserved.
 #
 # Licensed under the Apache License, Version 2.0 (the "License");
 # you may not use this file except in compliance with the License.
 # You may obtain a copy of the License at
 #
 #      http://www.apache.org/licenses/LICENSE-2.0
 #
 # Unless required by applicable law or agreed to in writing, software
 # distributed under the License is distributed on an "AS IS" BASIS,
 # WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 # See the License for the specific language governing permissions and
 # limitations under the License.
 */
const fs = require('fs');
const crypto = require('crypto');
const archiver = require('archiver');
const zipArchive = archiver('zip');
const unzip = require('unzip2');

/**
 *
 * @param inputFolder
 * @param encKey
 * @param callback
 */
zipAndEncrypt = function (inputFolder, encKey, callback) {
    var output = fs.createWriteStream('./out.zip');

    output.on('close', function () {
        const cipher = crypto.createCipher('aes192', encKey);
        const input = fs.createReadStream('./out.zip');
        const outputEncy = fs.createWriteStream('temp.enc');

        input.pipe(cipher).pipe(outputEncy).on('finish', function (err, res) {
            if (err) return callback(err, null);
            return callback(null, 'Successful');
        });
    });

    zipArchive.pipe(output);

    zipArchive.directory(inputFolder, true);

    zipArchive.finalize(function (err, bytes) {
        if (err) throw err;
    });
};

/**
 *
 * @param inputEncFile
 * @param decKey
 * @param callback
 */
decryptAndUnZip = function (inputEncFile, decKey, callback) {
    const decipher = crypto.createDecipher('aes192', decKey);
    const input = fs.createReadStream(inputEncFile);
    const output = fs.createWriteStream('./test.zip');

    input.pipe(decipher).pipe(output).on('finish', function () {
        fs.createReadStream('./test.zip').pipe(unzip.Extract({path: 'finalOut'})).on('close', function (err, res) {
            if (err) return callback(err, null);
            return callback(null, 'Successful');
        });
    });
};

/**
 *
 * @type {{zipAndEncrypt: (zipAndEncrypt|*), decryptAndUnZip: (decryptAndUnZip|*)}}
 */
module.exports = {
    zipAndEncrypt: zipAndEncrypt,
    decryptAndUnZip: decryptAndUnZip
};

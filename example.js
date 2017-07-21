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
var demo = require('./index');

/**
 * @param pass the dir location for
 * encrypting and zipping
 * @param key for encrypting
 */
demo.zipAndEncrypt('./realFolder', 'sample@123123');

/**
 * @param pass the encrypted file created
 * from the zipAndEncrypt()
 * @param key for decrypting
 */
demo.decryptAndUnZip('./temp.enc', 'sample@123123');

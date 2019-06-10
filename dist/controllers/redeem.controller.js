"use strict";
// Copyright IBM Corp. 2017,2018. All Rights Reserved.
// Node module: @loopback/example-todo
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const blockchainClient_1 = require("../blockchainClient");
let blockchainClient = new blockchainClient_1.BlockChainModule.BlockchainClient();
class RedeemController {
    constructor() { }
    async createIssue(requestBody) {
        console.log('Buy, requestBody: ');
        console.log(requestBody);
        let networkObj = await blockchainClient.connectToNetwork();
        if (!networkObj) {
            let errString = 'Error connecting to network';
            let redeem = new models_1.Redeem({
                issuer: errString, paperNumber: errString, redeemingOwner: errString,
                redeemDateTime: errString
            });
            return redeem;
        }
        console.log('newtork obj: ');
        console.log(networkObj);
        let dataForRedeem = {
            function: 'redeem',
            issuer: requestBody.issuer,
            paperNumber: requestBody.paperNumber,
            redeemingOwner: requestBody.redeemingOwner,
            redeemDateTime: requestBody.redeemDateTime,
            contract: networkObj.contract
        };
        var resultAsBuffer = await blockchainClient.redeem(dataForRedeem);
        console.log('result from blockchainClient.submitTransaction in controller: ');
        let result = JSON.parse(Buffer.from(JSON.parse(resultAsBuffer)).toString());
        let issue = new models_1.Redeem({
            issuer: result.issuer, paperNumber: result.paperNumber, redeemingOwner: result.redeemingOwner,
            redeemDateTime: result.redeemDateTime
        });
        return issue;
    }
}
__decorate([
    rest_1.post('/redeem', {
        responses: {
            '200': {
                description: 'Todo model instance',
                content: { 'application/json': { schema: { 'x-ts-type': models_1.Redeem } } },
            },
        },
    }),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.Redeem]),
    __metadata("design:returntype", Promise)
], RedeemController.prototype, "createIssue", null);
exports.RedeemController = RedeemController;
//# sourceMappingURL=redeem.controller.js.map
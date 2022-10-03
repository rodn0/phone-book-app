"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const contact_model_1 = require("../../models/contact.model");
const lodash_1 = require("lodash");
class ContactService {
    find(filter, projection, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const item = yield contact_model_1.Contact.find(filter, projection, options);
                return item;
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    findOneAndDelete(filter, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, lodash_1.isObject)(filter)) {
                    throw new Error("Invalid filter");
                }
                const deletedObject = yield contact_model_1.Contact.findOneAndDelete(filter, options);
                return deletedObject === null || deletedObject === void 0 ? void 0 : deletedObject._id;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    create(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!item) {
                    throw new Error("Data is required");
                }
                const result = yield contact_model_1.Contact.create(item);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateOne(condition, body, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!body) {
                throw new Error("Body is missing for update");
            }
            try {
                const item = yield contact_model_1.Contact.findOneAndUpdate(condition, body, options);
                if (!item) {
                    throw new Error("No such item available for update");
                }
                return item;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.ContactService = ContactService;

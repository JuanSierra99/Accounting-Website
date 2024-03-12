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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
function createUser(email, password, name) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.user.create({
                        data: {
                            email: email,
                            password: password, // Ensure this is hashed in a real application
                            name: name,
                        },
                    })];
                case 1:
                    user = _a.sent();
                    return [2 /*return*/, user];
            }
        });
    });
}
function createInvoice(amount, dueDate, details, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var invoice;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.invoice.create({
                        data: {
                            amount: amount,
                            due_date: dueDate,
                            details: details,
                            userId: userId,
                        },
                    })];
                case 1:
                    invoice = _a.sent();
                    return [2 /*return*/, invoice];
            }
        });
    });
}
function createBill(amount, dueDate, details, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var bill;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, prisma.bill.create({
                        data: {
                            amount: amount,
                            due_date: dueDate,
                            details: details,
                            userId: userId,
                        },
                    })];
                case 1:
                    bill = _a.sent();
                    return [2 /*return*/, bill];
            }
        });
    });
}
// Function to generate a random number within a range
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Function to generate a random date within the next year
function getRandomDate() {
    var start = new Date();
    var end = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
// Details arrays for random selection
var invoiceDetails = [
    'Web Design Services',
    'Consulting Fee',
    'BOFA',
    'Laptop Purchase',
    'Phone Purchase',
    'Best Buy',
];
var billDetails = [
    'Electric Bill',
    'Car Bill',
    'House Rent',
    'Internet Bill',
    'Water Bill',
];
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var userId, i, invoice, bill;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userId = 1;
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < 5)) return [3 /*break*/, 5];
                    return [4 /*yield*/, createInvoice(getRandomInt(100, 1000), // Random amount between 100 and 1000
                        getRandomDate(), // Random due date within the next year
                        invoiceDetails[getRandomInt(0, invoiceDetails.length - 1)], // Randomly selected detail
                        userId)];
                case 2:
                    invoice = _a.sent();
                    console.log('Created invoice:', invoice);
                    return [4 /*yield*/, createBill(getRandomInt(50, 500), // Random amount between 50 and 500
                        getRandomDate(), // Random due date within the next year
                        billDetails[getRandomInt(0, billDetails.length - 1)], // Randomly selected detail
                        userId)];
                case 3:
                    bill = _a.sent();
                    console.log('Created bill:', bill);
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    });
}
main()
    .catch(function (e) {
    console.error(e);
    throw e;
})
    .finally(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });

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
const db_1 = require("../src/utils/db");
// @ts-ignore
const customers_1 = require("./seeds/customers");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        for (const customer of customers_1.customers) {
            yield db_1.prismaClient.customer.upsert({
                where: { id: customer.id },
                update: {},
                create: customer,
            });
        }
        console.log(`Created ${customers_1.customers.length} customers`);
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.prismaClient.$disconnect();
}));

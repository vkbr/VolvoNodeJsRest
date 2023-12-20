import { PrismaClient } from '../db';

export const prismaClient = new PrismaClient({
  // log: ['query', 'info', 'warn', 'error'],
});

// const mutationActions = new Set(['create', 'update', 'updateMany', 'upsert']);

// const emptyObj = {};

// const primiteTypeOf = new Set(['string', 'number', 'undefined', 'boolean']);

// type WithTs = {
//   createdAtTs: number;
//   updatedAtTs: number;
// };

// const replaceDateTimeWithTs = <
//   Record extends { createdAt: Date; updatedAt: Date },
//   RT = WithTs & Omit<Record, 'createdAt' | 'updatedAt'>,
// >(
//   record: Record,
// ) => {
//   const { createdAt, updatedAt, ...rest } = record;
//   const result: RT = rest as any;

//   if (createdAt instanceof Date) {
//     (result as any).createdAtTs = createdAt.getTime();
//   }
//   if (updatedAt instanceof Date) {
//     (result as any).updatedAtTs = updatedAt.getTime();
//   }

//   return result;
// };

// const isPrimitiveOrDate = (val: any): boolean => {
//   return val === null || primiteTypeOf.has(typeof val) || val instanceof Date;
// };

// const replaceDateTimeWithTsRecursive = (data: any): any => {
//   if (data === undefined || data === null) {
//     return data;
//   }

//   if (Array.isArray(data)) {
//     return data.map(replaceDateTimeWithTsRecursive);
//   }

//   Object.keys(data).forEach((key) => {
//     const item = data[key];
//     if (!isPrimitiveOrDate(item)) {
//       data[key] = replaceDateTimeWithTsRecursive(item);
//     }
//   });

//   return replaceDateTimeWithTs(data);
// };

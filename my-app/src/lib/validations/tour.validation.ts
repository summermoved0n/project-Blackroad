import { z } from "zod";
import {
  Categories,
  PropertyType,
  Province,
  ToursType,
} from "../../../generated/prisma/enums";

const firstString = (value: unknown) => {
  const candidate = Array.isArray(value) ? value[0] : value;
  return typeof candidate === "string" ? candidate : undefined;
};

const enumValue = <T extends string>(value: unknown, values: T[]) => {
  const candidate = firstString(value);
  return candidate && values.includes(candidate as T)
    ? (candidate as T)
    : undefined;
};

const enumList = <T extends string>(value: unknown, values: T[]) => {
  const candidate = firstString(value);
  if (!candidate) return undefined;

  const valid = candidate
    .split(",")
    .filter((item): item is T => values.includes(item as T));
  return valid.length ? valid.join(",") : undefined;
};

const finiteRange = (value: unknown) => {
  const candidate = firstString(value);
  if (!candidate) return undefined;

  const [minimum, maximum, extra] = candidate.split("_");
  const min = Number(minimum);
  const max = Number(maximum);

  return extra === undefined &&
    Number.isFinite(min) &&
    Number.isFinite(max) &&
    min >= 0 &&
    max >= min
    ? `${min}_${max}`
    : undefined;
};

const dateRange = (value: unknown) => {
  const candidate = firstString(value);
  if (!candidate) return undefined;

  const [from, to, extra] = candidate.split("_");
  const fromDate = new Date(from);
  const toDate = new Date(to);

  return extra === undefined &&
    Number.isFinite(fromDate.getTime()) &&
    Number.isFinite(toDate.getTime()) &&
    fromDate <= toDate
    ? candidate
    : undefined;
};

const safePage = (value: unknown) => {
  const page = Number(firstString(value));
  return Number.isSafeInteger(page) && page > 0 ? page : 1;
};

const safeRating = (value: unknown) => {
  const rating = Number(firstString(value));
  return Number.isFinite(rating) && rating >= 0 && rating <= 5
    ? String(rating)
    : undefined;
};

const allowedSorts = [
  "default",
  "price: Low to High",
  "price: High to Low",
  "rating",
  "popularity",
] as const;

export const tourSearchParamsSchema = z.object({
  page: z.unknown().transform(safePage),
  province: z
    .unknown()
    .transform((value) => enumValue(value, Object.values(Province))),
  dates: z.unknown().transform(dateRange),
  rating: z.unknown().transform(safeRating),
  price: z.unknown().transform(finiteRange),
  category: z
    .unknown()
    .transform((value) => enumList(value, Object.values(Categories))),
  tourType: z
    .unknown()
    .transform((value) => enumList(value, Object.values(ToursType))),
  type: z
    .unknown()
    .transform((value) => enumList(value, Object.values(PropertyType))),
  sort: z
    .unknown()
    .transform((value) => enumValue(value, [...allowedSorts])),
});

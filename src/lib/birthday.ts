
import { isAfter, isSameDay, parseISO } from "date-fns";

export const TARGET_BIRTHDAY = "2026-04-30T00:00:00";

export const isBirthdayOrAfter = (testMode: boolean = false) => {
    if (testMode) return true;
    const now = new Date();
    const birthday = parseISO(TARGET_BIRTHDAY);
    return isSameDay(now, birthday) || isAfter(now, birthday);
};

export const isBeforeBirthday = (testMode: boolean = false) => {
    if (testMode) return false;
    const now = new Date();
    const birthday = parseISO(TARGET_BIRTHDAY);
    return !isSameDay(now, birthday) && !isAfter(now, birthday);
};

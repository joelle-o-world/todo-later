import {
  addDays,
  addHours,
  addMinutes,
  getISODay,
  isFriday,
  nextDay,
  nextMonday,
  nextSaturday,
  setHours,
  startOfDay,
} from "date-fns";

const nextWeekday = (now: Date) => {
  if (getISODay(now) >= 4) return nextMonday(now);
  else return addDays(now, 1);
};

const atTime =
  (hours: number, minutes = 0) =>
  (now: Date) =>
    addMinutes(addHours(startOfDay(now), hours), minutes);
const at9am = atTime(9);
const afterWork = atTime(17, 30);
const isWeekday = (now: Date) => getISODay(now) <= 4;

const dateSuggestionLambdas: {
  [label: string]: (now: Date) => Date;
} = {
  "tomorrow at 9am": (now) => at9am(addDays(now, 1)),
  "after work": (now) => {
    if (isWeekday(now) && now < afterWork(now)) return afterWork(now);
    if (isFriday(now) && now > afterWork(now))
      return afterWork(nextMonday(now));
    else if (isWeekday(now) && now > afterWork(now))
      return afterWork(addDays(now, 1));
    else return afterWork(nextMonday(now));
  },
  "in 1 hour": (now) => addHours(now, 1),
  "in 2 hours": (now) => addHours(now, 2),
  "in 3 hours": (now) => addHours(now, 3),
  "in 4 hours": (now) => addHours(now, 4),
  "in 5 hours": (now) => addHours(now, 5),
  "in 6 hours": (now) => addHours(now, 6),
  "this time tomorrow": (now) => addHours(now, 24),
  "in 24 hours": (now) => addHours(now, 24),
  "next weekend": (now) => at9am(nextSaturday(now)),
  "this time next week": (now) => addDays(now, 7),
  now: (now) => now,
  "in 5 minutes": (now) => addMinutes(now, 5),
  "in 10 minutes": (now) => addMinutes(now, 10),
  "in 15 minutes": (now) => addMinutes(now, 15),
  "in 30 minutes": (now) => addMinutes(now, 15),
  "in 45 minutes": (now) => addMinutes(now, 15),
  "in 90 minutes": (now) => addMinutes(now, 15),
  "after lunch": (now) => addMinutes(addHours(startOfDay(now), 13), 45),
  "this evening": atTime(20),
  "tomorrow evening": (now) => atTime(20)(addDays(now, 1)),
  "next monday at 9am": (now) => at9am(nextMonday(now)),
};

export const timeSuggestions = (function getTimeSuggestions() {
  return Object.keys(dateSuggestionLambdas).map((key) => ({
    kind: "time" as const,
    time: {
      label: key,
      dateFunction: dateSuggestionLambdas[key],
    },
  }));
})();

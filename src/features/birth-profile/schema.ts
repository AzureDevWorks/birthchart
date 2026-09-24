import { z } from 'zod';
import { DateTime } from 'luxon';
import { isValidLatitude, isValidLongitude, isValidTimezone } from '@/domain/geo/place';

const placeSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  shortLabel: z.string().min(1),
  lat: z.number().refine(isValidLatitude, 'Invalid latitude'),
  lon: z.number().refine(isValidLongitude, 'Invalid longitude'),
  timezone: z.string().refine(isValidTimezone, 'Invalid timezone'),
  countryCode: z.string().optional(),
  admin1: z.string().optional(),
  placeType: z.enum(['city', 'town', 'village', 'unknown']),
});

export const birthFormSchema = z
  .object({
    profileName: z.string().trim().min(1, 'nameRequired').max(100, 'nameTooLong'),
    localDate: z.string().min(1, 'dateRequired'),
    localTime: z.string().min(1, 'timeRequired'),
    place: placeSchema.nullable(),
  })
  .superRefine((data, ctx) => {
    if (!data.place) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['place'],
        message: 'placeRequired',
      });
      return;
    }

    const dt = DateTime.fromISO(`${data.localDate}T${data.localTime}`, {
      zone: data.place.timezone,
    });

    if (!dt.isValid) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['localTime'],
        message: 'invalidDateTime',
      });
      return;
    }

    if (dt.year < 1900) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['localDate'],
        message: 'dateTooEarly',
      });
    }
    if (dt > DateTime.utc()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['localDate'],
        message: 'dateFuture',
      });
    }
  });

export type BirthFormValues = z.infer<typeof birthFormSchema>;

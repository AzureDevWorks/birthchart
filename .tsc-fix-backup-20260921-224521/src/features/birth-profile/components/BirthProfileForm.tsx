import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IconSparkle } from '@/components/icons';
import { birthFormSchema, type BirthFormValues } from '../schema';
import { useBirthStore } from '../store';
import { PlaceCombobox } from './PlaceCombobox';
import { BirthDateField } from './BirthDateField';
import { PlacePreview } from './PlacePreview';
import type { Place } from '@/domain/geo/place';

const TODAY = new Date().toISOString().slice(0, 10);

export function BirthProfileForm() {
  const { t } = useTranslation();
  const addProfile = useBirthStore((s) => s.addProfile);
  const [showPreview, setShowPreview] = useState(true);

  const form = useForm<BirthFormValues>({
    resolver: zodResolver(birthFormSchema),
    defaultValues: {
      profileName: '',
      localDate: '',
      localTime: '',
      place: null,
    },
    mode: 'onChange',
  });

  const place = form.watch('place');
  const localDate = form.watch('localDate');
  const localTime = form.watch('localTime');

  const onSubmit = (values: BirthFormValues) => {
    if (!values.place) return;
    addProfile({
      profileName: values.profileName,
      localDate: values.localDate,
      localTime: values.localTime,
      place: values.place,
    });
    toast.success(`Chart for ${values.profileName} is ready.`);
  };

  const translateError = (key?: string) =>
    key ? t(`birth.errors.${key}`) : undefined;

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconSparkle size={18} className="text-primary" />
          {t('birth.title')}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{t('birth.subtitle')}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="profileName">{t('birth.name')}</Label>
            <Input
              id="profileName"
              placeholder={t('birth.namePlaceholder')}
              {...form.register('profileName')}
            />
            {form.formState.errors.profileName && (
              <p className="text-xs text-destructive">
                {translateError(form.formState.errors.profileName.message)}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>{t('birth.date')}</Label>
              <Controller
                control={form.control}
                name="localDate"
                render={({ field }) => (
                  <BirthDateField
                    value={field.value}
                    onChange={field.onChange}
                    minYear={1900}
                    maxYear={new Date().getFullYear()}
                  />
                )}
              />
              {form.formState.errors.localDate && (
                <p className="text-xs text-destructive">
                  {translateError(form.formState.errors.localDate.message)}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="localTime">{t('birth.time')}</Label>
              <Input
                id="localTime"
                type="time"
                step="1"
                {...form.register('localTime')}
              />
              {form.formState.errors.localTime && (
                <p className="text-xs text-destructive">
                  {translateError(form.formState.errors.localTime.message)}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t('birth.city')}</Label>
            {!place || !showPreview ? (
              <Controller
                control={form.control}
                name="place"
                render={({ field }) => (
                  <PlaceCombobox
                    value={field.value as Place | null}
                    onChange={(p) => {
                      field.onChange(p);
                      setShowPreview(true);
                    }}
                  />
                )}
              />
            ) : (
              <PlacePreview
                place={place}
                localDate={localDate}
                localTime={localTime}
                onChange={() => setShowPreview(false)}
              />
            )}
            {form.formState.errors.place && (
              <p className="text-xs text-destructive">
                {translateError(form.formState.errors.place.message)}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            {t('birth.submit')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

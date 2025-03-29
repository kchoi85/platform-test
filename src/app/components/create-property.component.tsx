// CreateProperty.tsx
'use client';

import { Box } from '@radix-ui/themes';
import { DOWNTOWN_TORONTO_CENTER_COORDS } from '../constants';
import { useCreateProperty } from '../hooks';
import { AddressAutocomplete, MapboxMap } from '../shared/components';

export function CreateProperty() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    errors,
    onSubmit,
    isSubmitting,
  } = useCreateProperty();

  // get all the values from the form
  const formValues = watch();
  console.log('Form Values:', formValues);

  // When the map is clicked, update the form values.
  const handleMapClick = (lat: number, lng: number) => {
    setValue('latitude', lat);
    setValue('longitude', lng);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-lg font-medium text-gray-800">Create Property</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 flex flex-col justify-between min-h-[300px]"
      >
        <div className="space-y-4 pt-5">
          {/* Property Title Field */}
          <div>
            <label
              htmlFor="property-title"
              className="block text-sm font-medium text-gray-700"
            >
              Property Title
            </label>
            <input
              {...register('title')}
              id="property-title"
              placeholder="Property Title"
              className="w-full border text-gray-900 border-gray-300 py-1 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-500"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Address Autocomplete Field */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <AddressAutocomplete
              onSelect={({
                address,
                latitude,
                longitude,
                postalCode,
                street,
                city,
                province,
                country,
              }) => {
                setValue('address', address);
                setValue('latitude', latitude);
                setValue('longitude', longitude);
                setValue('postalCode', postalCode);
                setValue('street', street);
                setValue('city', city);
                setValue('province', province);
                setValue('country', country);
              }}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
            <small className="text-gray-500 text-sm">
              Note: Start typing the address and select from the suggestions for
              auto-fill
            </small>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-200 text-gray-500 rounded py-2 px-4 cursor-not-allowed ellipsis overflow-hidden whitespace-nowrap text-ellipsis">
              Street: {formValues.street}
            </div>
            <div className="bg-gray-200 text-gray-500 rounded py-2 px-4 cursor-not-allowed ">
              City: {formValues.city}
            </div>
            <div className="bg-gray-200 text-gray-500 rounded py-2 px-4 cursor-not-allowed ">
              Country: {formValues.country}
            </div>
            <div className="bg-gray-200 text-gray-500 rounded py-2 px-4 cursor-not-allowed ">
              Province: {formValues.province}
            </div>
            <div className="bg-gray-200 text-gray-500 rounded py-2 px-4 cursor-not-allowed ">
              Postal Code: {formValues.postalCode}
            </div>
          </div>

          <div className="mt-6">
            {formValues.latitude && formValues.longitude && (
              <p className="text-sm text-gray-800">
                Coordinates: Latitude {formValues.latitude}, Longitude{' '}
                {formValues.longitude}
              </p>
            )}

            <MapboxMap
              latitude={
                formValues.latitude || DOWNTOWN_TORONTO_CENTER_COORDS[0]
              }
              longitude={
                formValues.longitude || DOWNTOWN_TORONTO_CENTER_COORDS[1]
              }
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full min-h-[40px] text-md flex items-center justify-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 hover:cursor-pointer"
        >
          {isSubmitting ? 'Creating...' : 'Create Property'}
        </button>
      </form>
    </div>
  );
}

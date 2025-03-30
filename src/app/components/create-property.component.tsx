'use client';

import { Controller } from 'react-hook-form';
import { DOWNTOWN_TORONTO_CENTER_COORDS } from '../constants';
import { useCreateProperty, useGetAllUsers } from '../hooks';
import { AddressAutocomplete, MapboxMap } from '../shared/components';
import { Select, Spinner } from '@radix-ui/themes';
import { useState } from 'react';

export function CreateProperty() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    errors,
    onSubmit,
    isSubmitting,
    control,
  } = useCreateProperty();

  const { users, isLoading: usersLoading } = useGetAllUsers();

  const formValues = watch();

  // A state to force re-mounting the AddressAutocomplete after submission
  const [autocompleteKey, setAutocompleteKey] = useState(0);

  // workaround to reset the values for AddressAutocomplete
  const handleFormSubmit = async (data: any) => {
    await onSubmit(data);
    // Change the key to force re-mount AddressAutocomplete and clear its internal state
    setAutocompleteKey((prev) => prev + 1);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-base font-medium text-gray-800">
        Add a new property
      </h1>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-4 flex flex-col justify-between min-h-[300px]"
      >
        <div className="space-y-4 pt-5">
          {/* Property Title Field */}
          <div>
            <label
              htmlFor="property-title"
              className="block text-sm font-medium text-gray-700"
            >
              Property Title<span className="text-red-500">*</span>
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

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address<span className="text-red-500">*</span>
            </label>
            <AddressAutocomplete
              key={autocompleteKey}
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

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Street', value: formValues.street },
              { label: 'City', value: formValues.city },
              { label: 'Country', value: formValues.country },
              { label: 'Province', value: formValues.province },
              { label: 'Postal Code', value: formValues.postalCode },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex items-center text-sm bg-gray-200 text-gray-500 rounded py-2 px-2 cursor-not-allowed max-h-[30px] ellipsis overflow-hidden whitespace-nowrap text-ellipsis"
              >
                {label}: {value}
              </div>
            ))}
          </div>

          <div className="mt-6">
            {formValues.latitude && formValues.longitude && (
              <p className="text-sm text-gray-800">
                Coordinates: Latitude {formValues.latitude}, Longitude{' '}
                {formValues.longitude}
              </p>
            )}

            <MapboxMap
              pageHeight={'250px'}
              latitude={
                formValues.latitude || DOWNTOWN_TORONTO_CENTER_COORDS[0]
              }
              longitude={
                formValues.longitude || DOWNTOWN_TORONTO_CENTER_COORDS[1]
              }
            />

            <h1 className="text-base pt-4 font-medium text-gray-800">
              Assign property owner<span className="text-red-500">*</span>
            </h1>
            <div className="mt-2 w-full ">
              {usersLoading ? (
                <Spinner />
              ) : (
                <Controller
                  name={'ownerId'}
                  control={control}
                  render={({ field }) => {
                    const selectedUser = users?.find(
                      (user) => user.id == field.value
                    );
                    return (
                      <Select.Root
                        value={String(field.value)}
                        onValueChange={field.onChange}
                      >
                        <Select.Trigger
                          style={{ width: '100%', height: '36px' }}
                        >
                          {selectedUser
                            ? selectedUser.name
                            : 'Select from dropdown'}
                        </Select.Trigger>
                        <Select.Content>
                          {users?.map((user) => (
                            <Select.Item key={user.id} value={String(user.id)}>
                              {user.name}
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Root>
                    );
                  }}
                />
              )}
              {errors.ownerId && (
                <p className="text-red-500 text-sm">{errors.ownerId.message}</p>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full min-h-[40px] text-md flex items-center justify-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 hover:cursor-pointer"
        >
          {isSubmitting ? <Spinner /> : 'Create Property'}
        </button>
      </form>
    </div>
  );
}

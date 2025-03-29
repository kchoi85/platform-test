'use client';

import { Select, Spinner } from '@radix-ui/themes';
import { useCreateUser } from '../hooks';
import { Role } from '../shared/enums';
import { Controller } from 'react-hook-form';

export function CreateUserForm() {
  const { control, register, handleSubmit, errors, onSubmit, isSubmitting } =
    useCreateUser();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white p-6 rounded-lg shadow-lg h-full flex flex-col justify-between"
    >
      <div>
        <h2 className="text-xl text-gray-800 border-b border-gray-300 pb-2">
          Create New User
        </h2>

        <div className="space-y-4 pt-5">
          {/* Name input */}
          <input
            {...register('name')}
            className="w-full border text-gray-900 border-gray-300 py-1 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-500"
            placeholder="Full Name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          {/* Email input */}
          <input
            {...register('email')}
            className="w-full border text-gray-900 border-gray-300 py-1 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-500"
            placeholder="Email"
            type="email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          {/* Role select using Controller for custom input */}
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select.Root value={field.value} onValueChange={field.onChange}>
                <Select.Trigger className="w-full border text-gray-900 border-gray-300 py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-500">
                  <span>
                    {field.value
                      ? field.value.charAt(0).toUpperCase() +
                        field.value.slice(1).toLowerCase()
                      : 'Select Role'}
                  </span>
                </Select.Trigger>
                <Select.Content>
                  {Object.values(Role || {}).map((role: string) => (
                    <Select.Item key={role} value={role}>
                      {role.charAt(0).toUpperCase() +
                        role.slice(1).toLowerCase()}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
            )}
          />
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full min-h-[40px] text-md flex items-center justify-center  bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 hover:cursor-pointer"
      >
        {isSubmitting ? <Spinner /> : 'Create User'}
      </button>
    </form>
  );
}

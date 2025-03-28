'use client';

import { useCreateUser } from '../hooks';

export function CreateUserForm() {
  const { formData, handleChange, handleSubmit, isPending } = useCreateUser();

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow-lg h-full flex flex-col justify-between"
    >
      <div>
        <h2 className="text-xl text-gray-800 border-b border-gray-300 pb-2">
          Create New User
        </h2>

        <div className="space-y-4 pt-5">
          <input
            name="name"
            className="w-full border text-gray-900 border-gray-300 py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-500"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            className="w-full border text-gray-900 border-gray-300 py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-500"
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full text-md bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 hover:cursor-pointer"
      >
        {isPending ? 'Creating...' : 'Create User'}
      </button>
    </form>
  );
}

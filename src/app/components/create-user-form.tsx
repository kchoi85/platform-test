'use client';

import { useCreateUser } from '../hooks';

export function CreateUserForm() {
  const { formData, handleChange, handleSubmit, isPending } = useCreateUser();

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-4 rounded shadow-md"
    >
      <h2 className="text-lg font-semibold text-gray-800">Create New User</h2>

      <div className="space-y-2">
        <input
          name="name"
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {isPending ? 'Creating...' : 'Create User'}
      </button>
    </form>
  );
}

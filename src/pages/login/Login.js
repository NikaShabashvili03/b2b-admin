import React from 'react';

function LoginPage() {
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-semibold mb-6">Admins Login</h1>
        <form className="flex flex-col">
          <label htmlFor="username" className="mb-2 font-bold text-left text-lg">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            className="p-3 mb-5 border border-gray-300 rounded-md text-lg"
          />

          <label htmlFor="password" className="mb-2 font-bold text-left text-lg">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="p-3 mb-6 border border-gray-300 rounded-md text-lg"
          />

          <button
            type="submit"
            className="p-3 text-lg font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

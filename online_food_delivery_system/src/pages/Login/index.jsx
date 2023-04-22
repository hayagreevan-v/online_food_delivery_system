import React from "react";

const LoginPage =() => {
  return (
<body className="bg-gray-900 text-white">
<div className="flex justify-center">
  <form className="bg-gray-800 p-10 rounded-lg">
    <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
    <div className="mb-4">
      <label htmlFor="username" className="block mb-2">Username</label>
      <input type="text" id="username" name="username" className="w-full px-3 py-2  rounded-md bg-wheat-700 focus:outline-none focus:bg-orange-250 text-black font-bold" />
    </div>
    <div className="mb-4">
      <label htmlFor="password" className="block mb-2">Password</label>
      <input type="password" id="password" name="password" className="w-full px-3 py-2  rounded-md bg-wheat-700 focus:outline-none focus:bg-orange-250 text-black font-bold" />
    </div>
    <button type="submit" className="w-full bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline">Login</button>
  </form>
</div>
</body>

  );
}

export default LoginPage;

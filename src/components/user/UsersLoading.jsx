import React from 'react'

const UsersLoading = () => (
  <div className="grid grid-cols-10 border-b last:border-none animate-pulse">
    <div className="py-4 px-4">
      <div className="h-4 bg-gray-300 rounded w-4"></div>
    </div>
    <div className="py-4 col-span-2 flex items-center gap-2">
      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
      <div className="h-4 bg-gray-300 rounded w-24"></div>
    </div>
    <div className="py-4 px-4">
      <div className="h-4 bg-gray-300 rounded w-32"></div>
    </div>
    <div className="py-4 px-28 col-span-2">
      <div className="h-4 bg-gray-300 rounded w-10"></div>
    </div>
    <div className="py-4 px-4">
      <div className="h-4 bg-gray-300 rounded w-20"></div>
    </div>
    <div className="py-4 px-4">
      <div className="h-4 bg-gray-300 rounded w-16"></div>
    </div>
    <div className="py-4 px-4">
      <div className="h-4 bg-gray-300 rounded w-20"></div>
    </div>
    <div className="py-4 px-4">
      <div className="h-4 bg-gray-300 rounded w-16"></div>
    </div>
  </div>
);


export default UsersLoading;
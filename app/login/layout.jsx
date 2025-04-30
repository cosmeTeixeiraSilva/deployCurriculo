"use client";
export default function Layout({ children }) {
  return (
    <div className="flex flex-col sm:shadow-lg sm:shadow-orange-500 w-screen   h-screen bg-[#121212]   justify-start items-center mx-auto overflow-hidden">
      {children}
    </div>
  );
}

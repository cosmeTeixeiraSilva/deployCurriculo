"use client"
export default function Layout({ children }) {
    return (

        <div className="flex flex-col sm:shadow-lg sm:shadow-orange-500 sm:w-2/3   h-screen bg-[#121212]   items-center justify-center mx-auto overflow-hidden">


            {children}
        </div>
    )
}

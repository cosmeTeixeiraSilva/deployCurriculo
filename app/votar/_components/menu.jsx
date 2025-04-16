import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

export default function Menu() {
  return (
    <nav className="bg-blue-600 py-2   w-screen  flex items-center justify-end border-b-4 ">
      <Link href={"/home"}>
        <Button className="bg-orange-400 text-xl h-12 border-2 w-[30vw] mr-4 sm:w-[10vw] font-bold hover:opacity-60 hover:bg-orange-400">
          Home
        </Button>
      </Link>
    </nav>
  );
}

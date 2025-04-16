import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

export default function Menu() {
  return (
    <nav className="bg-blue-600 py-4 text-center w-screen  border-b-2 ">
      <Link href={"/home"}>
        <Button className="bg-orange-400 border-2 text-2xl h-12 w-[90vw] sm:w-[50vw] font-bold hover:opacity-60 hover:bg-orange-400">
          Home
        </Button>
      </Link>
    </nav>
  );
}

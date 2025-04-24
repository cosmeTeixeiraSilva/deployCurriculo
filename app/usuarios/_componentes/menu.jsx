import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

export default function Menu() {
  return (
    <nav className="bg-[#004A8D] p-1 flex   items-center justify-end  border-b-2  w-screen sm:w-full">
      <Link href={"/home"}>
        <Button className="bg-[#F7941D] border-2 text-xl  mr-6 sm:mr-0 h-12 w-[30vw] sm:w-[10vw] font-bold hover:opacity-60 hover:bg-[#F7941D]">
          Home
        </Button>
      </Link>
    </nav>
  );
}

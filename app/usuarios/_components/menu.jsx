import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
export default function Menu() {
  return (
    <>
      <nav className="bg-orange-500 p-1 flex   items-center justify-end  w-screen z-50 border-b-4 ">
        <Link href={"/home"}>
          <Button className="bg-blue-500 border-2 text-xl mr-1 h-12 w-[30vw] sm:w-[10vw] font-bold hover:opacity-60 hover:bg-blue-500">
            Home
          </Button>
        </Link>
      </nav>
    </>
  );
}

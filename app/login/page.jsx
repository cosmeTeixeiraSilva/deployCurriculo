// app/login/page.js

import Formlogin from "./_components/formlogin";
import HeaderLogin from "./_components/header";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-start justify-center w-full ">
      <div className="p-4 text-white">
        <HeaderLogin />
        <Formlogin />
        <Image
          src={"/semanaS.svg"}
          alt="foguete"
          width={200}
          height={100}
          className="mx-auto mt-8"
        />
      </div>
    </main>
  );
}

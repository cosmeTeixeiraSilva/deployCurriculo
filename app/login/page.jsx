// app/login/page.js

import Formlogin from "./_components/formlogin";
import HeaderLogin from "./_components/header";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="flex flex-col min-h-screen items-start justify-start w-screen sm:w-1/2 mx-auto ">
      <HeaderLogin />
      <Formlogin />
      <Image
        src={"/semanaS.svg"}
        alt="foguete"
        width={250}
        height={200}
        className="mx-auto mt-10"
      />
    </main>
  );
}

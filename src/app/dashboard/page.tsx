import Homepage from '../../components/component/Homepage';
import React from "react";
import { auth } from "@/auth";
import Link from "next/link";

import { redirect } from 'next/navigation'
export default async function page() {

  const session = await auth();
  // console.log(session);
  if (!session) {
    redirect('/signup')
  }
  return (
    <div>
      <Homepage session={session} />
    </div>
  );
}

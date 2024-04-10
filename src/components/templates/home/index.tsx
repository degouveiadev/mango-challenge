import Image from "next/image";
import Link from 'next/link'
import { LinkContainer } from "./home.style";

export const HomeTemplate = () => {
  return (
    <main>
      <Image
        src="/mango.svg"
        alt="Mango Logo"
        width={200}
        height={100}
        priority
      />

      <LinkContainer>
        <Link href='/exercise1'>Exercise 1</Link>
        <Link href='/exercise2'>Exercise 2</Link>
      </LinkContainer>
    </main>
  );
}

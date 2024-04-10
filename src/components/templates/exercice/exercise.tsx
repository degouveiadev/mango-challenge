import Image from "next/image";
import { LayoutContainer } from "./exercise.style";

type LayoutProps = {
  children: React.ReactNode;
}

export const ExerciseLayout = ({ children }: LayoutProps) => {
  return (
    <LayoutContainer>
      <Image
        src="/mango.svg"
        alt="Mango Logo"
        width={200}
        height={100}
        priority
      />
      {children}
    </LayoutContainer>
  )
}

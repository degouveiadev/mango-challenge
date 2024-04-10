import Image from "next/image";
import { LayoutContainer } from "./exercise.style";
import { ErrorPage } from "@/shared/error";

type LayoutProps = {
  children: React.ReactNode;
  hasError?: boolean;
  statusCode?: number
}

export const ExerciseLayout = ({ children, hasError, statusCode }: LayoutProps) => {
  const renderView = () => {
    if (hasError) return <ErrorPage statusCode={statusCode} />

    return (
      <>
        <Image
          src="/mango.svg"
          alt="Mango Logo"
          width={200}
          height={100}
          priority
        />
        {children}
      </>
    )
  }

  return (
    <LayoutContainer>
      {renderView()}
    </LayoutContainer>
  )
}

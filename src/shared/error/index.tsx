import { useRouter } from "next/router"
import { Button, ErrorContainer, ErrorText, ErrorCode } from "./error.style"

type ErrorPageProps = {
  statusCode?: number;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({ statusCode }) => {
  const router = useRouter()

  const handleRedirect = () => {
    router.push('/')
  }

  return (
    <ErrorContainer>
      <ErrorText>Something went wrong</ErrorText>
      <ErrorCode>Error {statusCode}</ErrorCode>
      <Button onClick={handleRedirect}>Go to home</Button>
    </ErrorContainer>
  )
}

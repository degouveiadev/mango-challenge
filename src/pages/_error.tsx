import { NextPageContext } from 'next'
import { ErrorPage as Layout } from '@/shared/error'

interface ErrorPageProps {
  statusCode?: number;
}

export default function  ErrorPage({ statusCode }: ErrorPageProps) {
  return <Layout statusCode={statusCode} />
}

export async function getServerSideProps ({ res, err }: NextPageContext) {
  const statusCode = res ? res.statusCode : err ? err.statusCode || 404 : 404

  return {
    props: {
      statusCode
    }
  }
}

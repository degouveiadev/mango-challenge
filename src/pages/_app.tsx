import { globalStyles } from '@/shared/global-styles'
import { Global } from '@emotion/react'

const App = ({ Component, pageProps }: { Component: React.ElementType, pageProps: any }) => (
  <>
    <Global styles={globalStyles} />
    <Component {...pageProps} />
  </>
)

export default App

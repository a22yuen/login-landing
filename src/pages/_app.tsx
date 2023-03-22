import '@/styles/globals.css'
import { useState } from 'react'
import type { AppProps } from 'next/app'
import { Context } from '@/context'

export default function App({ Component, pageProps }: AppProps) {
  const [cartItems, setCartItems] = useState({})

  return (
    <Context.Provider value={{cartItems,setCartItems}}>
      <Component {...pageProps} />
    </Context.Provider>
  )
}

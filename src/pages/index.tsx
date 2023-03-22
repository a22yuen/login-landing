import Head from 'next/head'
import { Inter } from 'next/font/google'
import Login from '@/components/Login'
import Header from '@/components/Header'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <div className='bg-gray-100 h-screen'>
        <Header/>
        <Login/>
      </div>
    </>
  )
}

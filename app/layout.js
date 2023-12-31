import LoginProvider from '@/context/LoginContext'
import './globals.css'
import { Inter } from 'next/font/google'
import UserProvider from '@/context/UserContext'
import ToastContainer from '@/components/ToastContainer'
import Header from '@/components/Header'
import CountProvider from '@/context/Count'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LoginProvider>
          <UserProvider>
            <ToastContainer />
            <Header />
            <CountProvider>
              {children}
            </CountProvider>
          </UserProvider>
        </LoginProvider>
      </body>
    </html>
  )
}

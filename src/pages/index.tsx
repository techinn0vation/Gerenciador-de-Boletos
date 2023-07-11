import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Home = () => {
  const router = useRouter()

  useEffect(() => {
    const redirect = async () => {
      await router.push('/login')
    }
    void redirect()
  }, [router])

  return null
}

export default Home

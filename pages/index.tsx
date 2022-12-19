import { useRef } from 'react'
import useSwipeHook from '../hooks/useSwipeHook'
import { useRouter } from 'next/router'

export default function Home() {
  const swipeContainerRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const leftSwipeCallback = () => router.push('/group-selector')
  const rightSwipeCallback = () => null;
  const upSwipeCallback = () => () => null
  const downSwipeCallback = () => () => null
  useSwipeHook(swipeContainerRef, leftSwipeCallback, rightSwipeCallback, upSwipeCallback, downSwipeCallback)

  return (
    <div ref={swipeContainerRef} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '100vh' }}>
      <h3>30 min workout</h3>
      <span>⇠ Swipe left to begin ⇠ </span>
    </div>
  )
}
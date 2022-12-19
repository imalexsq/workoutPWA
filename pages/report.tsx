import { useRef } from 'react'
import useSwipeHook from '../hooks/useSwipeHook'
import {useRouter} from 'next/router'

export default function Report() {
const swipeContainerRef = useRef<HTMLInputElement>(null)
const router = useRouter()
const leftSwipeCallback = () => router.push('/')
const rightSwipeCallback = () => router.push('/group-selector')
const upSwipeCallback = () => () => null
  const downSwipeCallback = () => () => null
useSwipeHook(swipeContainerRef, leftSwipeCallback, rightSwipeCallback,upSwipeCallback, downSwipeCallback)

  return (
    <div ref={swipeContainerRef}>
      <h3>Reporting coming soon...</h3>
    </div>
  )
}
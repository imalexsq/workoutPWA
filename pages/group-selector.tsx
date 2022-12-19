// @ts-nocheck
import { useState, useEffect, useRef } from 'react'
import useSwipeHook from '../hooks/useSwipeHook'
import styles from '../styles/group-selector.module.css'
import { useRouter } from 'next/router'
import Item from '../components/Item'

export default function GroupSelector() {
  const router = useRouter()
  const [musclesData, setMusclesData] = useState<[]>([])
  const [selection, setSelection] = useState<[]>([])
  const [isLoading, setLoading] = useState<boolean>(false)
  const swipeContainerRef = useRef<HTMLInputElement>(null)

  const leftSwipeCallback = () => router.push({
    pathname: '/exercise',
    query: {
      m: selection
    }
  })
  const rightSwipeCallback = () => router.push('/')
  const upSwipeCallback = () => () => null
  const downSwipeCallback = () => () => null

  useSwipeHook(swipeContainerRef, leftSwipeCallback, rightSwipeCallback, upSwipeCallback, downSwipeCallback)

  useEffect(() => {
    setLoading(true)
    fetch('https://wger.de/api/v2/muscle/')
      .then(r => r.json())
      .then(data => {
        setMusclesData(data.results);
        setLoading(false)
      }
      )
  }, [])


  const handleSelection = (event: HTMLInputElement) => {
    const groupId = Number(event.target.id)
    setSelection(prev => prev.some(e => e === groupId) ? prev.filter(x => x !== groupId) : [...prev, groupId])
  }

  return (
    <div className={styles.container}
      ref={swipeContainerRef}
    >
      {isLoading ? '<h1>Loading...</h1>' : musclesData.filter(group => group.name_en).map(m =>
        <Item key={m.id} item={m} handleSelection={handleSelection} />
      )}
    </div>
  )
}

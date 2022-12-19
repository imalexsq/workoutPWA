// @ts-nocheck
import React, { useState, useEffect, useRef } from "react"
import useSwipeHook from '../hooks/useSwipeHook'
import styles from '../styles/exercise.module.css'
import { useRouter } from 'next/router'

function Counter() {
  const [sets, setSets] = useState(4)
  const [reps, setReps] = useState(10)
  return (
    <div className={styles.counter}>
      <div >
        <span>Sets</span>
        <button onClick={() => setSets(p => p -= 1)}>-</button>
        <span>
          {sets}
        </span>
        <button onClick={() => setSets(p => p += 1)}>+</button>
      </div>
      <div>
        <button onClick={() => setReps(p => p -= 1)}>-</button>
        <span>
          {reps}
        </span>
        <button onClick={() => setReps(p => p += 1)}>+</button>
        <span>Reps</span>
      </div>
    </div>
  )
}


export default function Exercise() {
  const [exercise, setExercise] = useState([])
  const [count, setCount] = useState(0)
  const [isLoading, setLoading] = useState(false)
  const videoRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const swipeContainerRef = useRef<HTMLInputElement>(null)
  const leftSwipeCallback = () => router.push('/report')
  const rightSwipeCallback = () => router.push('/group-selector')
  const upSwipeCallback = () => setCount(p => p += 1 );
  const downSwipeCallback = () => setCount(p => p -= 1)

  useSwipeHook(swipeContainerRef, leftSwipeCallback, rightSwipeCallback, upSwipeCallback, downSwipeCallback)

  const fetchVideos = (groups) => {
    fetch(`https://wger.de/api/v2/exercisebaseinfo/?format=json&${Array.isArray(groups) ? groups.map(number => `muscles=${number}`).join('&') : groups}`)
      .then(res => res.json())
      .then((data) => {
        setLoading(false)
        const videosOnlyResults = data.results.filter(x => x.videos.length >= 1)
        setExercise(videosOnlyResults)
      })
  }

  useEffect(() => {
    videoRef.current?.load();
  }, [count])

  useEffect(() => {
    if (Object.keys(router.query).length > 0) {
      setLoading(true)
      fetchVideos(router.query.m)
    }
  }, [router.query])

  return (
    <div className={styles.container}
      ref={swipeContainerRef}
    >
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className={styles.overlay}>
            <h1>{exercise[count]?.exercises[0].name}</h1>
            <Counter />
          </div>
          <div className={styles.instructions}>
            {exercise[count]?.videos[0]?.video && (
              <video className={styles.video} ref={videoRef} playsInline muted autoPlay loop>
                <source src={exercise[count]?.videos[0].video} type="video/mp4" />
              </video>
            )}
          </div>
        </>
      )}
    </div>
  )
}

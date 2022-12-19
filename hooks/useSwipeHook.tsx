import { useRef, useEffect } from 'react';

export default function useSwipe(elRef, leftSwipe, rightSwipe, upSwipe, downSwipe) {
  const leftSwipeRef = useRef();
  leftSwipeRef.current = leftSwipe;

  const rightSwipeRef = useRef();
  rightSwipeRef.current = rightSwipe;

  const upSwipeRef = useRef();
  upSwipeRef.current = upSwipe;

  const downSwipeRef = useRef();
  downSwipeRef.current = downSwipe;

  useEffect(() => {
    const Hammer = require('hammerjs');
    if (!elRef || !elRef.current) {
      console.error('UseSwipe hook need reference of swipe container');
      return;
    }

    const container = elRef.current;
    const HammerScroll = new Hammer.Manager(container);
    const Swipe = new Hammer.Swipe();

    HammerScroll.add(Swipe);
    HammerScroll.on('swipeleft', () => leftSwipeRef.current());
    HammerScroll.on('swiperight', () => rightSwipeRef.current());
    HammerScroll.on('swipeup', () => upSwipeRef.current());
    HammerScroll.on('swipedown', () => downSwipeRef.current());


    return () => {
      HammerScroll.off('swipeleft');
      HammerScroll.off('swiperight');
      HammerScroll.off('swipeup');
      HammerScroll.off('swipedown');
    };
  }, [leftSwipeRef, rightSwipeRef, upSwipeRef, downSwipeRef]);
}
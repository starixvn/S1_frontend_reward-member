import { RefObject, useEffect, useRef, useState } from 'react'

const useInView = (): [RefObject<HTMLDivElement>, boolean] => {
	const elementRef: RefObject<HTMLDivElement> = useRef(null)
	const [isInView, setIsInView] = useState(false)

	useEffect(() => {
		const node = elementRef?.current

		if (!node) return

		const observerCallback = (entries: IntersectionObserverEntry[]) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					setIsInView(true)
				} else {
					setIsInView(false)
				}
			})
		}

		const options = {
			threshold: 0,
			root: null,
			rootMargin: '5%',
		}

		const observer = new IntersectionObserver(observerCallback, options)

		observer.observe(node)
	}, [])

	return [elementRef, isInView]
}

export { useInView }

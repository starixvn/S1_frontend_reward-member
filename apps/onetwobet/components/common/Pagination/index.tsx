import classNames from 'classnames'
import { FC } from 'react'

interface IPaginationProps {
	currentPage: number
	totalPages: number
	onChange: (n: number) => void
}

const Pagination: FC<IPaginationProps> = ({
	currentPage,
	totalPages,
	onChange,
}) => {
	const handlePageNumberChange = target => {
		let page = 1
		if (!isNaN(target)) {
			page = target
		} else {
			switch (target) {
				case 'first':
					page = 1
					break
				case 'prev':
					page = currentPage === 1 ? 1 : currentPage - 1
					break
				case 'last':
					page = totalPages
					break
				case 'next':
					page = currentPage === totalPages ? totalPages : currentPage + 1
					break
			}
		}
		if (page !== currentPage && onChange) {
			onChange(page)
		}
	}
	const getPageNumberList = (currentPage, totalPages) => {
		const range: any = [1]
		if (totalPages <= 1) return range
		const range_of_head = currentPage - 2
		const range_of_tail = currentPage + 2
		if (range_of_head - 1 > 1) {
			range.push('...')
		}
		for (let i = range_of_head; i <= range_of_tail; i++) {
			if (i < totalPages && i > 1) range.push(i)
		}
		if (totalPages - range_of_tail > 1) {
			range.push('...')
		}
		range.push(totalPages)
		return range
	}
	const pageNumberList = getPageNumberList(currentPage, totalPages)

	return (
		<div className='pagination'>
			<a
				onClick={() => handlePageNumberChange('first')}
				className='icon icon-first_page'
			/>
			<a
				onClick={() => handlePageNumberChange('prev')}
				className='icon icon-keyboard_arrow_left'
			/>
			{pageNumberList.map(value => (
				<a
					key={value}
					className={classNames({ active: value === currentPage })}
					onClick={() => handlePageNumberChange(value)}
				>
					{value}
				</a>
			))}
			<a
				onClick={() => handlePageNumberChange('next')}
				className='icon icon-keyboard_arrow_right1'
			/>
			<a
				onClick={() => handlePageNumberChange('last')}
				className='icon icon-last_page'
			/>
		</div>
	)
}

export default Pagination

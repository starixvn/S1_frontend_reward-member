import React from "react"

const DropDown = ({ title, status, itemList, onClickHandle }) => {
	return (
		<div className="inputBox" onClick={onClickHandle}>
			<div className="dropdown">
				<button className={`btn ${status}`}>{title}</button>
				<div className={`dropdown-container ${status}`}>
					{itemList.map((value, index) => (
						<div key={index} className="dropdown-item">
							{value}
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export { DropDown }

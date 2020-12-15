import React from "react";
import PropTypes from "prop-types";
import "../../styles/DeletButtion.css";

function DeletButton(props) {
	return (
		<div className="delet">
			<p className="paragrafo">
				{props.todo}
				<button
					type="button"
					className="btn"
					onClick={e => props.deleteLine(props.id)}>
					X
				</button>
			</p>
		</div>
	);
}
DeletButton.propTypes = {
	todo: PropTypes.string,
	id: PropTypes.integer,
	deleteLine: PropTypes.func
};
export default DeletButton;

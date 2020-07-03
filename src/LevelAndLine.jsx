import React from 'react'

function LevelAndLine({ lvl, line, linePerLvl}) {
	return (
		<div id="level_and_line" className="ui-text">
			<div className="lvl">
				<span className="title">LEVEL</span>
				<span className="value">{lvl}</span>
			</div>
			<div className="line">
				<span className="title">LINE</span>
				<span className="value">{line}/{linePerLvl}</span>
			</div>
		</div>
	)
}

export default LevelAndLine;
import React from 'react'

function formatNumber(n) {
	return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

function intToTime(time){ 
	var sec_num = time
	var hours   = Math.floor(sec_num / 3600);
	var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
	var seconds = sec_num - (hours * 3600) - (minutes * 60);

	if (minutes < 10) {minutes = "0"+minutes;}
	if (seconds < 10) { seconds = "0" + seconds; }
	
	if (hours > 0) { 
		if (hours < 10) { hours = "0" + hours; }
		return hours+':'+minutes+':'+seconds;
	}

	return minutes+':'+seconds;
}

function TimeAndScore({ score, globalTimer }) {
	return (
		<div id="time_and_score" className="ui-text">
			<div className="time">
				<span className="title">TIME</span>
				<span className="value">{intToTime(globalTimer)}</span>
			</div>
			<div className="score">
				<span className="title">SCORE</span>
				<span className="value">{formatNumber(score)}</span>
			</div>
		</div>
	)
}

export default TimeAndScore;
$(function(){
	var $topArea = $(".topArea"),
		$botArea = $(".botArea");

	var innerHeight = window.innerHeight,
		innerWidth = window.innerWidth;

	var areaWidth = Math.floor(innerHeight*0.5*Math.sin(37*Math.PI/180.0)+innerWidth*Math.cos(37*Math.PI/180.0)),
		areaHeight = Math.floor(innerHeight*0.5*Math.cos(37*Math.PI/180.0));

	$topArea.css('height', areaHeight);
	$topArea.css('width', areaWidth);
	$topArea.css('left',innerWidth - areaWidth);
	$botArea.css('height', areaHeight);
	$botArea.css('width', areaHeight);

	


});
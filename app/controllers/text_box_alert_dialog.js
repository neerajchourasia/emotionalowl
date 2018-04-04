// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

$.growYourTree.addEventListener('click', function() {

	if ($.shareYourThoughtsText.value != '') {
		
		//Alloy.Globals.happinessTreeData.push($.shareYourThoughtsText.value);
		
		args.callback($.shareYourThoughtsText.value);
	}
	$.text_box_alert_dialog.close();
});

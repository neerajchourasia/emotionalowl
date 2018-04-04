// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

console.log('args.source.top <> ' + args.source.top);
console.log('args.source.top <parseInt> ' + parseInt(args.source.top));

$.popupTextAreaView.setHeight(100);
$.popupTextAreaView.setWidth(200);

console.log('args.source.top <10>');

//$.popupTextAreaView.setTop((parseInt(args.source.top) - 10) + '%');
//$.dataTime.setTop((parseInt(args.source.top) - 15) + '%');

$.happiness_tree_text_area_container.setTop((parseInt(args.source.top) - 10) + '%');

console.log('args.source.top <15>');

if (parseInt(args.source.right) > 65) {
	
	//$.popupTextAreaView.setRight('65%');
	//$.dataTime.setRight('65%');
	$.happiness_tree_text_area_container.setRight('65%');
	
} else { 
	//$.popupTextAreaView.setRight(args.source.right);
	//$.dataTime.setRight(args.source.right);
	$.happiness_tree_text_area_container.setRight(args.source.right);
}

console.log('args.source.top <25>');

$.dataTime.setText(args.source.dataTime);
$.popupTextAreaView.setValue(args.source.emotionText);

console.log('args.source.top <30>');

var matrix = Ti.UI.create2DMatrix();
//matrix = matrix.rotate(360);
matrix = matrix.scale(1.5, 1.5);
var a = Ti.UI.createAnimation({	
	transform : matrix,
	duration : 2000,
	autoreverse : false,
	repeat : 1
});
//$.popupTextAreaView.animate(a);
//$.dataTime.animate(a);
$.happiness_tree_text_area_container.animate(a);

console.log('args.source.top <44>');

$.happiness_tree_message_popup.addEventListener('click', function(e) {
	$.happiness_tree_message_popup.close();
});

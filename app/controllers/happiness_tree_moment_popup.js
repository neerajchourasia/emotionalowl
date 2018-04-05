// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

console.log('<<<<args>>>> ' + JSON.stringify(args));

console.log('args.source.top <> ' + args.source.top);
console.log('args.source.top <parseInt> ' + parseInt(args.source.top));

$.dataTime.setText(args.source.dataTime);
$.popup_text_area_view.setValue(args.source.emotionText);

$.popup_text_area_view.setTop((parseInt(args.source.top) - 10) + '%');
$.dataTime.setTop((parseInt(args.source.top) - 15) + '%');

if (parseInt(args.source.right) > 60) {
	
	$.popup_text_area_view.setRight('60%');
	$.dataTime.setRight('60%');
	
} else { 
	$.popup_text_area_view.setRight(args.source.right);
	$.dataTime.setRight(args.source.right);
}

var matrix = Ti.UI.create2DMatrix();
matrix = matrix.scale(1.5, 1.5);
var a = Ti.UI.createAnimation({	
	transform : matrix,
	duration : 2000,
	autoreverse : false,
	repeat : 1
});

$.popup_text_area_view.animate(a);
$.dataTime.animate(a);

$.happiness_tree_moment_popup.addEventListener('click', function() {
	$.happiness_tree_moment_popup.close();
});

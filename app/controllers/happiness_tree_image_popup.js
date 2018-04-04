// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

console.log('args.source.top <> ' + args.source.top);
console.log('args.source.top <parseInt> ' + parseInt(args.source.top));

//$.popupImageView.setHeight(100);
//$.popupImageView.setWidth(100);


//$.popupImageView.setTop((parseInt(args.source.top) - 10) + '%');
//$.popupImageView.setRight(args.source.right);
$.popupImageView.setImage(args.source.emotionText);
$.dataTime.setText(args.source.dataTime);

var matrix = Ti.UI.create2DMatrix();
//matrix = matrix.rotate(360);
matrix = matrix.scale(3, 3);
var a = Ti.UI.createAnimation({
	transform : matrix,
	duration : 2000,
	autoreverse : false,
	repeat : 1
});
//$.popupImageView.animate(a);
//$.dataTime.animate(a);

$.popupImageViewContainer.animate(a);

$.happiness_tree_image_popup.addEventListener('click', function(e) {
	$.happiness_tree_image_popup.close({
		activityEnterAnimation : (Ti.Platform.osname == "android") ? Ti.App.Android.R.anim.accelerate_decelerate_interpolator : Ti.UI.iOS.AnimationStyle.CURL_UP
	}); 
});

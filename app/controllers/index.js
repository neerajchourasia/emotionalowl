// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

function hideSun() {
	$.sunForgroundOverLayView.setVisible(false);
	visibleImagesInIntervalForSUN(false, 0);
}

function hideCloud() {
	$.cloudForgroundOverLayView.setVisible(false);
	visibleImagesInIntervalForCLOUD(false);
}

function hideOwl() {
	$.owlForgroundOverLayView.setVisible(false);
	visibleImagesInIntervalForOWL(false);
}

$.index.addEventListener('click', function() {
	hideSun();
	hideCloud();
	hideOwl();
});

/*******************************************************************************/

/**
 * Following event listener for image SUN.
 **/
$.happiness_tree_sun.addEventListener('click', function() {

	Titanium.Media.vibrate([0, 500, 100]);
	hideCloud();
	hideOwl();

	var matrix = Ti.UI.create2DMatrix();
	//matrix = matrix.rotate(90);
	matrix = matrix.scale(1.25, 1.25);
	var a = Ti.UI.createAnimation({
		transform : matrix,
		duration : 1000,
		autoreverse : true,
		repeat : 1
	});
	$.happiness_tree_sun.animate(a);

	$.sunForgroundOverLayView.setVisible(true);
	visibleImagesInIntervalForSUN(true, 5);
});

/**
 * Following listener to disappear animated images around SUN.
 **/
$.sunForgroundProgressView.addEventListener('click', function(e) {
	hideSun();
});

/**
 * Following function to animate images around SUN.
 **/
this.timer1 = null;
function visibleImagesInIntervalForSUN(visibleFlag, countNum) {

	if (visibleFlag && this.timer1 == null) {

		var i = 1;

		this.timer1 = setInterval(function() {

			if (i <= countNum) {

				if (i == 1) {

					$.happiness_text_icon.setVisible(true);
				} else if (i == 2) {

					$.happiness_image_icon.setVisible(true);
				} else if (i == 3) {

					$.happiness_voice_icon.setVisible(true);
				} else if (i == 4) {

					$.happiness_video_icon.setVisible(true);
				} else {

					//$.happiness_share_icon.setVisible(true);
				}
			} else {
				clearInterval(this.timer1);
				this.timer1 = null;
			}
			i++;
		}, 200);
	} else {
		$.happiness_text_icon.setVisible(false);
		$.happiness_image_icon.setVisible(false);
		$.happiness_voice_icon.setVisible(false);
		$.happiness_video_icon.setVisible(false);
		//$.happiness_share_icon.setVisible(false);

		clearInterval(this.timer1);
		this.timer1 = null;
	}
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var rightPer = 10;
var topPer = 30;
var saveEmotionTextAndGrowTree = function(happinessTreeData) {

	var fruitImage = Ti.UI.createImageView({
		height : 50,
		width : 50,
		image : '/images/happiness_tree_fruit_orange.png',
		right : rightPer + '%',
		top : topPer + '%',
		emotionText : happinessTreeData,
		dataTime: _formatDate()
	});

	fruitImage.addEventListener('click', function(e) {
		
		//alert(e.source.dataTime + ':: ' + e.source.emotionText);
		console.log('<<<<e>>>> ' + JSON.stringify(e));
		var hapiness_tree_text_popup = Alloy.createController('happiness_tree_moment_popup', {
			source : e.source
		}).getView();

		hapiness_tree_text_popup.open({
			activityEnterAnimation : (Ti.Platform.osname == "android") ? Ti.App.Android.R.anim.accelerate_decelerate_interpolator : Ti.UI.iOS.AnimationStyle.CURL_UP
		});
	});

	$.index.add(fruitImage);

	console.log('(x, y) ' + '(' + rightPer + ', ' + topPer + ')');
	
	if (topPer > 48) {
		topPer = 25;
	}
	if (rightPer > 80) {
		rightPer = 10;
	}

	rightPer = rightPer + getRandomInt(5, 10);
	topPer = topPer + getRandomInt(5, 10);
};

$.happiness_text_icon.addEventListener('click', function() {

	var text_box_alert_dialog_obj = Alloy.createController('text_box_alert_dialog', {
		callback : saveEmotionTextAndGrowTree
	}).getView();
	text_box_alert_dialog_obj.open();
});

function openGallery() {
	Titanium.Media.openPhotoGallery({
		success : function(event) {
			Ti.API.debug('Our type was: ' + event.mediaType);
			if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
				//UploadPhotoToServer(event.media);
				var fruitImage = Ti.UI.createImageView({
					height : 50,
					width : 50,
					image : '/images/happiness_tree_fruit_red.png',
					right : rightPer + '%',
					top : topPer + '%',
					emotionText : event.media,
					dataTime: _formatDate()
				});
				fruitImage.addEventListener('click', function(e) {

					console.log('<<<<e>>>> ' + JSON.stringify(e));
					var hapiness_tree_image_popup = Alloy.createController('happiness_tree_image_popup', {
						source : e.source
					}).getView();
					
					hapiness_tree_image_popup.open({
						activityEnterAnimation : (Ti.Platform.osname == "android") ? Ti.App.Android.R.anim.accelerate_decelerate_interpolator : Ti.UI.iOS.AnimationStyle.CURL_UP
					});


					//alert(e.source.emotionText);
				});
				$.index.add(fruitImage);

				console.log('(x, y) ' + '(' + rightPer + ', ' + topPer + ')');
				if (topPer > 48) {
					topPer = 20;
				}
				if (rightPer > 80) {
					rightPer = 10;
				}
				rightPer = rightPer + getRandomInt(5, 10);
				topPer = topPer + getRandomInt(5, 10);
			}
		},
		cancel : function() {
		},
		error : function(err) {
			Ti.API.error(err);
		},
		mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
	});
}

$.happiness_image_icon.addEventListener('click', function() {

	if (Ti.Platform.osname == "android") {
		if (Ti.Android.hasPermission('android.permission.WRITE_EXTERNAL_STORAGE')) {
			openGallery();
		} else {
			Ti.Android.requestPermissions('android.permission.WRITE_EXTERNAL_STORAGE',function(e) {
				if (e.success) {
					openGallery();
					console.log("########success");
				} else {

					console.log("########error" + e.error);
				}
			});
		}
	} else {
		openGallery();
	}
});

/*******************************************************************************/

$.happiness_tree_cloud.addEventListener('click', function(e) {

	hideSun();
	hideOwl();
	$.cloudForgroundOverLayView.setVisible(true);
	visibleImagesInIntervalForCLOUD(true);
});

$.cloudForgroundProgressView.addEventListener('click', function(e) {
	hideCloud();
});

this.timer2 = null;
function visibleImagesInIntervalForCLOUD(visibleFlag) {

	if (visibleFlag && this.timer2 == null) {

		var i = 1;
		this.timer2 = setInterval(function() {

			if (i <= 5) {

				if (i == 1) {

					$.icon11.setVisible(true);
				} else if (i == 2) {

					$.icon12.setVisible(true);
				} else if (i == 3) {

					$.icon14.setVisible(true);
				} else if (i == 4) {

					//$.icon16.setVisible(true);
				} else {

					//$.icon17.setVisible(true);
				}
			} else {
				clearInterval(this.timer2);
				this.timer2 = null;
			}
			i++;
		}, 200);
	} else {

		$.icon11.setVisible(false);
		$.icon12.setVisible(false);
		$.icon14.setVisible(false);
		//$.icon16.setVisible(false);
		//$.icon17.setVisible(false);

		clearInterval(this.timer2);
		this.timer2 = null;
	}
}

this.cloud_movement = null;
this.cloud_movement = setInterval(function() {

	var matrix = Ti.UI.create2DMatrix();
	//matrix = matrix.rotate(180);
	matrix = matrix.scale(1.25, 1.25);
	var a = Ti.UI.createAnimation({
		transform : matrix,
		duration : 1000,
		autoreverse : true,
		repeat : 1
	});
	$.happiness_tree_cloud.animate(a);

	/*var t1 = Ti.UI.create2DMatrix();
	t1 = t1.translate(-300, 0);
	var a1 = Ti.UI.createAnimation({
		transform : t1,
		duration : 2000,
		autoreverse : true,
		repeat : 1
	}); 
	$.happiness_tree_cloud.animate(a1);*/
}, 10000);
/*******************************************************************************/

$.happiness_tree_owl.addEventListener('click', function(e) {

	hideSun();
	hideCloud();

	$.owlForgroundOverLayView.setVisible(true);
	visibleImagesInIntervalForOWL(true);
});

$.owlForgroundProgressView.addEventListener('click', function(e) {
	hideOwl();
});

this.timer3 = null;
function visibleImagesInIntervalForOWL(visibleFlag) {

	if (visibleFlag && this.timer3 == null) {

		var i = 1;

		this.timer3 = setInterval(function() {

			if (i <= 9) {

				if (i == 1) {

					$.icon20.setVisible(true);
				} else if (i == 2) {

					$.icon21.setVisible(true);
				} else if (i == 3) {

					$.icon23.setVisible(true);
				} else if (i == 4) {

					$.icon25.setVisible(true);
				} else {

					$.icon26.setVisible(true);
				}
			} else {
				clearInterval(this.timer3);
				this.timer3 = null;
			}
			i++;
		}, 200);
	} else {
		$.icon20.setVisible(false);
		$.icon21.setVisible(false);
		$.icon23.setVisible(false);
		$.icon25.setVisible(false);
		$.icon26.setVisible(false);

		clearInterval(this.timer3);
		this.timer3 = null;
	}
}

this.owl_blink = null;
this.owl_blink = setInterval(function() {

	$.happiness_tree_owl.setImage('/images/happiness_tree_owl_4.png');

	this.owl_open_eye = setInterval(function() {

		$.happiness_tree_owl.setImage('/images/happiness_tree_owl_1.png');
		clearInterval(this.owl_open_eye);
		this.owl_open_eye = null;

	}, 200);

}, 5000);

/*******************************************************************************/

$.index.addEventListener('close', function() {
	clearInterval(this.owl_blink);
	clearInterval(this.cloud_movement = null);
});

function _formatDate() {
	var dateObj = new Date();
	var currentDate = dateObj.getDate();
	var currentMonthNum = dateObj.getMonth();
	var currentFullYear = dateObj.getFullYear();
	var currentDayNum = dateObj.getDay();

	var currentMonthAlp = '';
	var currentDayAlp = '';
	var currentDateFormat = '';

	currentDate = (currentDate < 10) ? '0' + currentDate : currentDate;
	var month = currentMonthNum + 1;
	month = (month < 10) ? '0' + month : currentDate;

	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	currentMonthAlp = months[currentMonthNum];

	var days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];
	currentDayAlp = days[currentDayNum];

	//return currentDateFormat = currentDayAlp + '-' + currentMonthAlp + '-' + currentDate + '-' + currentFullYear;
	return currentDateFormat = ' ' + currentDayAlp + ' ' + currentMonthAlp + ' ' + currentDate + ', ' + currentFullYear + ' ';
}

$.index.open();

//var hapiness_tree_text_popup = Alloy.createController('fortesting').getView();
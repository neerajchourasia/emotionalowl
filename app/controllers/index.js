// Arguments passed into this controller can be accessed via the `$.args` object directly or:
var args = $.args;

/**
 * Hiding sun's circle icons.
 **/
function hideSun() {
	$.sunForgroundOverLayView.setVisible(false);
	visibleImagesInIntervalForSUN(false, 0);
}

/**
 * Hiding cloud's circle icons.
 **/
function hideCloud() {
	$.cloudForgroundOverLayView.setVisible(false);
	visibleImagesInIntervalForCLOUD(false);
}

/**
 * Hiding owl's circle icons.
 **/
function hideOwl() {
	$.owlForgroundOverLayView.setVisible(false);
	visibleImagesInIntervalForOWL(false);
}

/*******************************************************************************/

/**
 * Following event listener for image SUN.
 **/
$.happiness_tree_sun.addEventListener('click', function() {

	hideCloud();
	hideOwl();

	/**
	 * Animation for rotating sun
	 **/
	/*var matrix = Ti.UI.create2DMatrix();
	matrix = matrix.rotate(90);
	var a = Ti.UI.createAnimation({
		transform : matrix,
		duration : 1000,
		autoreverse : true,
		repeat : 1
	});
	$.happiness_tree_sun.animate(a);*/

	$.sunForgroundOverLayView.setVisible(true);
	visibleImagesInIntervalForSUN(true, 5);
});

/**
 * Applying animation for sun in certain interval.
 * Animation for popping up. 
 **/
this.sun_movement = null;
this.sun_movement = setInterval(function() {

	var matrix = Ti.UI.create2DMatrix();
	matrix = matrix.scale(1.25, 1.25);
	var a = Ti.UI.createAnimation({
		transform : matrix,
		duration : 1000,
		autoreverse : true,
		repeat : 1
	});
	$.happiness_tree_sun.animate(a);
}, 7000);


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

		/**
		 * Clearing interval event listener for sun around the circle icon. 
		 **/
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

	/*var matrix = Ti.UI.create2DMatrix();
	matrix = matrix.scale(1.25, 1.25);
	var a = Ti.UI.createAnimation({
		transform : matrix,
		duration : 500,
		autoreverse : true,
		repeat : 1
	});
	$.happiness_tree_cloud.animate(a);*/
	
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
	matrix = matrix.translate(20, 0);
	//matrix = matrix.scale(1.25, 1.25);
	var a = Ti.UI.createAnimation({
		transform : matrix,
		duration : 500,
		autoreverse : true,
		repeat : 1
	});
	$.happiness_tree_cloud.animate(a);
}, 2000);

/*******************************************************************************/

$.happiness_tree_owl.addEventListener('click', function(e) {

	hideSun();
	hideCloud();

	//$.happiness_tree_owl.setImage('/images/happiness_tree_owl_1.png');
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

					$.owl_audio_clip_play.setVisible(true);
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
		$.owl_audio_clip_play.setVisible(false);
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
	this.owl_blink = null;
	clearInterval(this.cloud_movement);
	this.cloud_movement = null;
	clearInterval(this.sun_movement);
	this.sun_movement = null;
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

var callAgain = 0;
$.touch_tourtle_view.addEventListener('click', function() {
	if (callAgain == 0) {

		Titanium.Media.vibrate([0, 500, 100]);
		
		var matrix = Ti.UI.create2DMatrix();
		matrix = matrix.translate(175, -75);
		var a1 = Ti.UI.createAnimation({
			transform : matrix,
			duration : 4000,
			autoreverse : false,
			repeat : 1
		});
		$.animal_animation.animate(a1);
		callAgain = 1;

	} else {
		
		Titanium.Media.vibrate([0, 500, 100]);
		
		var matrix = Ti.UI.create2DMatrix();
		matrix = matrix.translate(-175, 50);
		var a1 = Ti.UI.createAnimation({
			transform : matrix,
			duration : 4000,
			autoreverse : false,
			repeat : 1
		});
		$.animal_animation.animate(a1);
		callAgain = 0;
	}
});

/**
 * Adding event listener in owl's play icon's click event
 * Creating media player for playing audio.
 **/
$.owl_audio_clip_play.addEventListener('click', function() {
	var sound = Titanium.Media.createSound({
		url : '/images/Meditation_Exercise.mp3',
		preload : true
	});
	sound.play();
});

var isMenuOpen = 0;
function open_close_slider_menu() {
	if (isMenuOpen == 0) {
		var matrix = Ti.UI.create2DMatrix();
		if (Alloy.isHandheld) {
			matrix = matrix.translate(860, 0);
		} else {
			matrix = matrix.translate(460, 0);
		}
		
		var a1 = Ti.UI.createAnimation({
			transform : matrix,
			duration : 2000,
			autoreverse : false,
			repeat : 1
		});
		$.slider_menu_view.animate(a1);
		
		$.slider_menu_view.setLeft(0);
		
		isMenuOpen = 1;
	
	} else {
		var matrix = Ti.UI.create2DMatrix();
		matrix = matrix.translate(0, 0);
		var a1 = Ti.UI.createAnimation({
			transform : matrix,
			duration : 2000,
			autoreverse : false,
			repeat : 1
		});
	
		$.slider_menu_view.animate(a1);
	
		$.slider_menu_view.setLeft('-60%');
	
		isMenuOpen = 0;
	}
}

$.slider_menu_icon.addEventListener('click', function() {
	open_close_slider_menu();
});

$.slider_menu_view.addEventListener('click', function() {
	open_close_slider_menu();
});

/**
 * Event listener in window for hiding sun's or cloud's or owl's circle icon'  
 **/
$.index.addEventListener('click', function() {
	hideSun();
	hideCloud();
	hideOwl();
	if (isMenuOpen == 1) {
		open_close_slider_menu();
	}
});

$.index.open();

//var hapiness_tree_text_popup = Alloy.createController('fortesting').getView();
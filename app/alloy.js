// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};
/**
 * Creating global variables for checking operating systems.
 * Either iOS or Android.
 **/
/*Alloy.Globals.OS_ANDROID = false;
Alloy.Globals.OS_iOS = false;

if (Titanium.Platform.osname == "android") {

	Alloy.Globals.OS_ANDROID = true;

} else if (Titanium.Platform.osname == "ipad" || Titanium.Platform.osname == "iphone") {

	Alloy.Globals.OS_iOS = true;

	/**
	 * Determines whether the compass calibration UI is shown if needed.
	 * Set to false to disable display of the compass calibration UI. This may result in invalid heading data.
	 * API is for iOS only
	 **/
	//Ti.Geolocation.showCalibration = false;
//}

//Titanium.App.Properties.setList('happinessTreeData', {happinessTreeDataArray : []});
Alloy.Globals.happinessTreeData = [];

// Check and Set permission for devices above 6.0
/*var alloyGlobalsCheckAndSetPermissions = function(param) {

	if (Alloy.Globals.OS_ANDROID == true) {

		var tipermissions = null;
		var arrayPermissions = [];
		var arraycamera_sd_pemissions = [];
		var version = Ti.Platform.version.substring(0, 1);
		version = parseInt(version);

		arrayPermissions = ["android.permission.CAMERA", "android.permission.WRITE_EXTERNAL_STORAGE", "android.permission.ACCESS_FINE_LOCATION", "android.permission.READ_CALENDAR"];
		arraycamera_sd_pemissions = ["android.permission.CAMERA", "android.permission.WRITE_EXTERNAL_STORAGE"];
		tipermissions = Titanium.Android;
		var status = param.status;
		var type = param.type;
		if ((status == 'all') && (type == 'all')) {
			var hasPerm = true;
			for (var i = 0; i < arrayPermissions.length; i++) {
				if (!tipermissions.hasPermission(arrayPermissions[i])) {
					hasPerm = false;
				}
			}
			if (!hasPerm) {
				Ti.App.Properties.setString('access_token', '');
				tipermissions.requestPermissions(arrayPermissions, '', '');
			}
		} else if ((status == 'check') && (type == 101)) {
			var hasPerm = true;
			for (var i = 0; i < arraycamera_sd_pemissions.length; i++) {
				if (!tipermissions.hasPermission(arraycamera_sd_pemissions[i])) {
					hasPerm = false;
				}
			}
			return hasPerm;
		} else if ((status == 'set') && (type == 101)) {
			tipermissions.requestPermissions(arraycamera_sd_pemissions, '', '');
		} else if (status == 'check') {
			return tipermissions.hasPermission(arrayPermissions[type]);
		} else if (status == 'set') {
			tipermissions.requestPermissions([arrayPermissions[type]], '', '');
		} else if (status == 'checkandset') {
			if (!tipermissions.hasPermission(arrayPermissions[type])) {
				tipermissions.requestPermissions([arrayPermissions[type]], '', '');
			}
		}
	}
};

alloyGlobalsCheckAndSetPermissions({
	status : "all",
	type : 'all'
});*/

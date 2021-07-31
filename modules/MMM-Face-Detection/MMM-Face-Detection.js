/* global Module */

/* Magic Mirror
 * Module: MMM-Face-Detection
 *
 * By Filip Stec
 *
 * Modified from https://github.com/dmcinnes/MMM-Motion-Detection
 *
 * MIT Licensed.
 */

Module.register('MMM-Face-Detection', {

  defaults: {
    // force the use of a usb webcam on raspberry pi (on other platforms this is always true automatically)
    useUSBCam: false,
    // recognition interval in seconds (smaller number = faster but more CPU intensive!)
    interval: 1,
    // Notificaiton Delay after face stops being sensed (in seconds).
    faceStopDelay: 120,
    // Turn off display when no face is detected.
    turnOffDisplay: true,
    // When turnOffDisplay is True: support CEC to turn monitor ON or OFF as well, not just the HDMI circuit in the RPI.
    supportCEC: false,
  },

  start: function () {
    this.sendSocketNotification('CONFIG', this.config);
    Log.info('Starting module: ' + this.name);
  },

  socketNotificationReceived: function (notification, payload) {
    Log.info(this.name + " received a socket notification: " + notification + " - Payload: " + payload);
    switch (notification) {
      case "face-detected":
        this.sendNotification("face-detected");
        break;
      case "face-stopped":
        this.sendNotification("face-stopped");
        break;
      default:
        Log.info("[" + this.name + "] unknown socket notification: " + notification + " - Payload: " + payload);
    }
  }

});

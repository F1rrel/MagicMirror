# MMM-Face-Detection
This an extension for the [MagicMirror](https://github.com/MichMich/MagicMirror). With this module your mirror will only turn on when it detects face with eyes through the Rasberry Pi's PiCam or a USB webcam. It also emits `face-detected` and `face-stopped` notifications for other modules to use.

This was ported from [dmcinnes's MMM-Motion-Detection module](https://github.com/dmcinnes/MMM-Motion-Detection).

## Usage

Configuration variables shown here are the defaults and don't have to be specified unless you want to change them:

```javascript
{
    module: 'MMM-Face-Detection',
    config: {
        // force the use of a usb webcam on raspberry pi
        useUSBCam: false,
        // recognition interval in seconds (smaller number = faster but more CPU intensive!)
        interval: 1,
        // Notificaiton Delay after face stops being sensed (in seconds).
        faceStopDelay: 120,
        // Turn off display when no face is detected.
        turnOffDisplay: true,
        // When turnOffDisplay is True: support CEC to turn monitor ON or OFF as well, not just the HDMI circuit in the RPI.
        supportCEC: false,
    }
}
```

## Dependencies
- [python-shell](https://www.npmjs.com/package/python-shell) (installed via `npm install`)
- [OpenCV](http://opencv.org) (`sudo apt-get install libopencv-dev python-opencv`)

"use strict";
const exec = require("child_process").exec;
const NodeHelper = require("node_helper");
const {PythonShell} = require("python-shell");
var pythonStarted = false

module.exports = NodeHelper.create({

  log: function (msg) {
    console.log("[" + this.name + "] " + msg);
  },

  activateMonitor: function () {
    if (!this.config.turnOffDisplay) {
      return;
    }
    // Check if hdmi output is already on
    const self = this;
    exec("/usr/bin/vcgencmd display_power").stdout.on('data', function(data) {
      if (data.indexOf("display_power=0") === 0) {
        exec("/usr/bin/vcgencmd display_power 1", null);
      }
      if (self.config.supportCEC)
        exec("echo 'on 0' | cec-client -s -d 1");
    });
  },

  deactivateMonitor: function () {
    if (!this.config.turnOffDisplay) {
      return;
    }
    if (this.config.supportCEC) {
      exec("echo 'standby 0' | cec-client -s -d 1");
    }
    exec("/usr/bin/vcgencmd display_power 0", null);
  },

  python_start: function () {
    const self = this;
    this.config["name"] = this.name;
    const pyshell =
      new PythonShell("modules/" + this.name + "/facedetection/facedetection.py",
        { mode: "json", args: [JSON.stringify(this.config)] });

    pyshell.on("message", function (message) {
      if (message.hasOwnProperty("status")){
        self.log(message.status);
      }
      if (message.hasOwnProperty("face-detected")){
        self.log("face detected");
        self.sendSocketNotification("face-detected");
        self.activateMonitor();
      }
      if (message.hasOwnProperty("face-stopped")){
        self.log("face stopped");
        self.sendSocketNotification("face-stopped");
        self.deactivateMonitor();
      }
    });

    pyshell.end(function (err) {
      if (err) throw err;
      console.log("[" + self.name + "] " + "finished running...");
    });
  },

  socketNotificationReceived: function(notification, payload) {
    if (notification === "CONFIG") {
      this.config = payload
      if (!pythonStarted) {
        pythonStarted = true;
        this.python_start();
      };
    };
  }
});

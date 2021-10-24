#!/usr/bin/python
# coding: utf8
"""MMM-Face-Detection - MagicMirror Module
Face Detection Script
The MIT License (MIT)

Copyright (c) 2021 Filip Stec (MIT License)
Based on work by Doug McInnes (Copyright 2017) (MIT License)
Based on work by Paul-Vincent Roll (Copyright 2016) (MIT License)
Based on work by Tony DiCola (Copyright 2013) (MIT License)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
"""

import time
import cv2
import config
import signal
import sys
import json
import os
import imutils
import numpy as np

def to_node(type, message):
    # convert to json and print (node helper will read from stdout)
    try:
        print(json.dumps({type: message}))
    except Exception:
        pass
    # stdout has to be flushed manually to prevent delays in the node helper communication
    sys.stdout.flush()

def shutdown(self, signum):
    to_node("status", 'Shutdown: Cleaning up camera...')
    camera.stop()
    quit()

# get camera
def init_camera():
    global camera

    camera = config.get_camera()

    # sleep for a second to let the camera warm up
    time.sleep(1)

    frame = camera.read()
    if frame is None:
        to_node("status", 'Camera Failed to Initialize! Shutting Down.')
        camera.stop()
        sys.exit(1)

def init_cascades():
    # initialize a dictionary to store our haar cascade detectors
    global detectors

    # initialize a dictionary that maps the name of the haar cascades to
    # their filenames
    detectorPaths = {
        "face": "haarcascade_frontalface_default.xml",
        "eyes": "haarcascade_eye.xml",
    }

    # loop over our detector paths
    detectors = {}
    for (name, filename) in detectorPaths.items():
        # load the haar cascade from disk and store it in the detectors
        # dictionary
        path = os.path.join("modules", config.get("name"), "cascades", filename)
        detectors[name] = cv2.CascadeClassifier(path)

def init():
    signal.signal(signal.SIGINT, shutdown)

    init_camera()
    init_cascades()

def main():
    last_detected = time.time()
    to_node("face-detected", {})

    while True:
        # Sleep for x seconds specified in module config
        time.sleep(config.get("interval"))

        frame = camera.read()

        frame = imutils.resize(frame, width=500)
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        gray = np.clip(gray * 4.0, 0, 255).astype(np.uint8)

        # perform face detection using the appropriate haar cascade
        faceRects = detectors["face"].detectMultiScale(
            gray, scaleFactor=1.05, minNeighbors=5, minSize=(30, 30),
            flags=cv2.CASCADE_SCALE_IMAGE)

        face_detected = False
        face_eye_detected = False
        if len(faceRects) > 0:
            face_detected = True
#            # loop over the face bounding boxes
#            for (fX, fY, fW, fH) in faceRects:
#                # extract the face ROI
#                faceROI = gray[fY:fY+ fH, fX:fX + fW]
#                # apply eyes detection to the face ROI
#                eyeRects = detectors["eyes"].detectMultiScale(
#                    faceROI, scaleFactor=1.1, minNeighbors=10,
#                    minSize=(15, 15), flags=cv2.CASCADE_SCALE_IMAGE)
#
#                if len(eyeRects) > 0:
#                    face_eye_detected = True
#                    break

        # to_node("status", "Face Detection: " + ("Face with eyes" if face_eye_detected else ("Face" if face_detected else "No face")))

        if face_detected:
            if last_detected is None:
                to_node("face-detected", {})
            last_detected = time.time()
        elif last_detected != None and time.time() - last_detected > config.get("faceStopDelay"):
            last_detected = None
            to_node("face-stopped", {})

if __name__ == "__main__":
    to_node("status", "Face Detection started...")

    try:
        init()
        main()
    except Exception:
        to_node("status", 'Exception received. Shutting Down.')
        camera.stop()
        sys.exit(1)


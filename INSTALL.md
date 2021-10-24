# Custom installation steps

## Autostarting
### Copy service file to system services
The service file launches file `installers/magicmirror_starter.sh`, which creates `config/config.js` file from `config/config.template` by substituting environment variables and launches magic mirror.
```console
sudo cp ~/MagicMirror/installers/magicmirror.service /etc/systemd/system/magicmirror.service
```

### Add environment variables required for the config template
This will create an override file for you or let you edit an existing one `/etc/systemd/system/magicmirror.service.d/override.conf`.
```console
sudo systemctl edit magicmirror.service
```

Add there environment variables of config secrets
```
[Service]
Environment="FAMILY_CALENDAR_SECRET="
Environment="WEATHER_SECRET="
```

### Setup service autostarting
```
sudo systemctl daemon-reload
sudo systemctl start magicmirror.service
# check if it is working correctly, then enable autostarting
sudo systemctl enable magicmirror.service
```


## Modules
### MMM-Face-Reco-DNN
Github: https://github.com/nischi/MMM-Face-Reco-DNN  
Usage:  https://www.pyimagesearch.com/2018/06/25/raspberry-pi-face-recognition/  

Install OpenCV 4.5.0
```bash
wget https://github.com/cyysky/OpenCV-Raspberry-Pi-4-Package-for-Python/raw/master/opencv_4.5.0-1_armhf.deb
sudo dpkg -i opencv_4.5.0-1_armhf.deb # This will install fail for dependency
sudo apt-get -f install # Auto install dependency package
sudo dpkg -i opencv_4.5.0-1_armhf.deb # Now start install
```

Python packages
```bash
sudo apt-get install python3-pip
pip3 install --upgrade pip

python3 -m pip install dlib face_recognition imutils numpy
```

Install the package
```bash
cd ~/MagicMirror/modules/
git clone https://github.com/nischi/MMM-Face-Reco-DNN.git
cd MMM-Face-Reco-DNN
npm install
npm audit fix
```
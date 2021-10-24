#!/bin/bash
envsubst \
    '${FAMILY_CALENDAR_SECRET}, 
     ${BIRTHDAY_CALENDAR_SECRET},
     ${WEATHER_SECRET}' \
    < "$HOME/MagicMirror/config/config.template" \
    > "$HOME/MagicMirror/config/config.js"
/usr/bin/npm start
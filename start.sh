#!/bin/bash

if ! screen -list | grep -q "SuperBOT"; then
    screen -X -S SuperBOT stuff "^C"
    echo "SuperBOT coupé"
else
    clear
    cd /home/superbot/discordbot/Super-bot-discord/
    screen -dmS SuperBOT node .
    echo "SuperBOT Lancé"
fi


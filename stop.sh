#!/bin/bash

if ! screen -list | grep -q "SuperBOT"; then
    screen -X -S SuperBOT stuff "^C"
clear    
echo "SuperBOT eteinds"
fi


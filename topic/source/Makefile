#!/bin/sh

rm ../Topic.scpt
osacompile -o ../Topic.scpt Topic.applescript
# Take an image and make the image its own icon:
sips -i icon.icns
# Extract the icon to its own resource file:
DeRez -only icns icon.icns > tmpicns.rsrc
# append this resource to the file you want to icon-ize.
Rez -append tmpicns.rsrc -o ../Topic.scpt
# Use the resource to set the icon.
SetFile -a C ../Topic.scpt
# clean up.
rm tmpicns.rsrc

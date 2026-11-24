#!/bin/sh
# Run from the project root after unzipping. Marks both founder photos as ready.
sed -i "s/photoReady: false/photoReady: true/g" src/data/site.ts
echo "photoReady: true count (expect 2):"; grep -c "photoReady: true" src/data/site.ts

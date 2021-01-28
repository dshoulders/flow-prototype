!/bin/sh  
trap 'kill %1' SIGINT
npm run watch &
npm run serve
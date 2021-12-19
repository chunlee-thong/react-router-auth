APP=$1
CONFIG_FILE=react-router-auth.conf
PORT=3000
APP_NAME=$APP-$PORT
##
cp -n scripts/$CONFIG_FILE /etc/nginx/sites-available
ln -s /etc/nginx/sites-available/$CONFIG_FILE /etc/nginx/sites-enabled
nginx -t
sudo service nginx restart

#delete old serve folder
rm -rf ~/projects/apps/$APP

#create new serve folder
mkdir ~/projects/apps/$APP

#Copy new build from temp folder
cp -R ~/react-build-temp/$APP/build ~/projects/apps/$APP

cd ~/projects/apps/$APP
pm2 describe $APP_NAME > /dev/null
RUNNING=$?
if [ "${RUNNING}" -ne 0 ]; then
  pm2 serve build $PORT --spa --name $APP_NAME
else
  pm2 reload $APP_NAME
fi;
pm2 save
sudo start xvfb
gem install compass
rbenv rehash
npm install -g grunt-cli
npm -d install --silent
./node_modules/protractor/bin/webdriver-manager update
grunt drone
grunt build
git add dist
git commit -m "Dist deploy"
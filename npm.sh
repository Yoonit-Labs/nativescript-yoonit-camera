###############################################################################
# Copyright (c) 2015 Yorkshire Interactive (yorkshireinteractive.com)
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
###############################################################################

function pause(){
 read -s -n 1 -p "Press any key to continue . . ."
 echo ""
}

GITURL=`git config remote.origin.url`
git checkout development
git pull
cd src
npm run build
rm -rf node_modules
cd ..
rm -rf npm
mkdir npm
cp -fR src/* npm
cp src/.npmignore npm/.npmignore
cp README.md npm/README.md
cd npm
rm -rf scripts
git init
git remote add origin $GITURL
git add .
git commit -am "npm publish"
git push origin master:npm --force
npm publish --access public
PACKAGE_VERSION=$(sed -n '/\"version\"/s/[^0-9.]//gp' package.json | tr -d '\n')
git tag v$PACKAGE_VERSION
git push --tags
cd ..
rm -rf npm
pause

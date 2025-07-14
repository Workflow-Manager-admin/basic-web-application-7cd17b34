#!/bin/bash
cd /home/kavia/workspace/code-generation/basic-web-application-7cd17b34/react_js_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi


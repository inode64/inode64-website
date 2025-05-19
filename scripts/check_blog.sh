#!/bin/bash

for x in ../src/content/blog/*.md; do
    file=${x//.md/}

    if [ ! -e "../src/assets/images/blog/post/${file}.webp" ]; then
	    echo "$file image don't exist"
    fi

    if ! grep -q "${file}" "../src/content/blog/$x"; then
	    echo "$file image not used in the blog"
    fi
done

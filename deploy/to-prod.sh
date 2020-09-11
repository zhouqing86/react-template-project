#!/bin/bash

usage(){                                                     
    echo "Usage: $0 [version] [--key [your key file name]] [--freshBuild]"    
    exit 1                                               
}

if [ $# -lt 1 ]
then
    usage
fi

version=$1
shift

BASEDIR="$(cd `dirname $0`; pwd)"
$BASEDIR/to-env.sh --env prod --version $version $@
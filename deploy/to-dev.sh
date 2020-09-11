#!/bin/bash

usage(){                                                     
    echo "Usage: $0 [version] [--key [your key file name]] [--freshBuild] [--copyFromLocal] ..."    
    exit 1                                               
}

if [ $# -lt 1 ]
then
    usage
fi
version=$1
shift

copyFromLocal=""
otherCommand=""
while (( "$#" )); do        # While there are arguments still to be shifted...
    case $1 in
        --copyFromLocal)
            copyFromLocal="--copyFromLocal"
            shift
            ;;
        *)
            otherCommand="$otherCommand $1"
            shift
            ;;
    esac
done

BASEDIR="$(cd `dirname $0`; pwd)"
$BASEDIR/to-env.sh --env dev --version $version $copyFromLocal $otherCommand
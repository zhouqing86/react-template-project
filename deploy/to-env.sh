#!/bin/bash

BASEDIR="$(cd `dirname $0`; pwd)"
SOURCE_PRIVATE_KEY_DIR=/ansible/.ssh/
DEST_PRIVATE_KEY_DIR=/ansible
DEFAULT_PRIVATE_KEY_NAME=id_rsa
APP_NAME="react-template-project"
CURRENT_NODE_VERSION="12.18.3"

echo "BASEDIR: $BASEDIR"

usage(){                                                     
    echo "Usage: $0 --env [dev|prod] --version [version] --key [keyName] [--check|--list-hosts]"    
    exit 1                                               
}

if [ $# -lt 1 ]
then
    usage
fi

privateKey=$DEFAULT_PRIVATE_KEY_NAME
deployEnv="dev"
deployVersion=""
otherCommand=""
copyFromLocal=""
freshBuild=""
while (( "$#" )); do        # While there are arguments still to be shifted...
    case $1 in
        --key)
            if [ $# -lt 2 ]
            then 
                usage
            fi
            privateKey=$2
            shift 2
            ;;
        --env)
            if [ $# -lt 2 ]
            then 
                usage
            fi
            deployEnv=$2
            shift 2
            ;;
        --version)
            if [ $# -lt 2 ]
            then 
                usage
            fi
            deployVersion=$2
            shift 2
            ;;
        --copyFromLocal)
            copyFromLocal="copyFromLocal"
            shift
            ;;
        --freshBuild)
            freshBuild="freshBuild"
            shift
            ;;
        *)
            otherCommand="$otherCommand $1"
            shift
            ;;
    esac
done


sourcePrivateKey=$SOURCE_PRIVATE_KEY_DIR/$privateKey
if [ ! -f $sourcePrivateKey ]; then
    echo "File $sourcePrivateKey not found!"
    exit 1
fi

if [ -z "$deployVersion" ]
then
    echo "Please give a version"
    usage
fi

echo "cp $sourcePrivateKey $DEST_PRIVATE_KEY_DIR/$privateKey"
cp $sourcePrivateKey $DEST_PRIVATE_KEY_DIR/$privateKey
chmod 600 $DEST_PRIVATE_KEY_DIR/$privateKey

hostParam="-i $BASEDIR/ansible/inventories/$deployEnv/hosts"
envParam="-e @$BASEDIR/ansible/configs/$deployEnv.yml"
keyParam="--private-key=$DEST_PRIVATE_KEY_DIR/$privateKey"

if [ -n "$freshBuild" ]
then
    yarn
    yarn version --new-version $deployVersion
    yarn build:$deployEnv
fi

deployZipFile="${APP_NAME}_$deployVersion.zip"
extraVars="deploy_version_file=$deployZipFile deploy_version=$deployVersion deploy_env=$deployEnv node_version=$CURRENT_NODE_VERSION"
if [ ! -f $BASEDIR/../packages/$deployEnv/$deployZipFile ]
then
    echo "[WARN] Can't find packages/$deployEnv/$deployZipFile in your project root directory"
    echo "[WARN] Will try to run ansible playbook to use package in remote server"
else
    if [ -n "$copyFromLocal" ]
    then
        echo "[Info] Will copy local packages/$deployEnv/$deployZipFile to remote host"
        [ ! -d $BASEDIR/ansible/roles/package/files/$deployEnv ] && mkdir -p $BASEDIR/ansible/roles/package/files/$deployEnv
        cp $BASEDIR/../packages/$deployEnv/$deployZipFile $BASEDIR/ansible/roles/package/files/$deployEnv/$deployZipFile
        echo "ansible-playbook $BASEDIR/ansible/copy-package.yml $hostParam $envParam $keyParam --extra-vars \"$extraVars\" $otherCommand"
        ansible-playbook $BASEDIR/ansible/copy-package.yml $hostParam $envParam $keyParam --extra-vars "$extraVars" $otherCommand
    fi
fi

echo "Deploy frontend application $deployZipFile"
echo "ansible-playbook $BASEDIR/ansible/main.yml $hostParam $envParam $keyParam --extra-vars \"$extraVars\" $otherCommand"
ansible-playbook $BASEDIR/ansible/main.yml $hostParam $envParam $keyParam --extra-vars "$extraVars" $otherCommand

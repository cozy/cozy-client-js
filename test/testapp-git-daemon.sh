#!/bin/bash
# set -e

if [ "${#}" -ne 2 ] || ! [ -f "${2}" ]; then
  >&2 echo "Usage: ${0} [gitdir] [manifest]"
  exit 1
fi

testapp_dir="${1}"

if [ -d "${testapp_dir}" ]; then
  >&2 echo "Directory ${testapp_dir} already exists"
fi

git init "${testapp_dir}"
cat "${2}" > "${testapp_dir}/manifest.webapp"
git --git-dir="${testapp_dir}/.git" --work-tree="${testapp_dir}" add .
git --git-dir="${testapp_dir}/.git" --work-tree="${testapp_dir}" commit -m "manifest"
git daemon --reuseaddr --base-path="${testapp_dir}" --export-all "${testapp_dir}/.git"

#!/bin/bash
# set -e

if [ "${#}" -ne 1 ] || ! [ -f "${1}" ]; then
  >&2 echo "Usage: ${0} [manifest]"
  exit 1
fi

testapp_dir="$(pwd)/testapp"

rm -rf "${testapp_dir}"

trap "trap - SIGTERM && rm -rf ${testapp_dir} > /dev/null -- -${$}" SIGINT SIGTERM EXIT
git init "${testapp_dir}"
cat "${1}" > "${testapp_dir}/manifest.webapp"
git --git-dir="${testapp_dir}/.git" --work-tree="${testapp_dir}" add .
git --git-dir="${testapp_dir}/.git" --work-tree="${testapp_dir}" commit -m "manifest"
git daemon --reuseaddr --base-path="${testapp_dir}" --export-all "${testapp_dir}/.git"

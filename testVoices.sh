testwords="my name is tim"
for voice in $(say -v '?' | cut -d '#' -f 1 | cut -d ' ' -f 1); do
  echo "$voice:" 
  say -v $voice $testwords
  sleep .1
done

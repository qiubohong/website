<template>
  <RouterView />
</template>
<style>
img.dark {
  filter: invert(1) hue-rotate(180deg);
}

body {
  background-color: #eee
}

html[theme-mode="dark"] body {
  background-color: #181818;
}
</style>

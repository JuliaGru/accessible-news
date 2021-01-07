<template>
  <div class="theme-default">
    <h1 v-if="error.statusCode === 404">Diese Seite wurde nicht gefunden.</h1>
    <h1 v-else>Ein Fehler ist aufgetreten.</h1>
    <NuxtLink to="/">Zurück zur Startseite</NuxtLink>
  </div>
</template>

<script>

export default {
  props: ['error'],
  layout: 'error'
}
</script>


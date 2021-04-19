<template>
  <div>
    <a href="#skiplink_ansicht" class="skiplink focus:opacity-100 " :style="top">Zu den Ansichts Einstellungen</a>
    <a href="#skiplink_navigation" class="skiplink focus:opacity-100 " :style="top">Zur Navigation</a>
    <a href="#skiplink_content" class="skiplink focus:opacity-100 " :style="top">Zum Inhalt</a>
    <a href="#skiplink_footer" class="skiplink focus:opacity-100 " :style="top">Zum Footer</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      top: 'top: 5.5rem'
    }
  },
}
</script>

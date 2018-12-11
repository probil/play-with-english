<template>
  <iframe
    width="100%"
    height="133"
    scrolling="no"
    frameborder="no"
    allow="autoplay"
    :src="songSource"
  ></iframe>
</template>
<script>
export default {
  props: {
    source: String,
  },
  computed: {
    songSource() {
      return `https://w.soundcloud.com/player/?url=${encodeURI(this.source)}&color=%23060505&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=true`;
    },
  },
};
</script>

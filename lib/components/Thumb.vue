<template>
  <div
    v-if="this.thumb || this.origin"
    :style="thumbStyle"
  />
</template>

<script>
  export default {
    name: "thumb",
    props: {
      thumb: { default: '' },
      origin: { default: '' },
    },
    computed: {
      thumbStyle() {
        return {
          backgroundImage: `url(${this.thumb || this.origin})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          borderRadius: '5px',
          overflow: 'hidden',
          width: '60px',
          height: '60px',
          margin: '10px 0',
        };
      },
    },
  }
</script>

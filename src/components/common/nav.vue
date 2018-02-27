<template>
  <nav>
    <a v-for='item in items' :class="{ active: item.index===index }" @click="changeTab(item)">
      {{item.text}}
    </a>
  </nav>
</template>
<style scoped lang="scss">
  nav {
    margin-bottom: -0.3rem;
  }

  nav > a {
    width: 8rem;
    text-align: center;
    position: relative;
    display: inline-block;
    padding: .3rem 1rem 0;
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  nav a::before {
    content: ''; /* To generate the box */
    position: absolute;
    border: 0.1rem solid #B7B7B7;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    background: #e8f3f9;
    transform: scale(1, 1.2) perspective(1em) rotateX(10deg);
    transform-origin: left;
  }

  nav a.active {
    z-index: 2;
    color: white;
  }

  nav a.active::before {
    background-color: #3a9dd8;
  }
</style>
<script>
  export default {
    props: {
      items: {
        type: Array,
        default () {
          return []
        }
      },
      index: {
        type: String,
        default () {
          return ''
        }
      }
    },
    data () {
      return {}
    },
    computed: {},
    mounted () {
    },
    methods: {
      changeTab (item) {
        this.$emit('select', item)
      }
    }
  }
</script>

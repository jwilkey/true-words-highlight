<template>
  <div class="translations theme-mid">
    <div class="heading">
      <i class="fa fa-close red"></i>
    </div>
    <table>
      <tbody>
        <tr>
          <td @click="setTranslation('ESV')" :class="isCurrent('ESV')" class="translation" >ESV</td>
          <td @click="setTranslation('EPT')" :class="isCurrent('EPT')" class="translation" >EPT</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Translations',
  computed: {
    ...mapGetters(['translation'])
  },
  methods: {
    ...mapActions(['setTranslation']),
    isCurrent (version) {
      return this.translation === version ? ['callout-light'] : []
    }
  }
}
</script>

<style lang="less" scoped>
.translations {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  .heading {
    text-align: right;
    padding: 5px;
  }
  table {
    padding: 20px;
    padding-top: 10px;
  }
  .translation {
    padding: 5px 15px;
    border-radius: 4px;
  }
}
</style>

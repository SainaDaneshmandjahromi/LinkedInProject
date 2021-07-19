<template>
  <div>
    <b-form inline>
      <label class="sr-only">Name</label>
      <b-form-input
        class="mr-1"
        v-model="searchContent.text"
      ></b-form-input>

      <b-button variant="primary" @click="$emit('searchMyMessage', searchContent.text)">Search</b-button>
    </b-form>
  </div>
</template>

<script>

export default {
  name: 'search-message',
  data: () => ({
    searchContent: {
      text: ''
    }
  })

}
</script>
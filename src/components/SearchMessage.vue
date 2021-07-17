<template>
    <div>
        <b-form inline>
            <label class="sr-only" for="inline-form-input-name">Name</label>
            <b-form-input
            id="inline-form-input-name"
            class="mb-2 mr-sm-2 mb-sm-0"
            v-model="searchContent.text"
            ></b-form-input>


            <b-button variant="primary"  @click="$emit('searchMyMessage', searchContent.text)" >Search</b-button>
        </b-form>
    </div>
</template>

<script>
// import { getAllChats } from '@/db/messaging/chats'
// import UserChat from '@/components/UserChat'
export default {
    name: 'search-message',
    data: () => ({
      searchContent:{
          text : ''
      }
    })

}
</script>
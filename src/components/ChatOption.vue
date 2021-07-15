<template>
    <div>
    <b-dropdown id="dropdown-right" right text="Options" variant="success" class="m-2" >
        <b-dropdown-item class="pa-2" button @click="$emit('deleteChat')">Delete</b-dropdown-item>
        <b-dropdown-item class="pa-2" button v-if ="chat.archiveStat === 'Archived'">Another action</b-dropdown-item>
        <b-dropdown-item class="pa-2" button v-else >Something else here</b-dropdown-item>
    </b-dropdown>
    </div>
</template>

<script>

export default {
  name: 'chat-option',
  props:{
    chat: Object,
  }
//   data: () => ({
//       messageContent:{
//           content : ''
//       }
//   }),

 
}
</script>

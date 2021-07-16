<template>
    <div>
    <b-dropdown id="dropdown-right" right text="Options" variant="success" class="m-2" style="right = 0px; !important"  >
        <b-dropdown-item class="pa-2" button @click="$emit('deleteChat')">Delete</b-dropdown-item>
        <b-dropdown-item class="pa-2" button @click="$emit('UnArchiveChat')" 
        v-if ="chat.archiveStat === 'Archived'" >Unarchive</b-dropdown-item>
        <b-dropdown-item class="pa-2" button @click="$emit('ArchiveChat')" v-else >Add to Archive</b-dropdown-item>
        <b-dropdown-item class="pa-2" v-if ="unreadStat.cnt == 0" >Unread The Chat</b-dropdown-item>
    </b-dropdown>
    </div>
</template>

<script>

export default {
  name: 'chat-option',
  props:{
    chat: Object,
    unreadStat:Object
  },
 
}
</script>

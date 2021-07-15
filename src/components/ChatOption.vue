<template>
    <div>
    <b-dropdown id="dropdown-right" right text="Options" variant="primary" class="m-2" >
        <b-dropdown-item button @click="$emit('deleteChat')">Delete</b-dropdown-item>
        <b-dropdown-item button>Another action</b-dropdown-item>
        <b-dropdown-item button>Something else here</b-dropdown-item>
    </b-dropdown>
    </div>
</template>

<script>

export default {
  name: 'chat-option',
//   data: () => ({
//       messageContent:{
//           content : ''
//       }
//   }),

 
}
</script>

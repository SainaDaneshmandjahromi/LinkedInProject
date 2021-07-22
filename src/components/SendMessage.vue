<template>
  <div class="mt-3" style="position:fixed !important;
                                 width:97% !important;
                                 margin:0 auto 0  !important;
                                 bottom:0 !important;">
    <!-- Using components -->
    <b-input-group>
      <b-form-input v-model="messageContent.content"></b-form-input>
      <b-input-group-append>
        <b-button variant="info" @click="$emit('sendMyMessage', messageContent.content)">Send</b-button>
      </b-input-group-append>
    </b-input-group>
  </div>
</template>

<script>

export default {
  name: 'send-message',
  data: () => ({
    messageContent: {
      content: ''
    }
  }),


}
</script>

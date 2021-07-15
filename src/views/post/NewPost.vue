<template>
  
    <b-container fluid>     
          <b-form @submit="onSubmit" v-if="show">
        <b-form-textarea
            id="textarea-auto-height"        
            placeholder="Auto height textarea"
            rows="3"
            max-rows="8"
        ></b-form-textarea>
        <b-button type="submit" variant="danger">Share</b-button>
    </b-form>
    </b-container>
     
</template>
<script>
export default {
  name: 'NewPost',
data() {
    return {
    text: ''
    }
}
  
};
</script>
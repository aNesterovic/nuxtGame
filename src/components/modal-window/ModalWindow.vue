<template>
  <div v-if="isOpen" class="modal-mask" @click="$emit('modal-close')">
    <div class="modal-wrapper">
      <div class="modal-container" ref="target">
        <div class="modal-header">
          <slot name="header"> default header </slot>
        </div>
        <div class="modal-body">
          <slot name="content"> default content </slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <div>
              <button class="form__submit-btn" @click.stop="$emit('modal-close')">Ok</button>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ModalWindow',
  props: {
    isOpen: {
      type: Boolean, 
      default: false
    }
  },
  data () {
    return {
      target: null
    }
  },
  methods: {
  },
}
</script>
<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.modal-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 300px;
  margin: 150px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}
</style>
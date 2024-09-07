<template>
    <div>
        <input
            class='vi-input'
            v-model='model'
            :disabled='props.disabled ?? false'
            :maxlength='props.maxLength'
            :minlength='props.minlength'
            :placeholder='props.placeholder'
        />
    </div>
</template>

<script setup lang='ts'>
const model = defineModel()
const props = defineProps<{
    disabled?: boolean;
    maxLength?: string | number;
    minlength?: string | number;
    placeholder?: string
}>();

</script>

<style scoped lang='scss'>
@import "styles/variables";

input {
    width: $input-width;
    height: $input-height;
    box-sizing: border-box;
    border: 1px solid #dcdfe6;
    border-radius: 5px;
    padding: 0 10px;
}
input:focus {
    box-shadow: 0 0 0 1px $input-focus-border-color inset;
}
</style>

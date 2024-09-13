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
    disabled?: boolean; //不可编辑
    maxLength?: string | number; //最大输入长度
    minlength?: string | number; //最小输入长度
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

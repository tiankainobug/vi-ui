<template>
    <div
        ref='inputDivRef'
        :class="['vi-input',{'is_focus': data.isFocus}]"
        tabindex="0"
    >
        <input
            ref='inputRef'
            class='vi-input_content'
            v-model='model'
            :disabled='props.disabled ?? false'
            :maxlength='props.maxLength'
            :minlength='props.minlength'
            :placeholder='props.placeholder'
        />
        <span>
            <span v-if='showClearable()' @mousedown.prevent='handleClear' class='vi-input_clear'>
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" width='14' height='14'><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M320 320L192 192"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M192 320l128-128"></path></svg>
            </span>
        </span>
    </div>
</template>

<script setup lang='ts'>
import { onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'

const model = defineModel()
const props = defineProps<{
    disabled?: boolean; //不可编辑
    maxLength?: string | number; //最大输入长度
    minlength?: string | number; //最小输入长度
    placeholder?: string;
    clearable?: boolean; //是否展示一键清空
}>();
const inputDivRef = ref<HTMLInputElement | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);
const data = reactive({
    isFocus: false,
})

watch(() => data.isFocus, (isFocus) => {
    if (isFocus) {
        inputRef.value?.focus()
        return
    }
    inputRef.value?.blur()

})

// 在组件挂载时添加全局事件监听器
onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

// 在组件销毁前移除全局事件监听器
onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
});

// 点击 div 外部时，让 input 失去焦点
const handleClickOutside = (event: any) => {
    // 检查点击是否发生在 div 之外
    if (inputDivRef.value && !inputDivRef.value?.contains(event.target)) {
        data.isFocus = false
        return
    }
    data.isFocus = true
};
// 判断是否展示一键删除按钮
// 1.clearable：true
// 2.model: 有值
// 3.input 被 focus
const showClearable = () => {
    return model.value && props.clearable && data.isFocus
}
// 一键清除方法
const handleClear = () => {
    model.value = ''
}

</script>

<style scoped lang='scss'>
@import "styles/variables";

.vi-input {
    width: $input-width;
    height: $input-height;
    box-sizing: border-box;
    border: 1px solid #dcdfe6;
    border-radius: 5px;
    padding: 0 10px;
    cursor: text;

    display: flex;
    align-items: center;

    input {
        width: 100%;
        border: none;
    }

    .vi-input_clear {
        cursor: pointer;
    }
}
.is_focus {
    box-shadow: 0 0 0 1px $input-focus-border-color inset;
}
</style>

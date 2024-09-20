<template>
    <div class='vi-input'>
        <!-- 头部插槽 -->
        <div v-if="$slots.prepend" class="vi-input_prepend">
            <slot name="prepend" />
        </div>
        <!-- input 输入框 -->
        <div
            ref='inputDivRef'
            :class="['vi-input_wrapper',{'is_focus': data.isFocus,'disable': disabled}]"
            tabindex="0"
        >
            <!-- 前置图标 -->
            <Icon v-if='prefixIcon' class='vi-input_prefix_icon'>
                <component :is='prefixIcon'/>
            </Icon>
            <input
                ref='inputRef'
                class='vi-input_content'
                v-model='model'
                :type="getInputType()"
                :disabled='props.disabled ?? false'
                :maxlength='props.maxLength'
                :minlength='props.minlength'
                :placeholder='props.placeholder'
                :readonly='props.readonly ?? false'
            />
            <span>
                <!-- 一键清空 -->
                <span v-if='showClearable()' @mousedown.prevent='handleClear' class='vi-input_clear'>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" width='14' height='14'><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M320 320L192 192"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M192 320l128-128"></path></svg>
                </span>
                <!-- 显示密码 -->
                <span v-if='showPassword()' @mousedown.prevent='data.password.showPassword = true' class='vi-input_clear'>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" width='14' height='14'><circle cx="256" cy="256" r="64" fill="currentColor"></circle><path d="M490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96c-42.52 0-84.33 12.15-124.27 36.11c-40.73 24.43-77.63 60.12-109.68 106.07a31.92 31.92 0 0 0-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416c46.71 0 93.81-14.43 136.2-41.72c38.46-24.77 72.72-59.66 99.08-100.92a32.2 32.2 0 0 0-.1-34.76zM256 352a96 96 0 1 1 96-96a96.11 96.11 0 0 1-96 96z" fill="currentColor"></path></svg>
                </span>
                <!-- 隐藏密码 -->
                <span v-if='hidePassword()' @mousedown.prevent='data.password.showPassword = false' class='vi-input_clear'>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" width='14' height='14'><path d="M432 448a15.92 15.92 0 0 1-11.31-4.69l-352-352a16 16 0 0 1 22.62-22.62l352 352A16 16 0 0 1 432 448z" fill="currentColor"></path><path d="M248 315.85l-51.79-51.79a2 2 0 0 0-3.39 1.69a64.11 64.11 0 0 0 53.49 53.49a2 2 0 0 0 1.69-3.39z" fill="currentColor"></path><path d="M264 196.15L315.87 248a2 2 0 0 0 3.4-1.69a64.13 64.13 0 0 0-53.55-53.55a2 2 0 0 0-1.72 3.39z" fill="currentColor"></path><path d="M491 273.36a32.2 32.2 0 0 0-.1-34.76c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.68 96a226.54 226.54 0 0 0-71.82 11.79a4 4 0 0 0-1.56 6.63l47.24 47.24a4 4 0 0 0 3.82 1.05a96 96 0 0 1 116 116a4 4 0 0 0 1.05 3.81l67.95 68a4 4 0 0 0 5.4.24a343.81 343.81 0 0 0 67.24-77.4z" fill="currentColor"></path><path d="M256 352a96 96 0 0 1-93.3-118.63a4 4 0 0 0-1.05-3.81l-66.84-66.87a4 4 0 0 0-5.41-.23c-24.39 20.81-47 46.13-67.67 75.72a31.92 31.92 0 0 0-.64 35.54c26.41 41.33 60.39 76.14 98.28 100.65C162.06 402 207.92 416 255.68 416a238.22 238.22 0 0 0 72.64-11.55a4 4 0 0 0 1.61-6.64l-47.47-47.46a4 4 0 0 0-3.81-1.05A96 96 0 0 1 256 352z" fill="currentColor"></path></svg>
                </span>
            </span>
            <!-- 后置图标 -->
            <Icon v-if='suffixIcon' class='vi-input_suffix_icon'>
                <component :is='suffixIcon'/>
            </Icon>
        </div>
        <!-- 尾部插槽 -->
        <div v-if="$slots.append" class="vi-input_append">
            <slot name="append" />
        </div>
    </div>
</template>

<script setup lang='ts'>
import { onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { Icon } from '@vicons/utils'


const model = defineModel()
const props = defineProps<{
    disabled?: boolean; //不可编辑
    maxLength?: string | number; //最大输入长度
    minlength?: string | number; //最小输入长度
    placeholder?: string;
    clearable?: boolean; //是否展示一键清空
    password?: boolean; //是否为密码输入框（可切换显隐）
    prefixIcon?: Object; //输入框头部的图片
    suffixIcon?: Object; //输入框尾部的图片
    readonly?: boolean; //只读状态
}>();
const inputDivRef = ref<HTMLInputElement | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);
const data = reactive({
    isFocus: false,
    password: {
        showPassword: false,
    }
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
// 获取输入框的类型
const getInputType = () => {
    if (props.password) {
        return showPassword() ? 'password' : 'text'
    }
}
// 判断是否展示一键删除按钮
// 1.clearable：true
// 2.model: 有值
// 3.input 被 focus
// 4.password 为 false
const showClearable = () => {
    return model.value && props.clearable && data.isFocus && !props.password
}
// 判断是否展示显示密码
// 1.model: 有值
// 2.data.password.showPassword : false
const showPassword = () => {
    return props.password && model.value && !data.password.showPassword
}
// 判断是否展示隐藏密码
// 1.model: 有值
// 2.data.password.showPassword : true
const hidePassword = () => {
    return props.password && model.value && data.password.showPassword
}
// 一键清除方法
const handleClear = () => {
    model.value = ''
}
</script>

<style scoped lang='scss'>
@import "styles/variables";

.vi-input {
    display: flex;
    align-items: center;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    border-radius: 5px;
    margin: 5px 0;
}
.vi-input_prepend {
    height: $input-height;
    background-color: #f5f7fa;
    display: flex;
    align-items: center;
    padding: 0 10px;
    font-size: 14px;
    color: #909399;
}
.vi-input_append {
    height: $input-height;
    background-color: #f5f7fa;
    display: flex;
    align-items: center;
    padding: 0 10px;
    font-size: 14px;
    color: #909399;
}
.vi-input_wrapper {
    width: $input-width;
    height: $input-height;
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
.disable {
    background-color: #fafafa;
    cursor: no-drop;
}
input:disabled {
    cursor: no-drop;
}
.vi-input_prefix_icon {
    margin-right: 5px;
}
.vi-input_suffix_icon {
    margin-left: 5px;
}
</style>

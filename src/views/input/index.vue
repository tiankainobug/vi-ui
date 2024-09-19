<template>
    <div class='input-box'>
        <h1>vi-input</h1>
        <div class='demo-card'>
            <h2>正常用法</h2>
            <vi-input
                clearable
            />
        </div>
        <div class='demo-card'>
            <h2>不可编辑</h2>
            <vi-input
                clearable
                disabled
            />
        </div>
        <div class='demo-card'>
            <h2>密码输入框</h2>
            <vi-input
                password
            />
        </div>
        <div class='demo-card'>
            <h2>带图标的输入框</h2>
            <vi-input
                password
                clearable
                :prefix-icon='AirplaneSharp'
                :suffix-icon='Alarm'
            />
        </div>
    </div>
</template>

<script setup lang='ts'>
import viInput from '@/components/vi-input/index.vue'
import { reactive } from 'vue'
import { AirplaneSharp, Alarm } from '@vicons/ionicons5'

const data =reactive({
    inputValue: ''
})
</script>

<style scoped>
.demo-card {
    width: 200px;
    border-radius: 10px;
    padding: 10px;
    border: 1px solid #B0D9B1;
    margin: 10px 0;
}
</style>

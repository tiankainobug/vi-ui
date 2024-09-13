<template>
    <div class='input-box'>
        <h1>vi-input</h1>
        <div class='demo-card'>
            <h2>正常用法</h2>
            <vi-input
                v-model='data.inputValue'
            />
        </div>

    </div>
</template>

<script setup lang='ts'>
import viInput from '@/components/vi-input/index.vue'
import { reactive } from 'vue'

const data =reactive({
    inputValue: ''
})
</script>

<style scoped>
.demo-card {
    width: 400px;
    border-radius: 10px;
    padding: 10px;
}
</style>

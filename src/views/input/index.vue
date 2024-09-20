<template>
    <div class='input-box'>
        <h1>vi-input</h1>
        <div class='demo-card-list'>
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
                    clearable
                    :prefix-icon='AirplaneSharp'
                />
                <vi-input
                    clearable
                    :suffix-icon='Alarm'
                />
            </div>
            <div class='demo-card'>
                <h2>输入框前置、后置插槽</h2>
                <vi-input
                    clearable
                >
                    <template #prepend>
                        <div>Http://</div>
                    </template>
                </vi-input>
                <vi-input
                    clearable
                >
                    <template #append>
                        <div>.com</div>
                    </template>
                </vi-input>
            </div>
            <div class='demo-card'>
                <h2>输入框只读</h2>
                <vi-input
                    model-value='demo input value'
                    readonly
                >
                </vi-input>
            </div>
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
.demo-card-list {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
}
.demo-card {
    border-radius: 10px;
    padding: 10px;
    border: 1px solid #B0D9B1;
    margin: 10px;
}
</style>

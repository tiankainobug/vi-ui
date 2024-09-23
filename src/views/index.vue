<template>
    <div class='container'>
        <div @click="goComponent('input')">Input 输入框</div>
        <div @click="goComponent('button')">Button 按钮</div>
    </div>
</template>

<script setup lang='ts'>

import { useRouter } from 'vue-router'

const router = useRouter()
const goComponent = (type: string) => {
    if (type === 'input') {
        router.push('/input')
        return
    }
    if (type === 'button') {
        router.push('/button')
        return
    }
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;

    div {
        width: 240px;
        height: 50px;
        background-color: darkcyan;
        border-radius: 10px;

        display: flex;
        align-items: center;
        justify-content: center;

        margin-top: 10px;
        cursor: pointer;
    }
    div:hover {
        background-color: seagreen;
    }
}
</style>

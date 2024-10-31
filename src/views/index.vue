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
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 10px;
    justify-items: center;

    div {
        width: 240px;
        height: 180px;
        border: 1px solid darkcyan;
        border-radius: 10px;

        display: flex;
        align-items: center;
        justify-content: center;

        margin-top: 10px;
        cursor: pointer;
    }
    div:hover {
        color: #fff;
        font-size: 16px;
        background-color: seagreen;
        box-shadow: 0 0 6px rgba(0, 0, 0, 01.5);
    }
}
</style>

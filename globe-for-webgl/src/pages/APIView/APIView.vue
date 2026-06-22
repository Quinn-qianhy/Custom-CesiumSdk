<template>
    <iframe id="page" frameborder="0"></iframe>
</template>

<script setup>
import { onMounted, nextTick, ref } from 'vue'

const init = (url = '/static/Build/Documentation/index.html') => {
    const pageFrame = document.getElementById('page')
    if (pageFrame) {
        pageFrame.src = url
    }
}

onMounted(() => {
    nextTick(() => {
        init()
    })
})
</script>

<style lang="scss" scoped>
#page {
    height: 100%;
    width: 100%;
}
</style>
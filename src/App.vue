<template>
    <div>
        <router-view />
        <div class="authors">
            Authors: <span class="authors__item">Daniel Kolesnyk</span>,
            <span class="authors__item">Alex Dmitriev</span>
        </div>
    </div>
</template>

<style lang="scss">
.authors {
    position: fixed;
    bottom: 0;
    left: 0;
    text-align: center;
    width: 100%;
    color: #858585;
    background-color: rgba(0, 0, 0, 0.75);
    font-family: Arial;
    font-size: 12px;
    font-weight: 100;
}

.authors__item {
    font-weight: 600;
    color: #ababab;
}
</style>
<script setup lang="ts"></script>

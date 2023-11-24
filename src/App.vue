<template>
    <div class="app">
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

.app {
    height: 100%;
}

html {
    height: 100%;
}
body {
    height: 100%;
    background-color: black;
}
#app {
    height: 100%;
}
input.select-dropdown {
    color: white;
    font-size: 12px !important;
}

.dropdown-content li > a,
.dropdown-content li > span {
    padding: 8px 10px !important;
}

.dropdown-content li {
    min-height: auto !important;
}

.select-wrapper .caret {
    fill: white !important;
}

.select-wrapper input.select-dropdown {
    margin-bottom: 23px !important;
}

.opacity0 {
    opacity: 0;
}
</style>
<script lang="ts"></script>

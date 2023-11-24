<template>
    <div class="wrapper__loader">
        <div id="centerdiv">
            <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'Preloader'
});
</script>

<style scoped lang="scss">
.wrapper__loader {
    position: fixed;
    z-index: 100;
    padding: 0;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}

#centerdiv {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(147, 147, 147, 0.8);
    ul {
        display: flex;
        li {
            list-style: none;
            height: 20px;
            width: 20px;
            background-color: red;
            margin: 0 4px;
            border-radius: 50%;
            animation: bounce 1s linear infinite;
        }
    }

    ul {
        li:nth-child(1) {
            animation-delay: 0.2s;
            background-color: #961419;
        }

        li:nth-child(2) {
            animation-delay: 0.6s;
            background-color: #d11c23;
        }

        li:nth-child(3) {
            animation-delay: 0.1s;
            background-color: #e21e25;
        }

        li:nth-child(4) {
            animation-delay: 0.8s;
            background-color: #ff8152;
        }

        li:nth-child(5) {
            animation-delay: 0.5s;
            background-color: #ffc246;
        }
        li:nth-child(6) {
            animation-delay: 0.1s;
            background-color: #f9f871;
        }
    }

    @keyframes bounce {
        0% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-40px);
        }
        100% {
            transform: translateY(0px);
        }
    }
}
</style>

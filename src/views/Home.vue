<template>
    <div class="wrapper">
        <Preloader v-if="!isLoadData" />
        <div class="users">
            <div class="users__labels"></div>
            <div v-for="(player, index) in players" :key="index" class="user__item user__row">
                <div class="user__node user__count">
                    {{ index + 1 }}
                </div>
                <div class="user__remove user__node">
                    <a @click="removePlayer(index)" class="btn-floating btn-small waves-effect waves-light green"
                        ><i class="material-icons red">remove_circle_outline </i></a
                    >
                </div>

                <div class="user__name user__node">
                    <div class="input-field">
                        <input v-model="player.fullName" id="first_name" type="text" class="validate white-text" />
                        <label class="green-text" :class="{ active: player.fullName }" for="first_name"
                            >First Name</label
                        >
                    </div>
                </div>
                <div class="user__preferences user__node">
                    <div class="input-field">
                        <textarea
                            v-model="player.givesWish"
                            id="textarea1"
                            class="materialize-textarea white-text"></textarea>
                        <label class="green-text" :class="{ active: player.givesWish }" for="textarea1">Wish</label>
                    </div>
                </div>
                <div class="user__unique user__node">
                    <div class="input-field">
                        <select v-model="player.exceptionNames" multiple>
                            <option
                                v-for="userName in getUsersName.filter(payerName => player.fullName !== payerName)"
                                :key="userName"
                                :value="userName">
                                {{ userName }}
                            </option>
                        </select>
                        <label>Exception</label>
                    </div>
                </div>
                <div
                    v-if="player.password"
                    @click="copy(player.password)"
                    class="user__password user__node tooltipped"
                    data-position="bottom"
                    data-tooltip="COPY">
                    {{ player.password }}
                </div>
                <div v-if="!player.password" class="user__password user__node user__password_not-generated">
                    not generated
                </div>

                <div v-if="player.targetPlayerName" class="user__node user__tooltip">
                    <i class="material-icons tooltipped" data-position="left" :data-tooltip="player.targetPlayerName"
                        >remove_red_eye</i
                    >
                </div>
            </div>
            <form class="form" @submit="addNewUser">
                <div class="user__row">
                    <div class="user__node user__count"></div>
                    <div
                        :class="{ opacity0: !newPlayer.fullName || !newPlayer.givesWish }"
                        class="user__remove user__node">
                        <button type="submit" class="btn-floating btn-small">
                            <i class="material-icons green">add </i>
                        </button>
                    </div>
                    <div class="user__name user__node">
                        <div class="input-field">
                            <input v-model="newPlayer.fullName" id="new_name" type="text" class="validate white-text" />
                            <label class="green-text" :class="{ active: newPlayer.fullName }" for="new_name"
                                >First Name</label
                            >
                        </div>
                    </div>
                    <div class="user__preferences user__node">
                        <div class="input-field">
                            <textarea
                                v-model="newPlayer.givesWish"
                                id="new_wish"
                                class="materialize-textarea white-text"></textarea>
                            <label class="green-text" :class="{ active: newPlayer.givesWish }" for="new_wish"
                                >Textarea</label
                            >
                        </div>
                    </div>
                    <div class="user__unique user__node">
                        <div class="input-field">
                            <select v-model="newPlayer.exceptionNames" multiple>
                                <option v-for="userName in getUsersName" :key="userName" :value="userName">
                                    {{ userName }}
                                </option>
                            </select>
                            <label>Exception</label>
                        </div>
                    </div>
                </div>
            </form>
            <div class="generate__wrapper">
                <div class="generate__box">
                    <button class="btn__wave_box" @click="generate">
                        <span class="btn__wave"></span>
                        <span class="btn__text">generate</span>
                    </button>
                    <button v-if="isNeedReset" class="btn__wave_box btn__wave_box-reset" @click="reset">
                        <span class="btn__wave"></span>
                        <span class="btn__text">reset</span>
                    </button>
                    <div v-if="isGenerate" class="progress">
                        <div class="indeterminate"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
// @ts-ignore
import M, { ToastOptions } from 'materialize-css';
import { Generator, Player } from '@/generator';
import { fireBase } from '@/network/fireBase';
import { Utils } from '@/utils/utils';
import Preloader from '@/components/Preloader.vue';

type data = {
    players: Player[];
    serverPlayers: Player[];
    newPlayer: Player;
    isGenerate: boolean;
    isLoadData: boolean;
};

export default defineComponent({
    name: 'Home',
    components: { Preloader },
    data: (): data => ({
        isGenerate: false,
        players: [],
        serverPlayers: [],
        isLoadData: false,
        newPlayer: {
            fullName: '',
            givesWish: '',
            exceptionNames: [],
            password: '',
            targetWish: '',
            id: 0,
            targetPlayerName: ''
        }
    }),
    watch: {
        players: {
            handler() {
                Utils.setLocalStorage('players', this.players);
            },
            deep: true
        }
    },
    methods: {
        addNewUser(event: Event): void {
            event.preventDefault();
            this.newPlayer.id = !this.players.length ? 0 : this.players[this.players.length - 1].id + 1;
            this.players.push(JSON.parse(JSON.stringify(this.newPlayer)));
            this.resetNewPlayer();
            this.updateView();
        },
        resetNewPlayer(): void {
            this.newPlayer.fullName = '';
            this.newPlayer.givesWish = '';
            this.newPlayer.exceptionNames = [];
        },
        removePlayer(index: number): void {
            this.players.splice(index, 1);
            this.updateView();
        },
        async generate(): Promise<any> {
            if (this.isGenerate || !this.isNeedReset) return;
            this.isGenerate = true;
            const generator = new Generator(...JSON.parse(JSON.stringify(this.players)));
            this.players = generator.getGameResult().sort((a, b) => a.id - b.id);
            await fireBase.post(this.players, 'players/');
            this.isGenerate = false;
            this.serverPlayers = JSON.parse(JSON.stringify(this.players));
            this.updateView();
        },
        reset(): void {
            this.players = JSON.parse(JSON.stringify(this.serverPlayers));
            this.updateView();
        },
        updateView(): void {
            setTimeout(M.AutoInit, 0);
        },
        async copy(data: string): Promise<any> {
            await navigator.clipboard.writeText(data);
            // @ts-ignore
            this.showToast('Coped', { displayLength: 500, inDuration: 150, outDuration: 150 });
        },
        showToast(data: string, options?: ToastOptions): void {
            M.toast({ html: data, ...options, classes: 'rounded red' });
        },
        async loadData(): Promise<any> {
            const serverPlayers = await fireBase.get('players');
            if (serverPlayers) this.serverPlayers = JSON.parse(JSON.stringify(serverPlayers));
            const localPlayers = Utils.getLocalStorage('players');
            if (localPlayers) this.players = JSON.parse(JSON.stringify(localPlayers));
            if (serverPlayers && !localPlayers) this.players = JSON.parse(JSON.stringify(localPlayers));
            this.updateView();
            this.isLoadData = true;
        }
    },
    computed: {
        ...mapGetters(['getUserToken']),
        getUsersName(): string[] {
            return this.players.map(player => player.fullName);
        },
        isNeedReset(): boolean {
            return JSON.stringify(this.players) !== JSON.stringify(this.serverPlayers);
        }
    },
    mounted() {
        if (!this.getUserToken) {
            this.$router.push('/');
            return;
        }
        this.loadData();
    }
});
</script>

<style scoped lang="scss">
$size: 200px;

.wrapper {
    background-color: #282828;
    height: 100%;
    padding: 20px;
}

.user__item {
    border: 1px solid #ffffff;
    border-radius: 10px;
}

.user__row {
    display: flex;
    align-items: center;
    color: #fff;
}

.user__node {
    padding: 5px;
}

.user__count {
    text-align: center;
    flex: 0 0 2%;
}

.user__remove {
    flex: 0 0 3%;
    padding: 5px;
    display: flex;
    justify-content: center;
    i {
        font-size: 22px;
    }
}

.user__name {
    flex: 0 0 20%;
}

.user__preferences {
    flex: 0 0 40%;
    textarea {
        margin-bottom: 1px;
    }
}

.user__unique {
    flex: 0 0 20%;
}
.user__password {
    text-align: center;
    flex: 0 0 10%;
    border: 1px dashed white;
    cursor: pointer;
}

.user__tooltip {
    flex: 0 0 5%;
    display: flex;
    justify-content: center;
    position: relative;
    i {
        cursor: pointer;
    }
}

.user__tooltip_box {
    display: inline-block;
    cursor: pointer;
    &:hover {
        .user__tooltip_shower {
            opacity: 1;
        }
    }
}

.user__tooltip_shower {
    position: absolute;
    background-color: black;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 12px;
    top: 12px;
    left: 0;
    transition: all 0.5s ease;
    opacity: 0;
}

.user__password_not-generated {
    color: red;
}

.generate__wrapper {
    display: flex;
    justify-content: center;
}

.generate__box {
}

.btn__wave_box {
    font-family: 'Patrick Hand', sans-serif;
    font-size: 15px;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 15px 25px;
    width: $size;
    font-weight: 600;
    color: #fff;
    background-color: transparent;
    border: none;
    border-radius: 3px;
    position: relative;
    overflow: hidden;
    cursor: pointer;

    &:hover {
        .btn__wave {
            top: -150px;
        }
    }

    & .btn__text {
        position: relative;
    }
    & .btn__wave {
        display: block;
        position: absolute;
        top: -100px;
        left: 0;
        width: $size;
        height: $size;
        background: linear-gradient(45deg, #4f00bc, #29abe2);
        transition: 0.5s ease;

        &:after,
        &:before {
            content: '';
            position: absolute;
            width: 200%;
            height: 200%;
            top: 0;
            left: 50%;
            transform: translate(-50%, -75%);
        }

        &:after {
            border-radius: 40%;
            background-color: rgba(#333, 0.5);
            animation: wave 7s linear infinite;
        }
        &:before {
            border-radius: 45%;
            background-color: rgba(#333, 1);
            animation: wave 12s linear infinite;
        }
    }
}

.btn__wave_box-reset {
    & .btn__wave {
        background: linear-gradient(45deg, #bc0000, #d029e2);
    }
}

@keyframes wave {
    0% {
        transform: translate(-50%, -75%) rotate(0deg);
    }
    100% {
        transform: translate(-50%, -75%) rotate(360deg);
    }
}
</style>

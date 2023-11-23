<template>
    <div class="wrapper">
        <div class="users">
            <div class="users__labels"></div>
            <div v-for="(user, index) in users" :key="index" class="user__item user__row">
                <div class="user__node user__count">
                    {{ index + 1 }}
                </div>
                <div class="user__edit user__node">
                    <a
                        @click="editPlayer(index)"
                        v-if="index != edit"
                        class="btn-floating btn-small waves-effect waves-light green"
                        ><i class="material-icons">edit</i></a
                    >
                    <a
                        @click="editPlayer(null)"
                        v-if="index == edit"
                        class="btn-floating btn-small waves-effect waves-light purple darken-4 pulse"
                        ><i class="material-icons">save</i></a
                    >
                </div>

                <div class="user__name user__node">
                    <div class="input-field">
                        <input v-model="user.fullName" id="first_name" type="text" class="validate white-text" />
                        <label class="green-text" :class="{ active: user.fullName }" for="first_name">First Name</label>
                    </div>
                </div>
                <div class="user__preferences user__node">
                    <div class="input-field">
                        <textarea
                            v-model="user.givesWish"
                            id="textarea1"
                            class="materialize-textarea white-text"></textarea>
                        <label class="green-text" :class="{ active: user.givesWish }" for="textarea1">Textarea</label>
                    </div>
                </div>
                <div class="user__unique user__node">
                    <div class="input-field">
                        <select v-model="user.exceptionNames" multiple>
                            <option
                                v-for="userName in getUsersName.filter(userName => user.fullName !== userName)"
                                :key="userName"
                                :value="userName">
                                {{ userName }}
                            </option>
                        </select>
                        <label>Materialize Multiple Select</label>
                    </div>
                </div>
                <div v-if="user.password" class="user__password user__node">{{ user.password }}</div>
                <div v-if="!user.password" class="user__password user__node user__password_not-generated">
                    not generated
                </div>

                <div v-if="user.targetName" class="user__node user__tooltip">
                    <i class="material-icons tooltipped" data-position="left" data-tooltip="I am a tooltip"
                        >remove_red_eye</i
                    >
                </div>
            </div>
            <b-form class="form" @submit="addNewUser">
                <div class="user__row">
                    <div class="user__node user__count"></div>
                    <div class="user__edit user__node">
                        <b-button
                            class="user__node user__edit"
                            type="submit"
                            style="font-size: 20px; line-height: 25px"
                            variant="success"
                            ><font-awesome-icon :icon="['fas', 'plus']"
                        /></b-button>
                    </div>
                    <div class="user__name user__node">
                        <b-form-input required v-model="newUser.fullName" placeholder="Enter name"></b-form-input>
                    </div>
                    <div class="user__preferences user__node">
                        <b-form-textarea
                            required
                            no-resize
                            v-model="newUser.givesWish"
                            placeholder="Enter preference..."></b-form-textarea>
                    </div>
                    <div class="user__node user__unique">
                        <b-form-checkbox
                            style="margin-left: 0; padding-left: 0"
                            v-model="newUser"
                            size="lg"></b-form-checkbox>
                    </div>
                </div>
            </b-form>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
// @ts-ignore
import M from 'materialize-css';

type userItem = {
    fullName: string;
    givesWish: string;
    exceptionNames: string[];
    password: string;
    id: number;
    targetName: string;
    targetWish: string;
    targetPlayerId: number | null;
};

type data = {
    users: userItem[];
    newUser: userItem;
    edit: number | null;
    test?: any;
    selected?: any;
};

export default defineComponent({
    name: 'Home',
    data: (): data => ({
        users: [
            {
                fullName: 'Alex',
                givesWish: 'iphone',
                exceptionNames: [],
                password: 'kjnk',
                targetName: 'test',
                targetWish: '',
                id: 0,
                targetPlayerId: 1
            },
            {
                fullName: 'Ann',
                givesWish: 'iphone2',
                exceptionNames: [],
                password: 'kjnkdvs',
                targetName: 'test2',
                targetWish: '',
                id: 1,
                targetPlayerId: 1
            },
            {
                fullName: 'Danya',
                givesWish: 'iphone3',
                exceptionNames: [],
                password: '',
                targetName: '',
                targetWish: '',
                id: 1,
                targetPlayerId: 1
            }
        ],
        newUser: {
            fullName: '',
            givesWish: '',
            exceptionNames: [],
            password: '',
            targetName: '',
            targetWish: '',
            id: 0,
            targetPlayerId: null
        },
        edit: null
    }),
    methods: {
        addNewUser(event: Event): void {
            event.preventDefault();
            this.users.push({
                fullName: this.newUser.fullName,
                givesWish: this.newUser.givesWish,
                exceptionNames: [],
                password: '',
                id: !this.users.length ? 0 : this.users[this.users.length - 1].id,
                targetPlayerId: null,
                targetName: '',
                targetWish: ''
            });
            this.resetNewPlayer();
        },
        resetNewPlayer(): void {
            this.newUser.fullName = '';
            this.newUser.givesWish = '';
            this.newUser.exceptionNames = [];
        },
        editPlayer(index: number | null): void {
            this.edit = index;
        }
    },
    computed: {
        ...mapGetters(['getUserToken']),
        getUsersName(): string[] {
            return this.users.map(user => user.fullName);
        }
    },
    mounted() {
        // if (!this.getUserToken) {
        //     this.$router.push('/');
        //     return
        // }
        M.AutoInit();
    }
});
</script>

<style scoped lang="scss">
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

.user__edit {
    flex: 0 0 3%;
    padding: 5px;
    display: flex;
    justify-content: center;
}

.user__name {
    flex: 0 0 20%;
}

.user__preferences {
    flex: 0 0 40%;
}

.user__unique {
    flex: 0 0 20%;
}
.user__password {
    text-align: center;
    flex: 0 0 10%;
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
</style>

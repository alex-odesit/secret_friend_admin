<template>
    <div class="wrapper">
        <div class="box">
            <form class="form" @submit="onSubmit">
                <div class="input-field col s12">
                    <input
                        v-model="form.email"
                        id="email"
                        type="email"
                        class="validate"
                        :class="{ invalid: !isValid }" />
                    <label :class="{ active: form.email }" for="email">Email</label>
                </div>
                <div class="input-field col s12">
                    <input
                        :class="{ invalid: !isValid }"
                        v-model="form.password"
                        id="password"
                        type="password"
                        class="validate" />
                    <label :class="{ active: form.password }" for="password">Password</label>
                </div>

                <button class="btn waves-effect waves-light" type="submit">
                    sing in

                    <i class="material-icons right">send</i>
                </button>
                <div v-if="isLoading" class="progress">
                    <div class="indeterminate"></div>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { fireBase } from '@/network/fireBase';
import { mapActions } from 'vuex';
type data = {
    form: {
        email: string;
        password: string;
    };
    isLoading: boolean;
    isValid: boolean;
};
export default defineComponent({
    name: 'Auth',
    data: (): data => ({
        form: {
            email: '',
            password: ''
        },
        isLoading: false,
        isValid: true
    }),
    methods: {
        ...mapActions(['setUserToken']),
        async onSubmit(event: Event): Promise<any> {
            event.preventDefault();
            if (this.isLoading) return;
            this.isValid = true;
            this.isLoading = true;
            const userToken = await fireBase.logIn(this.form.email, this.form.password);
            if (!userToken) {
                this.isValid = false;
            }
            if (userToken) {
                this.$router.push('home');
                await this.setUserToken(userToken);
            }
            this.isLoading = false;
        }
    }
});
</script>

<style scoped lang="scss">
.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: black;
}

.box {
    max-width: 400px;
    width: 90%;
    background-color: rgb(58 9 90);
    padding: 15px;
    border-radius: 15px;
}

.form {
    display: flex;
    align-items: center;
    flex-direction: column;
    input {
        color: #fff;
    }
}

.input__box {
    width: 100%;
    color: #fff;
}
</style>

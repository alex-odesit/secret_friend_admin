<template>
    <div class="wrapper">
        <div class="box">
            <a class="waves-effect waves-light btn">button</a>
            <form class="form">
                <div class="input-field col s12">
                    <input id="email" type="email" class="validate" />
                    <label for="email">Email</label>
                </div>
            </form>
            <b-form class="form" @submit="onSubmit">
                <b-form-group class="input__box" id="input-group-1" label="Email address:" label-for="input-1">
                    <b-form-input
                        id="input-1"
                        :state="isValid"
                        v-model="form.email"
                        type="email"
                        placeholder="Enter email"
                        required></b-form-input>
                </b-form-group>

                <b-form-group class="input__box" id="input-group-2" label="Password:" label-for="input-2">
                    <b-form-input
                        id="input-2"
                        :state="isValid"
                        v-model="form.password"
                        type="password"
                        placeholder="Enter password"
                        required></b-form-input>
                </b-form-group>
                <b-button type="submit" :variant="'outline-success'">
                    <b-spinner v-if="isLoading" small></b-spinner>
                    Submit
                </b-button>
            </b-form>
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
    isValid: boolean | null;
};
export default defineComponent({
    name: 'Auth',
    data: (): data => ({
        form: {
            email: 'test2@gmail.com',
            password: 'testtest'
        },
        isLoading: false,
        isValid: null
    }),
    methods: {
        ...mapActions(['setUserToken']),
        async onSubmit(event: Event): Promise<any> {
            this.isLoading = true;
            const userToken = await fireBase.logIn(this.form.email, this.form.password);
            if (!userToken) {
                this.isValid = false;
            }
            if (userToken) {
                this.isValid = true;
                this.$router.push('home');
                this.setUserToken(userToken);
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
}

.input__box {
    width: 100%;
    color: #fff;
}
</style>

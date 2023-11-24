import { ActionContext, createStore } from 'vuex';
import { Store } from 'vuex';
import { InjectionKey } from 'vue';
interface State {
    userToken: string;
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $store: Store<State>;
    }
}

export const key: InjectionKey<Store<State>> = Symbol();

type data = {
    userToken: string;
};

export default createStore<State>({
    state: {
        userToken: ''
    },
    getters: {
        getUserToken(state: State): string {
            return state.userToken;
        }
    },
    mutations: {
        setUserToken(state: State, token: string) {
            state.userToken = token;
        }
    },
    actions: {
        setUserToken({ commit }: ActionContext<State, any>, data: string) {
            commit('setUserToken', data);
        }
    },
    modules: {}
});

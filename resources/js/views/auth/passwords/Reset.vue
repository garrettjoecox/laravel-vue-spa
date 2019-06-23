<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Reset Password</div>

                    <div class="card-body">
                        <form v-on:submit.prevent="onSubmit">
                            <div class="form-group row">
                                <label for="email" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control" :class="{ 'is-invalid': errors.email }" v-model="email" name="email" required autocomplete="email" autofocus>
                                    <span class="invalid-feedback" role="alert"  v-if="errors.email">
                                        <strong>{{errors.email[0]}}</strong>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                                <div class="col-md-6">
                                    <input id="password" type="password" class="form-control" :class="{ 'is-invalid': errors.password }" v-model="password" name="password" required autocomplete="new-password">
                                    <span class="invalid-feedback" role="alert"  v-if="errors.password">
                                        <strong>{{errors.password[0]}}</strong>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="password-confirm" class="col-md-4 col-form-label text-md-right">Confirm Password</label>

                                <div class="col-md-6">
                                    <input id="password-confirm" type="password" class="form-control" :class="{ 'is-invalid': errors.password_confirmation }" v-model="password_confirmation" name="password_confirmation" required autocomplete="new-password">
                                </div>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-md-6 offset-md-4">
                                    <button type="submit" class="btn btn-primary">
                                        Reset Password
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

import { STATE_SUCCESS } from '../../../constants/requestStates';

export default {
    data() {
        return {
            email: 'garrettjcox@gmail.com',
            password: 'password',
            password_confirmation: 'password',
        };
    },

    computed: {
        ...mapState('auth/passwords/reset', {
            requestState: state => state.requestState,
            errors: state => state.errors,
        }),
    },

    methods: {
        async onSubmit() {
            await this.$store.dispatch('auth/passwords/reset/sendRequest', {
                token: this.$route.params.token,
                email: this.email,
                password: this.password,
                password_confirmation: this.password_confirmation,
            });

            if (this.requestState === STATE_SUCCESS) {
                this.$store.dispatch('alert/addTimedAlert', {
                    type: 'primary',
                    message: 'Password successfully changed',
                });
                this.$router.push('/login');
            }
        }
    },

    created() {
        this.$store.commit('auth/passwords/reset/reset');
    }
}
</script>

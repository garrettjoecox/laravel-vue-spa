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
                                    <span class="invalid-feedback" role="alert" v-if="errors.email">
                                        <strong>{{errors.email[0]}}</strong>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group row mb-0">
                                <div class="col-md-6 offset-md-4">
                                    <button type="submit" class="btn btn-primary">
                                        Send Password Reset Link
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

import { STATE_SUCCESS } from '../../../store/requestStates';

export default {
    data() {
        return {
            email: 'garrettjcox@gmail.com',
        };
    },

    computed: {
        ...mapState('auth/passwords/email', {
            requestState: state => state.requestState,
            errors: state => state.errors,
        }),
    },

    methods: {
        async onSubmit() {
            await this.$store.dispatch('auth/passwords/email/sendRequest', { email: this.email });

            if (this.requestState === STATE_SUCCESS) {
                this.$store.dispatch('alert/addTimedAlert', {
                    type: 'primary',
                    message: 'We have e-mailed your password reset link!',
                });
                this.$router.push('/login');
            }
        }
    },

    created() {
        this.$store.commit('auth/passwords/email/reset');
    }
}
</script>

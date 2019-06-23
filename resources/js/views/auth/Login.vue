<template>
    <div class="flex-fill overflow-scroll d-flex">
        <div class="container flex-fill d-flex align-items-center justify-content-center">
            <b-form
                novalidate
                @submit.prevent="onSubmit"
                @keydown="clearValidationError($event.target.name)"
                class="col-md-8 col-lg-6 pb-5"
            >
                <h1 class="text-center">Welcome Back.</h1>
                <h5 class="mb-5 text-center text-muted">Log into your account here:</h5>

                <div class="form-group">
                    <label for="email">Email Address</label>

                    <div>
                        <b-form-input
                            id="email"
                            type="email"
                            class="form-control form-control-lg"
                            :state="inputState('email')"
                            name="email"
                            v-model.trim="$v.form.email.$model"
                            autocomplete="email"
                            required
                            autofocus
                            placeholder="you@example.com"
                        />
                        <span class="invalid-feedback" role="alert">
                            <p class="mb-0" v-if="!$v.form.email.noValidationError"> {{ getValidationError('email') }} </p>
                            <p class="mb-0" v-if="!$v.form.email.required">Email is required</p>
                            <p class="mb-0" v-if="!$v.form.email.email">Please enter a valid email.</p>
                        </span>
                    </div>
                </div>

                <div class="form-group">
                    <div class="d-flex align-items-baseline">
                        <label for="password">Password</label>

                        <router-link class="btn-link ml-auto" to="/password/email">
                            Forgot Password?
                        </router-link>
                    </div>

                    <div>
                        <b-form-input
                            id="password"
                            type="password"
                            class="form-control form-control-lg"
                            :state="inputState('password')"
                            name="password"
                            v-model.trim="$v.form.password.$model"
                            autocomplete="password"
                            required
                            placeholder="Enter 8 characters or more"
                        />
                        <span class="invalid-feedback" role="alert">
                            <p class="mb-0" v-if="!$v.form.password.noValidationError"> {{ getValidationError('password') }} </p>
                            <p class="mb-0" v-if="!$v.form.password.required">Password is required</p>
                            <p class="mb-0" v-if="!$v.form.password.minLength">Password must be at least 8 characters</p>
                        </span>
                    </div>
                </div>

                <div class="form-group">
                    <button type="submit" class="btn btn-lg btn-primary btn-block" :disabled="$v.$invalid">
                        Log In
                    </button>
                </div>

                <div class="text-center mt-5 text-muted">
                    Don't have an account?
                    <router-link class="btn-link" to="/register">Sign Up</router-link>
                </div>
            </b-form>
        </div>
    </div>
</template>

<script>
import {
    email,
    required,
    minLength,
} from 'vuelidate/lib/validators';
import { mapState, mapGetters, mapMutations } from 'vuex';

import { STATE_SUCCESS } from '../../constants/requestStates';

function inputState(field, form) {
    if (!form) form = this.$v.form;

    return form[field].$dirty ? !form[field].$error : null
}

export default {
    data() {
        return {
            form: {
                email: '',
                password: '',
            },
        };
    },

    validations() {
        return {
            form: {
                email: {
                    email,
                    required,
                    noServerError: () => !this.hasValidationError('email'),
                },
                password: {
                    minLength: minLength(8),
                    required,
                    noServerError: () => !this.hasValidationError('password'),
                },
            }
        };
    },

    computed: {
        ...mapState('auth/login', [
            'requestState',
            'error',
        ]),

        ...mapGetters('auth/login', [
            'hasValidationError',
            'getValidationError',
        ]),
    },

    methods: {
        inputState,
        ...mapMutations('auth/login', [
            'clearValidationError',
        ]),

        async onSubmit() {
            this.$v.form.$touch();

            await this.$store.dispatch('auth/login/sendRequest', this.form);

            if (this.requestState === STATE_SUCCESS) {
                this.$router.push(this.$route.query.redirect || '/home');
            }
        }
    },

    created() {
        this.$store.commit('auth/login/reset');
    }
}
</script>

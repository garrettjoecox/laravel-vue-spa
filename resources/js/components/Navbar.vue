<template>
    <div class="navbar navbar-expand-md navbar-light shadow-sm">
        <div class="container">
            <router-link class="navbar-brand" to="/">
                Vue
            </router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto" v-if="user">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/home">Home</router-link>
                    </li>
                    <li class="nav-item dropdown">
                        <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span>{{ user.name }}</span>
                            <span class="caret"></span>
                        </a>

                        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <button class="dropdown-item" v-on:click="logout">
                                Logout
                            </button>
                        </div>
                    </li>
                </ul>
                <ul class="navbar-nav ml-auto" v-else>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/login">Login</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/register">Register</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                user: null
            }
        },

        methods: {
            logout() {

            }
        }
    }
</script>

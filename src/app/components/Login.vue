<template>
    <section class="hero is-success is-fullheight" style="background: url('../img/login.jpg')">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <h3 class="title has-text-grey">Login</h3>
                    <p class="subtitle has-text-grey">Please login to proceed.</p>
                    <div class="box">
                        <figure class="avatar">
                            <img src="/img/logo.png">
                        </figure>
                        <form>
                            <div class="field">
                                <div class="control">
                                    <!--model-->
                                    <input v-model="user.email" class="input is-large" type="email" placeholder="Your Email" autofocus="">
                                </div>
                            </div>
    
                            <div class="field">
                                <div class="control">
                                    <!--model-->
                                    <input v-model="user.password" class="input is-large" type="password" placeholder="Your Password">
                                </div>
                            </div>
                            <button class="button is-block is-info is-large is-fullwidth" v-on:click="validUser(user.email, user.password)">Login</button>
                        </form>
                    </div>
                    <p class="has-text-gray">
                        <a v-on:click="toRegister()">Registrarse</a> &nbsp;·&nbsp;
    
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    import Task from '../../models/classes/Task.js';
    import User from '../../models/classes/User.js';
    import Register from './Register.vue'
    import UserSignUp from '../../models/classes/UserSignUp.js';
    
    
    export default {
        name: 'Login',
        data() {
            return {
                title: 'Login',
                users: [],
                user: new User(),
                userSign: new UserSignUp(""),
            }
        },
        
    
        methods: {
            
            toRegister() {
                let route = this.$router.resolve({
                    path: '/register'
                });
                window.open(route.href, '_blank');
            },
            validUser(email, password) {
                fetch('/api/users')
                    .then(res => res.json())
                    .then(data => {
                        this.users = data;
                        //console.log(this.users.find(user => user.email == email))
                        //let idUsuario = this.users.find(user => user.email == email)._id;
    
                        var found = this.users.find(function(element) {
                            return element.email == email && element.password == password;
                        });
                        if (found != null) {
                            this.setUserId(found._id)
                            this.toAttendance()
                        } else {
                            alert("Usuario no valido.")
                        }
                        //console.log(idUsuario)
                    });
                //this.getUsers();
            },
    
            toAttendance() {
                let route = this.$router.resolve({
                    path: '/attendance'
                });
                window.open(route.href, '_blank');
    
            },
            setUserId(newId) {
                fetch('/api/usersignup/5c14c69ece4ac334d6b62250', {
                    method: 'PUT',
                    body: JSON.stringify(new UserSignUp(newId)),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
            }
        }
    }
</script>

<style src="./../../public/css/login.css">
    
</style>

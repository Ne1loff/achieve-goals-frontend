<script lang="ts">
    import {Link, navigate} from "svelte-routing";
    import PasswordField from "../components/inputs/PasswordField.svelte";
    import InputField from "../components/inputs/InputField.svelte";
    import Navbar from "../components/Navbar.svelte";
    import {Button, ContentSwitcher, Switch} from "carbon-components-svelte";
    import Icon from "@iconify/svelte";
    //@ts-ignore
    import Svelecte from 'svelecte';
    import {Login} from "carbon-icons-svelte";

    let username = ''
    let email = ''
    let male = true
    let password = ''
    let confirm_pass = ''

    let countries = [{id: 1, name: ""}];

    fetch('http://localhost:8080/api/countries/')
        .then(response => response.json())
        .then(commit => {
            countries = commit
            countries.splice(0, 0, {id: -1, name: "Выберите страну..."})
            selected = countries[0]
        })

    function registration() {
        fetch('http://localhost:8080/api/registration', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": username,
                "male": male,
                "email": email,
                "locality": selected.id,
                "password": password
            })
        }).then(response => {
            if (response.status === 201 || response.status === 200) {
                fetch('http://localhost:8080/api/login', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        login: username,
                        password: password,
                    })
                }).then(response => {
                    if (response.status === 200)
                        navigate('/home')
                    else
                        alert("Login or password incorrect")
                }).catch((err) => {
                    alert(err)
                })
            } else {
                alert("Произошла ошибка при регистрации")
            }
        }).catch((err) => {
            alert(err)
        })
    }

    let selected = countries[0];

    let clickable;
    let lessThanMin;
    let passNotMatch;

    let showPassword: boolean;

    $:passNotMatch = password !== confirm_pass && confirm_pass;
    $:lessThanMin = password.length > 0 && password.length < 6;
    $:clickable = (password === confirm_pass && password && confirm_pass && selected.id !== -1 && password.length >= 6);

    const handleKeydown = (e) => {
        if (e.key === 'Enter' && clickable) registration();
    };

</script>

<svelte:window on:keydown={handleKeydown}/>
<Navbar --own-nav-bar-left-margin-left="4px">
    <img slot="left" class="logo" on:click={() => navigate('/')} src="/static/logo_200x44.png" alt="logo">
</Navbar>
<div class="main-content">
    <form class="box" method="post">
        <h1>Sign up</h1>
        <div class="user_details">
            <InputField bind:bindText={username} label="Username"
                        --custom-height="45px"
                        --custom-width="285px"
                        --custom-margin="8px 0 4px 0"
                        --custom-border-color="#A9A9A9"
            />
            <InputField bind:bindText={email} label="Email"
                        --custom-height="45px"
                        --custom-width="285px"
                        --custom-margin="8px 0 4px 0"
                        --custom-border-color="#A9A9A9"
            />
            <Svelecte placeholder="Select country"></Svelecte>
            <PasswordField bind:password={password} label="Пароль"
                           newPass={true}
                           error={passNotMatch || lessThanMin}
                           bind:showPassword
                           --custom-height="45px"
                           --custom-width="285px"
                           --custom-margin="8px 0 4px 0"
                           --custom-border-color="#A9A9A9"
            />
            <PasswordField bind:password={confirm_pass} label="Подтвердите пароль"
                           newPass="{true}"
                           error={passNotMatch}
                           bind:showPassword
                           --custom-height="45px"
                           --custom-width="285px"
                           --custom-margin="8px 0 4px 0"
                           --custom-border-color="#A9A9A9"
            />
            {#if lessThanMin }
                <legend class="pass_match" class:less={lessThanMin}>Минимальная длина пароля 6 символов!</legend>
            {/if}
            {#if passNotMatch }
                <legend class="pass_match" class:notMatch={passNotMatch}>Пароли не совпадают!</legend>
            {/if}
        </div>
        <div class="check__for__male">
            <ContentSwitcher>
                <Switch>
                    <div style="display: flex; align-items: center;">
                        <Icon icon="ic:round-man" width="24" height="24" /> Man
                    </div>
                </Switch>
                <Switch>
                    <div style="display: flex; align-items: center;">
                        <Icon icon="ic:round-woman" width="24" height="24" /> Woman
                    </div>
                </Switch>
            </ContentSwitcher>
        </div>
        <Button size="small" icon={Login} on:click={registration} disabled={!clickable}>Регистрация</Button>
        <div class="sign_in_link">
            Уже есть аккаунт?
            <Link to="/login" replace>Войти</Link>
        </div>
    </form>
</div>

<style>

    * {
        box-sizing: content-box;
    }

    :global(.bx--btn) {
        border-radius: 5px;
        text-align: center;
    }

    .logo:hover {
        cursor: pointer;
    }

    /* Intro */
    .main-content {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;

        width: 100%;
        height: 100vh;
        bottom: 0;

        background: linear-gradient(135deg, #71b7e6, #9b59b6);
    }

    /* Box */
    .box {
        width: 350px;
        padding: 20px;
        position: center;
        background: white;
        border-radius: 10px;
        text-align: center;
    }

    .box h1 {
        text-transform: uppercase;
        margin: 10px auto;
        font-weight: 500;
    }


    /* User Details */
    .user_details {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .pass_match {
        margin: 0;
        padding: 5px;
        display: compact;
        color: red;
    }

    /* Check for male */
    .check__for__male {
        text-align: center;
        display: flex;
        justify-content: space-between;
        padding: 5px 20%;
    }

    /* Sign In Link */
    .sign_in_link {
        padding: 5px;
        margin: 5px auto;
        text-align: center;
        color: black;
    }

    /* Media */
    @media (max-width: 584px) {
        .box {
            max-width: 100%;
            padding: 5px;
            margin: 0;
        }
    }

    @media (max-height: 470px) {
        .box {
            max-height: 100%;
            padding: 5px;
            margin: 0;
        }

        .user_details {
            max-height: 35vh;
            overflow-y: scroll;
        }
    }
</style>
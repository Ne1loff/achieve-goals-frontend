<script lang="ts">
    import {Link, navigate} from "svelte-routing"
    import PasswordField from "../components/inputs/PasswordField.svelte";
    import InputField from "../components/inputs/InputField.svelte";
    import Navbar from "../components/Navbar.svelte";
    import {l10n} from "../resources/localization/l10n";

    let login = ''
    let password = ''

    const handleKeydown = (e) => {
        if (e.key !== 'Enter') return;
        sigIn();
    }

    async function sigIn() {
        fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                login: login,
                password: password,
            })
        }).then(response => {
            if (response.status === 200)
                navigate('/home')
            else
                alert("Не верный логин или пароль!")
        }).catch((err) => {
            console.log(err)
        })
    }

</script>

<svelte:window on:keydown={handleKeydown}/>

<Navbar outlinedBottom --own-nav-bar-left-margin-left="4px">
    <img slot="left" class="logo" on:click={() => navigate('/')} src="/static/logo_200x44.png" alt="logo">
</Navbar>
<div class="main-content">
    <div class="intro__inner">
        <form class="box" method="post">
            <h1>Login</h1>
            <div class="user_details">
                <div class="input_box">
                    <InputField bind:value={login}
                                placeholderText="Username/Email"
                                label={l10n.login}
                                --custom-height="45px"
                                --custom-width="285px"
                                --custom-border-color="#A9A9A9"
                    />
                </div>
                <div class="input_box">
                    <PasswordField bind:password={password} label={l10n.password}
                                   newPass="{false}"
                                   --custom-height="45px"
                                   --custom-width="285px"
                                   --custom-border-color="#A9A9A9"
                    />
                </div>
            </div>
            <button class="submit_btn" type="button" on:click={sigIn}>{l10n.logInAction}</button>
            <div class="signup_link">
                {l10n.noAccount}?
                <Link to="/registration">{l10n.registration}</Link>
            </div>
        </form>
    </div>
</div>


<style>

    /* Intro */
    .main-content {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;

        background: linear-gradient(135deg, #71b7e6, #9b59b6);

        width: 100%;
        height: 100vh;
        bottom: 0;
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


    /* User Details*/
    .user_details {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .input_box {
        padding: 6px 0;
        max-width: 90%;
    }

    /* Submit Button */
    .submit_btn {
        margin: 5px auto;
        width: 130px;
        border-radius: 12px;
        border-color: #A9A9A9;
        color: #fff;
        background: #1877f2;
    }

    .submit_btn:hover {
        background: darkgray;
        transition: 0.3s;
    }

    /* Sign Up Link */
    .signup_link {
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

        .submit_btn {
            max-width: 100%;
        }
    }

    @media (max-height: 370px) {
        .box {
            max-height: 100%;
            padding: 5px;
            margin: 0;
        }

        .user_details {
            max-height: 15vh;
            overflow-y: scroll;
        }

        .submit_btn {
            max-height: 100%;
        }
    }

</style>
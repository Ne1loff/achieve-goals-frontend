<script lang="ts">
    import {SvelteToast} from '@zerodevx/svelte-toast'
    import {navigate, Route, Router} from "svelte-routing";
    import {HomePage, LoginPage, NotfoundPage, ProfilePage, RegistrationPage} from "./data/pages";
    import {onMount} from "svelte";

    onMount(() => navigate('/login'));

</script>

<Router>
    <Route path="/login">
        <LoginPage/>
    </Route>
    <Route path="/registration">
        <RegistrationPage/>
    </Route>
    <Route path="/home">
        <HomePage/>
        <!--        <Route path="/home/goal/:id" let:params><Route/>    -->
    </Route>
    <Route path="/user/profile">
        <ProfilePage/>
    </Route>
    <Route path="/*">
        <NotfoundPage/>
    </Route>
</Router>
<SvelteToast options={{pausable: true}}/>

<style>

    :global(body) {
        min-height: 100vh;
        min-width: 100vw;

        padding: 0;
        margin: 0;

        overflow: hidden;
    }

</style>
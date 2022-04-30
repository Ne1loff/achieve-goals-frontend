<script>
    import ModalWindow from "../modal_windows/ModalWindow.svelte";

    export let f7router;
    export let f7route;

</script>

<ModalWindow closeBtn {f7router} {f7route}>
    <h1 slot="center">Hilow hilow ima katte</h1>
</ModalWindow>
<script lang="ts">
    import Icon from "@iconify/svelte"

    export let password: string = '';
    export let placeholderText: string = ' ';
    export let label: string = undefined;
    export let newPass: string;
    export let error: boolean = false;
    export let showPassword: boolean = false;

    export let IconWhenPass = 'akar-icons:eye-closed';
    export let IconWhenText = 'akar-icons:eye-open';

    let inputEl: HTMLInputElement;
    const inputId = Date.now().toString(36) + Math.random().toString(36).substring(2);

    $: {
        if (inputEl) {
            inputEl.type = showPassword ? 'text' : 'password';
        }
    }

</script>

<div class="input_container" class:error>

    <input id={inputId} class="input_field" bind:this={inputEl}
           placeholder="{placeholderText}"
           bind:value={password}
           autocomplete="{newPass ? 'new-password' : 'on'}">
    {#if label && placeholderText === ' '}
        <label for={inputId} class="input_label">{label}</label>
    {/if}
    <div class="icon_holder" style="visibility: {password === '' ? 'hidden' : 'visible'}"
         on:click={() => {showPassword = !showPassword}}>
        <Icon class="input_box_icon"
              icon="{showPassword ? IconWhenText : IconWhenPass }"/>
    </div>
</div>


<style lang="scss">

  :root {
    --custom-height: 22px;
    --custom-width: 100%;
    --custom-margin: 0;
    --custom-border-color: #dddfe2;

    --own-input-error-color: #fa4d56;
  }

  .input_container {
    position: relative;

    background: white;
    max-width: var(--custom-width);
    max-height: var(--custom-height);
    margin: var(--custom-margin);

    padding: 12px 14px;
    font-size: 17px;
    border: 1px solid var(--custom-border-color);
    border-radius: 6px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    user-select: none;
  }

  .input_container.error {
    color: var(--own-input-error-color);
    border-color: var(--own-input-error-color);
  }

  .input_label {
    position: absolute;

    top: 50%;
    left: 1rem;
    transform: translate(0, -50%);

    cursor: text;
    transition: top 200ms ease-in, left 200ms ease-in, font-size 200ms ease-in, transform 200ms ease-in;
    background: inherit;
  }

  .input_field:focus ~ .input_label,
  .input_field:not(:placeholder-shown).input_field:not(:focus) ~ .input_label {
    top: -10%;
    font-size: 0.8rem;
    left: 0.8rem;
    transform: translate(0px, -10%);
  }

  .input_field {
    height: 100%;
    flex: 1;
    border: none;

    padding: 0;
    margin: 0;
  }

  .input_field:focus {
    outline: none;
  }

  .icon_holder {
    width: 30px;
    height: 30px;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;
  }

  .icon_holder:hover {
    background: rgba(0, 0, 0, .05);
  }

  :global(.input_box_icon) {
    width: 20px;
    height: 20px;
  }

</style>
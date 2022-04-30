<script lang="ts">

    export let bindText: string;
    export let label: string = undefined;
    export let placeholderText: string = ' ';
    export let error: boolean = false;

    const inputId = Date.now().toString(36) + Math.random().toString(36).substring(2);

</script>


<div class="input_container" class:error>

    <input id={inputId} class="input_field" type="text" placeholder={placeholderText} autocomplete="on"
           bind:value={bindText}>
    {#if label && placeholderText === ' '}
        <label for={inputId} class="input_label">{label}</label>
    {/if}
    <div class="void"></div>
</div>


<style lang="scss">

  :root {
    --custom-height: 22px;
    --custom-width: 100%;
    --custom-margin: 0;
    --custom-border-color: #dddfe2;
  }

  .input_container {
    position: relative;

    background: white;
    max-width: var(--custom-width, 100%);
    max-height: var(--custom-height);
    margin: var(--custom-margin);

    padding: 12px 14px;
    font-size: 17px;
    border: 1px solid var(--custom-border-color);
    border-radius: 6px;

    display: flex;
    align-items: center;
    justify-content: space-between;
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

  .void {
    width: 30px;
    height: 30px;
    visibility: hidden;
  }

</style>
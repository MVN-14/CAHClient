<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let value: string;

  function onSubmit() {
    dispatch('usernameEntered', {
      value
    })
  }
</script>

<form on:submit={onSubmit}>
  <p>Enter your username:</p>
  <input type="text" bind:value />
  <button type="submit" disabled={!value || value.trim().length == 0}>Ok</button
  >
</form>

<style>
  form {
    text-align: center;
  }
</style>

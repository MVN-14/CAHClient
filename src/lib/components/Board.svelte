<script lang="ts">
  import Card from "./Card.svelte";
  import Hand from "./Hand.svelte";
  import { userStore } from "../../stores";

  export let prompt: string;

  const { cardPlayed } = userStore;

  function onClick(event: CustomEvent) {
    console.log("Board event", event);
    console.log("Board on click", event.detail);
    cardPlayed.set(event.detail);
  }
</script>

<main>
  <div class="prompt">
    {#if prompt}
      <Card text={prompt} color="black" />
    {/if}
    {#if $cardPlayed}
      <Card color="white" text={$cardPlayed} />
    {/if}
  </div>
  <div class="handContainer">
    <Hand on:click={onClick} />
  </div>
</main>

<style>
  .prompt {
    display: flex;
    padding: 25px 0 0 25px;
    height: 60%;
  }

  main {
    border: solid;
    width: 70vw;
    height: 70vh;
  }
</style>

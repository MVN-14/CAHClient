<script lang="ts">
  import Card from "./Card.svelte";
  import Hand from "./Hand.svelte";
  import { userStore, gameStore } from "../../stores";

  const { cardPlayed } = userStore;
  const { prompt } = gameStore;

</script>

<main>
  <div class="prompt">
    {#if $prompt}
      <Card text={$prompt} color="black" />
    {/if}
    {#if $cardPlayed}
      <Card color="white" text={$cardPlayed} />
    {/if}
  </div>
  <div class="handContainer">
    <Hand />
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

<script lang="ts">
  import Card from "./Card.svelte";
  import { socketStore, getPlayer, gameStore } from "../../stores";
  export let cards: string[] = [];

  function onClick(card: string) {
    if (
      getPlayer($socketStore.id).playedCards !== $gameStore.prompt?.pick &&
      !getPlayer($socketStore.id).isCzar
    ) {
      $socketStore.emit("playedCard", card);
    }
  }
</script>

<div>
  {#each cards as card}
    <Card inHand text={card} color="white" on:click={() => onClick(card)} />
  {/each}
</div>

<style>
  div {
    justify-content: center;
    display: flex;
    gap: 15px;
  }
</style>

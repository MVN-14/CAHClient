<script lang="ts">
  import Card from "./Card.svelte";
  import { userStore, gameStore } from "../../stores";

  const { cards, cardPlayed } = userStore;
  const { started } = gameStore; 

  function onClick(card: string) {
    if($cardPlayed || !$started) {
      return;
    }

    cardPlayed.set(card);
    cards.set($cards.filter(c => c !== card));
  }
</script>

<div>
  {#each $cards as card}
    <Card text={card} color="white" on:click={() => onClick(card)} />
  {/each}
</div>

<style>
  div {
    justify-content: space-around;
    display: flex;
    gap: 15px;
  }
</style>

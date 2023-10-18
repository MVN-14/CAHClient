<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { userStore } from "../../stores";

  const dispatch = createEventDispatcher();
  const { cardPlayed } = userStore;

  export let text: string;
  export let color: "black" | "white";
</script>

<div
  on:click={(_) => dispatch("click", text)}
  class="card"
  class:black={color == "black"}
  class:white={color == "white"}
  class:inHand={color != "black" && $cardPlayed !== text}
  role="none"
>
  {text}
</div>

<style>
  .card {
    z-index: 5;
    height: 200px;
    width: 150px;
    border-radius: 7px;
    padding: 10px;
  }

  .black {
    background-color: black;
    color: white;
  }

  .white {
    background-color: white;
    color: black;
  }

  .inHand:hover {
    cursor: pointer;
    translate: 0 -100px;
  }
</style>

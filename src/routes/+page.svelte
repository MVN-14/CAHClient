<script lang="ts">
  let roomName: string = "";
  $: isValidRoomName = roomName.trim().length > 0

  function redirectToRoom() {
    window.location.href = `/room/${roomName}`;
  }

</script>

<main>
  <h1>Clone Against Humanity</h1>
  <form on:submit={redirectToRoom}>
    <p>Join a Room</p>
    <input type="text" bind:value={roomName}/>
    <button type="submit" disabled={!isValidRoomName}>Join</button>
  </form>
</main>

<style>
  main {
    text-align: center;
  }
</style>
